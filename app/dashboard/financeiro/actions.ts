"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { criarCobranca, listarClientes, type FormaPagamento } from "@/lib/asaas";

function num(bruto: string): number {
  const n = Number((bruto.includes(",") ? bruto.replace(/\./g, "").replace(",", ".") : bruto).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/*
  Cria cobranca no Asaas a partir de uma empresa (que precisa ter
  asaas_customer_id) e espelha na tabela local cobrancas. O webhook
  mantem o status atualizado dali pra frente.
*/
export async function gerarCobranca(formData: FormData) {
  await getCurrentProfile();
  const supabase = await createClient();

  const empresaId = String(formData.get("empresa_id") ?? "");
  const valor = num(String(formData.get("valor") ?? ""));
  const vencimento = String(formData.get("vencimento") ?? "");
  const forma = (String(formData.get("forma") ?? "UNDEFINED") as FormaPagamento) || "UNDEFINED";
  const descricao = String(formData.get("descricao") ?? "").trim() || null;

  if (!empresaId || valor <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(vencimento)) {
    redirect("/dashboard/financeiro?error=Preencha empresa, valor e vencimento.");
  }

  const { data: empresa } = await supabase
    .from("empresas")
    .select("id, asaas_customer_id")
    .eq("id", empresaId)
    .single();

  if (!empresa?.asaas_customer_id) {
    redirect("/dashboard/financeiro?error=Empresa não está no Asaas. Cadastre-a antes (ficha do cliente).");
  }

  const r = await criarCobranca({
    clienteAsaasId: empresa.asaas_customer_id,
    valor,
    vencimento,
    descricao,
    forma,
    referenciaExterna: empresaId,
  });

  if (!r.ok) redirect(`/dashboard/financeiro?error=${encodeURIComponent(`Asaas: ${r.error}`)}`);

  await supabase.from("cobrancas").upsert(
    {
      asaas_payment_id: r.data.id,
      empresa_id: empresaId,
      valor: r.data.value,
      status: r.data.status,
      forma: r.data.billingType,
      vencimento: r.data.dueDate,
      url_fatura: r.data.invoiceUrl,
    },
    { onConflict: "asaas_payment_id" },
  );

  revalidatePath("/dashboard/financeiro");
  redirect("/dashboard/financeiro?ok=Cobrança criada no Asaas.");
}

// Reconciliacao sob demanda: puxa as cobrancas de cada cliente do Asaas
// e atualiza o espelho local (caso algum webhook tenha se perdido).
export async function sincronizarCobrancas() {
  const profile = await getCurrentProfile();
  if (profile.role !== "team_leader") {
    redirect("/dashboard/financeiro?error=Só o team leader pode sincronizar.");
  }

  const { listarCobrancasDoCliente } = await import("@/lib/asaas");
  const supabase = await createClient();

  const listaClientes = await listarClientes();
  if (!listaClientes.ok) {
    redirect(`/dashboard/financeiro?error=${encodeURIComponent(`Asaas: ${listaClientes.error}`)}`);
  }

  const { data: empresas } = await supabase
    .from("empresas")
    .select("id, asaas_customer_id")
    .not("asaas_customer_id", "is", null);
  const empresaPorAsaas = new Map((empresas ?? []).map((e) => [e.asaas_customer_id, e.id]));

  let total = 0;
  for (const cliente of listaClientes.data) {
    const cobrancas = await listarCobrancasDoCliente(cliente.id);
    if (!cobrancas.ok) continue;
    for (const c of cobrancas.data) {
      await supabase.from("cobrancas").upsert(
        {
          asaas_payment_id: c.id,
          empresa_id: empresaPorAsaas.get(c.customer) ?? null,
          valor: c.value,
          status: c.status,
          forma: c.billingType,
          vencimento: c.dueDate,
          url_fatura: c.invoiceUrl,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "asaas_payment_id" },
      );
      total++;
    }
  }

  revalidatePath("/dashboard/financeiro");
  redirect(`/dashboard/financeiro?ok=${encodeURIComponent(`${total} cobrança(s) sincronizada(s).`)}`);
}
