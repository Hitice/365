import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import EtapaSelect from "@/components/dashboard/EtapaSelect";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { ETAPAS_NEGOCIO, formatarValor, type Negocio } from "@/lib/crm/types";

export const metadata: Metadata = {
  title: "Negócios",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "min-h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:border-accent-500";

type NegocioComEmpresa = Negocio & { empresas: { id: string; nome_fantasia: string } | null };

/*
  Funil de NEGOCIOS (nao de pessoas): cada linha e uma oportunidade com
  valor e etapa. A empresa dona fica a um clique. Negocio novo se cria
  na ficha da empresa — contexto completo, zero redigitacao.
*/
export default async function NegociosPage({
  searchParams,
}: {
  searchParams: Promise<{ etapa?: string; aberto?: string }>;
}) {
  const sp = await searchParams;
  await getCurrentProfile();
  const supabase = await createClient();

  let query = supabase
    .from("negocios")
    .select("*, empresas ( id, nome_fantasia )")
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });
  if (sp.etapa) {
    query = query.eq("etapa", sp.etapa);
  } else if (sp.aberto !== "nao") {
    // Visao padrao: so o funil vivo (fechado/perdido ficam de fora).
    query = query.not("etapa", "in", "(fechado,perdido)");
  }

  const { data } = await query.returns<NegocioComEmpresa[]>();
  const negocios = data ?? [];

  const hoje = new Date().toISOString().slice(0, 10);
  const totalPipeline = negocios
    .filter((n) => n.etapa !== "fechado" && n.etapa !== "perdido")
    .reduce((s, n) => s + (n.valor_estimado ?? 0), 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
            Comercial
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Negócios</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            {negocios.length} negócio{negocios.length === 1 ? "" : "s"}
            {totalPipeline > 0 ? ` · ${formatarValor(totalPipeline)} em aberto` : ""}
          </p>
        </div>
        <Button href="/dashboard/clientes">Ir para clientes</Button>
      </div>

      <form method="get" className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-surface p-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="etapa" className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground-subtle">
            Etapa
          </label>
          <select id="etapa" name="etapa" defaultValue={sp.etapa ?? ""} className={INPUT_CLASS}>
            <option value="">Funil aberto</option>
            {ETAPAS_NEGOCIO.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="compact">
          Filtrar
        </Button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[860px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-alt text-left text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              <th className="px-4 py-3">Negócio</th>
              <th className="px-4 py-3">Empresa</th>
              <th className="px-4 py-3">Etapa</th>
              <th className="px-4 py-3">Valor</th>
              <th className="px-4 py-3">Próx. contato</th>
            </tr>
          </thead>
          <tbody>
            {negocios.map((n) => {
              const atrasado = n.proximo_contato && n.proximo_contato < hoje;
              return (
                <tr key={n.id} className="border-b border-border last:border-b-0 hover:bg-surface-alt">
                  <td className="px-4 py-3 font-semibold text-foreground">{n.titulo}</td>
                  <td className="px-4 py-3">
                    {n.empresas && (
                      <Link
                        href={`/dashboard/clientes/${n.empresas.id}`}
                        className="text-accent-600 hover:underline"
                      >
                        {n.empresas.nome_fantasia}
                      </Link>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <EtapaSelect negocioId={n.id} etapaAtual={n.etapa} />
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {formatarValor(n.valor_estimado)}
                  </td>
                  <td className="px-4 py-3">
                    {n.proximo_contato ? (
                      <span className={`text-xs font-semibold ${atrasado ? "text-accent-600" : "text-foreground-muted"}`}>
                        {new Date(`${n.proximo_contato}T12:00:00`).toLocaleDateString("pt-BR")}
                        {atrasado ? " · atrasado" : ""}
                      </span>
                    ) : (
                      <span className="text-xs text-foreground-subtle">sem agenda</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {negocios.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-foreground-muted">
                  Nenhum negócio nesse filtro. Crie um na ficha da empresa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
