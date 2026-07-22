"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
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
    <select
      value={etapaAtual}
      disabled={isPending}
      onChange={(e) => {
        const nova = e.target.value as EtapaNegocio;
        startTransition(async () => {
          const r = await atualizarEtapaNegocio(negocioId, nova);
          if (r.ok) router.refresh();
        });
      }}
      className="min-h-9 rounded-md border border-border bg-background px-2 text-xs font-medium text-foreground disabled:opacity-50"
    >
      {ETAPAS_NEGOCIO.map((etapa) => (
        <option key={etapa.id} value={etapa.id}>
          {etapa.label}
        </option>
      ))}
    </select>
  );
}
