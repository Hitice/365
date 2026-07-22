import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/*
  Recebe webhooks do Asaas (eventos de cobranca). Modelo event-driven:
  o Asaas empurra mudancas de status; refletimos na tabela cobrancas.
  Nao roda sincronizacao completa aqui — isso e sob demanda no botao.

  Seguranca: o Asaas manda um token fixo no header `asaas-access-token`,
  configurado no painel do Asaas e guardado em ASAAS_WEBHOOK_TOKEN.
  Usa service_role (sem sessao de usuario), entao a validacao do token
  e o que protege o endpoint.
*/
type PagamentoWebhook = {
  event: string;
  payment?: {
    id: string;
    customer: string;
    value: number;
    status: string;
    billingType: string;
    dueDate: string;
    invoiceUrl: string | null;
    externalReference: string | null;
  };
};

export async function POST(request: NextRequest) {
  const tokenEsperado = process.env.ASAAS_WEBHOOK_TOKEN;
  const tokenRecebido = request.headers.get("asaas-access-token");
  if (tokenEsperado && tokenRecebido !== tokenEsperado) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as PagamentoWebhook | null;
  if (!body?.event) {
    return NextResponse.json({ error: "payload inválido" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Registra o evento cru (auditoria/replay).
  await supabase.from("webhook_eventos").insert({ evento: body.event, payload: body });

  const p = body.payment;
  if (p) {
    // Upsert do espelho local da cobranca pelo id do Asaas.
    const { data: empresa } = await supabase
      .from("empresas")
      .select("id")
      .eq("asaas_customer_id", p.customer)
      .maybeSingle();

    await supabase.from("cobrancas").upsert(
      {
        asaas_payment_id: p.id,
        empresa_id: empresa?.id ?? null,
        orcamento_id: p.externalReference ?? null,
        valor: p.value,
        status: p.status,
        forma: p.billingType,
        vencimento: p.dueDate,
        url_fatura: p.invoiceUrl,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "asaas_payment_id" },
    );

    await supabase
      .from("webhook_eventos")
      .update({ processado: true })
      .eq("evento", body.event)
      .eq("processado", false);
  }

  return NextResponse.json({ received: true });
}
