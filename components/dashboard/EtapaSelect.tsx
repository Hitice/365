"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@/components/ui/combobox";
import { atualizarEtapaNegocio } from "@/app/dashboard/clientes/actions";
import { ETAPAS_NEGOCIO, type EtapaNegocio } from "@/lib/crm/types";

export default function EtapaSelect({
  negocioId,
  etapaAtual,
}: {
  negocioId: string;
  etapaAtual: EtapaNegocio;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Combobox
      value={etapaAtual}
      disabled={isPending}
      className="min-h-9 w-44 px-2 text-xs font-medium"
      searchPlaceholder="Buscar etapa..."
      options={ETAPAS_NEGOCIO.map((e) => ({ value: e.id, label: e.label }))}
      onChange={(v) => {
        startTransition(async () => {
          const r = await atualizarEtapaNegocio(negocioId, v as EtapaNegocio);
          if (r.ok) router.refresh();
        });
      }}
    />
  );
}
