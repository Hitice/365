import type { Metadata } from "next";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";
import { getCurrentProfile } from "@/lib/crm/session";

export const metadata: Metadata = {
  title: "Produção",
  robots: { index: false, follow: false },
};

export default async function ProducaoPage() {
  await getCurrentProfile();
  return (
    <ModulePlaceholder
      titulo="Produção"
      descricao="Ordens de produção derivadas dos projetos, com fila e apontamento."
      recursos={[
        "Ordens de produção por projeto (usinagem, ferramentaria, montagem)",
        "Fila de máquinas e prioridades",
        "Apontamento de horas e materiais consumidos (baixa no estoque)",
        "Status: aguardando, em produção, inspeção, concluída",
      ]}
    />
  );
}
