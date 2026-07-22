import type { Metadata } from "next";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";
import { getCurrentProfile } from "@/lib/crm/session";

export const metadata: Metadata = {
  title: "Arquivos",
  robots: { index: false, follow: false },
};

export default async function ArquivosPage() {
  await getCurrentProfile();
  return (
    <ModulePlaceholder
      titulo="Arquivos"
      descricao="Repositório central de arquivos técnicos e comerciais (Supabase Storage)."
      recursos={[
        "Organização por cliente, projeto e tipo (STEP, DXF, DWG, PDF, foto)",
        "Controle de versão: nunca sobrescrever, sempre versionar",
        "Quem enviou e quando, em tudo",
        "Pré-visualização de PDF e imagens no navegador",
      ]}
    />
  );
}
