import type { Metadata } from "next";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";
import { getCurrentProfile } from "@/lib/crm/session";

export const metadata: Metadata = {
  title: "Projetos",
  robots: { index: false, follow: false },
};

export default async function ProjetosPage() {
  await getCurrentProfile();
  return (
    <ModulePlaceholder
      titulo="Projetos"
      descricao="Do orçamento aprovado até a entrega: engenharia, fabricação e acompanhamento."
      recursos={[
        "Cliente, responsável e status do projeto",
        "Arquivos técnicos: STEP, DXF, DWG, PDF e fotos",
        "Checklist de produção e de entrega",
        "Observações e histórico completo",
        "Ligação direta com Produção e Financeiro",
      ]}
    />
  );
}
