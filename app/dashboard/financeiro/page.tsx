import type { Metadata } from "next";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";
import { getCurrentProfile } from "@/lib/crm/session";

export const metadata: Metadata = {
  title: "Financeiro",
  robots: { index: false, follow: false },
};

export default async function FinanceiroPage() {
  await getCurrentProfile();
  return (
    <ModulePlaceholder
      titulo="Financeiro"
      descricao="Integração completa com o Asaas: o Asaas é o financeiro, o sistema mostra e comanda."
      recursos={[
        "Cobranças (boleto, PIX, cartão), links de pagamento e assinaturas",
        "Recebimentos do mês e cobranças vencidas no dashboard",
        "Webhooks do Asaas: status de pagamento refletido em tempo real",
        "Criação de cobrança direto da página do cliente ou do projeto",
        "Sincronização sob demanda + reconciliação agendada (nunca ao abrir o sistema)",
      ]}
    />
  );
}
