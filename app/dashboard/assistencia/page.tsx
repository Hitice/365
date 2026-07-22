import type { Metadata } from "next";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";
import { getCurrentProfile } from "@/lib/crm/session";

export const metadata: Metadata = {
  title: "Assistência Técnica",
  robots: { index: false, follow: false },
};

export default async function AssistenciaPage() {
  await getCurrentProfile();
  return (
    <ModulePlaceholder
      titulo="Assistência Técnica"
      descricao="Chamados de manutenção e retrofit de máquinas CNC dos clientes."
      recursos={[
        "Chamados com cliente, máquina, defeito relatado e prioridade",
        "Status: aberto, agendado, em atendimento, aguardando peça, fechado",
        "Histórico de atendimentos por máquina (prontuário)",
        "Peças usadas com baixa no estoque e custo do atendimento",
      ]}
    />
  );
}
