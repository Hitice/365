import type { Metadata } from "next";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";
import { getCurrentProfile } from "@/lib/crm/session";

export const metadata: Metadata = {
  title: "Agenda",
  robots: { index: false, follow: false },
};

export default async function AgendaPage() {
  await getCurrentProfile();
  return (
    <ModulePlaceholder
      titulo="Agenda"
      descricao="Compromissos da equipe: visitas técnicas, follow-ups, entregas e atendimentos."
      recursos={[
        "Agenda do dia no dashboard",
        "Follow-ups do funil aparecem automaticamente",
        "Visitas técnicas e atendimentos de assistência agendados",
        "Visão por pessoa e por semana",
      ]}
    />
  );
}
