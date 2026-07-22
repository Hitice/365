"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";

function campo(fd: FormData, n: string): string | null {
  return String(fd.get(n) ?? "").trim() || null;
}
function num(bruto: string | null): number {
  if (!bruto) return 0;
  const n = Number((bruto.includes(",") ? bruto.replace(/\./g, "").replace(",", ".") : bruto).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
function data(bruto: string | null): string | null {
  return bruto && /^\d{4}-\d{2}-\d{2}$/.test(bruto) ? bruto : null;
}

export async function criarOrcamento(formData: FormData) {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const empresa_id = campo(formData, "empresa_id");
  const titulo = campo(formData, "titulo");
  if (!empresa_id || !titulo) {
    redirect("/dashboard/orcamentos/novo?error=Empresa e título são obrigatórios.");
  }

  const { data: orc, error } = await supabase
    .from("orcamentos")
    .insert({
      empresa_id,
      titulo,
      negocio_id: campo(formData, "negocio_id"),
      validade: data(campo(formData, "validade")),
      observacoes: campo(formData, "observacoes"),
      responsavel_id: profile.id,
    })
    .select("id")
    .single();

  if (error || !orc) {
    redirect(`/dashboard/orcamentos/novo?error=${encodeURIComponent(error?.message ?? "Erro ao criar.")}`);
  }

  revalidatePath("/dashboard/orcamentos");
  redirect(`/dashboard/orcamentos/${orc.id}`);
}

export async function adicionarItem(orcamentoId: string, formData: FormData) {
  const supabase = await createClient();
  const descricao = campo(formData, "descricao");
  if (!descricao) redirect(`/dashboard/orcamentos/${orcamentoId}?error=Descrição é obrigatória.`);

  await supabase.from("orcamento_itens").insert({
    orcamento_id: orcamentoId,
    produto_id: campo(formData, "produto_id"),
    descricao,
    quantidade: num(campo(formData, "quantidade")) || 1,
    unidade: campo(formData, "unidade") ?? "un",
    valor_unitario: num(campo(formData, "valor_unitario")),
  });

  revalidatePath(`/dashboard/orcamentos/${orcamentoId}`);
  redirect(`/dashboard/orcamentos/${orcamentoId}`);
}

export async function removerItem(formData: FormData) {
  const supabase = await createClient();
  const itemId = String(formData.get("item_id") ?? "");
  const orcamentoId = String(formData.get("orcamento_id") ?? "");
  if (itemId) await supabase.from("orcamento_itens").delete().eq("id", itemId);
  revalidatePath(`/dashboard/orcamentos/${orcamentoId}`);
  redirect(`/dashboard/orcamentos/${orcamentoId}`);
}

export async function mudarStatusOrcamento(formData: FormData) {
  const supabase = await createClient();
  const orcamentoId = String(formData.get("orcamento_id") ?? "");
  const status = String(formData.get("status") ?? "");
  const validos = ["rascunho", "enviado", "aprovado", "recusado", "vencido"];
  if (!orcamentoId || !validos.includes(status)) return;

  await supabase.from("orcamentos").update({ status }).eq("id", orcamentoId);
  revalidatePath(`/dashboard/orcamentos/${orcamentoId}`);
  redirect(`/dashboard/orcamentos/${orcamentoId}`);
}

// Converte orcamento aprovado em projeto — sem redigitar (empresa e
// vinculo ja vem do orcamento).
export async function converterEmProjeto(formData: FormData) {
  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const orcamentoId = String(formData.get("orcamento_id") ?? "");
  if (!orcamentoId) return;

  const { data: orc } = await supabase
    .from("orcamentos")
    .select("id, empresa_id, titulo")
    .eq("id", orcamentoId)
    .single();
  if (!orc) redirect("/dashboard/orcamentos?error=Orçamento não encontrado.");

  const { data: proj } = await supabase
    .from("projetos")
    .insert({
      empresa_id: orc.empresa_id,
      orcamento_id: orc.id,
      titulo: orc.titulo,
      responsavel_id: profile.id,
    })
    .select("id")
    .single();

  revalidatePath("/dashboard/projetos");
  redirect(proj ? `/dashboard/projetos/${proj.id}` : "/dashboard/projetos");
}
