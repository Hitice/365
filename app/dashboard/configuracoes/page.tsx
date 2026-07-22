import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";
import { getCurrentProfile } from "@/lib/crm/session";

export const metadata: Metadata = {
  title: "Configurações",
  robots: { index: false, follow: false },
};

export default async function ConfiguracoesPage() {
  const profile = await getCurrentProfile();
  if (profile.role !== "team_leader") redirect("/dashboard");
  return (
    <ModulePlaceholder
      titulo="Configurações"
      descricao="Parâmetros do sistema, integração e preferências da empresa."
      recursos={[
        "Dados da empresa (usados no PDF de orçamento)",
        "Configuração de webhooks do Asaas",
        "Etapas do funil e nichos personalizáveis",
        "Papéis e permissões (RBAC completo)",
      ]}
    />
  );
}
