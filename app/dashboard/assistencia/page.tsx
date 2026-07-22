import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import {
  PRIORIDADES_CHAMADO,
  STATUS_CHAMADO,
  type Chamado,
} from "@/lib/crm/types";
import { abrirChamado, mudarStatusChamado } from "./actions";

export const metadata: Metadata = {
  title: "Assistência Técnica",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "min-h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:border-accent-500";

type ChamadoLinha = Chamado & { empresas: { id: string; nome_fantasia: string } | null };

export default async function AssistenciaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  await getCurrentProfile();
  const supabase = await createClient();

  const [{ data: chamados }, { data: empresas }] = await Promise.all([
    supabase
      .from("chamados")
      .select("*, empresas ( id, nome_fantasia )")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .returns<ChamadoLinha[]>(),
    supabase
      .from("empresas")
      .select("id, nome_fantasia")
      .is("deleted_at", null)
      .order("nome_fantasia")
      .returns<{ id: string; nome_fantasia: string }[]>(),
  ]);

  const abertos = (chamados ?? []).filter((c) => c.status !== "fechado");
  const fechados = (chamados ?? []).filter((c) => c.status === "fechado");

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
          Operações
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">Assistência Técnica</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {abertos.length} chamado{abertos.length === 1 ? "" : "s"} em aberto
        </p>
      </div>

      {sp.error && (
        <p className="rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {sp.error}
        </p>
      )}

      <form action={abrirChamado} className="grid gap-3 rounded-2xl bg-surface p-4 shadow-sm sm:grid-cols-[1.5fr_1fr_2fr_1fr_auto] sm:items-end">
        <div>
          <label htmlFor="empresa_id" className="text-xs font-semibold text-foreground-subtle">
            Cliente *
          </label>
          <Combobox
            id="empresa_id"
            name="empresa_id"
            className="mt-1"
            placeholder="Selecione o cliente"
            searchPlaceholder="Buscar cliente..."
            emptyText="Nenhuma empresa."
            options={(empresas ?? []).map((e) => ({ value: e.id, label: e.nome_fantasia }))}
          />
        </div>
        <div>
          <label htmlFor="maquina" className="text-xs font-semibold text-foreground-subtle">
            Máquina
          </label>
          <input id="maquina" name="maquina" placeholder="Router 4000x2000" className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="defeito" className="text-xs font-semibold text-foreground-subtle">
            Defeito relatado *
          </label>
          <input id="defeito" name="defeito" required className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="prioridade" className="text-xs font-semibold text-foreground-subtle">
            Prioridade
          </label>
          <Combobox
            id="prioridade"
            name="prioridade"
            defaultValue="media"
            className="mt-1"
            options={PRIORIDADES_CHAMADO.map((p) => ({ value: p.id, label: p.label }))}
          />
        </div>
        <Button type="submit" size="compact">
          Abrir chamado
        </Button>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-surface shadow-sm">
        <table className="w-full min-w-[860px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-alt text-left text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Máquina / defeito</th>
              <th className="px-4 py-3">Prioridade</th>
              <th className="px-4 py-3">Status / agendamento</th>
            </tr>
          </thead>
          <tbody>
            {[...abertos, ...fechados].map((c) => (
              <tr key={c.id} className="border-b border-border last:border-b-0 hover:bg-surface-alt">
                <td className="px-4 py-3">
                  {c.empresas && (
                    <Link href={`/dashboard/clientes/${c.empresas.id}`} className="font-semibold text-foreground hover:text-accent-600">
                      {c.empresas.nome_fantasia}
                    </Link>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="text-foreground">{c.defeito}</p>
                  {c.maquina && <p className="text-xs text-foreground-muted">{c.maquina}</p>}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={c.prioridade === "alta" ? "destructive" : "secondary"}>
                    {PRIORIDADES_CHAMADO.find((p) => p.id === c.prioridade)?.label}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <form action={mudarStatusChamado} className="flex flex-wrap items-center gap-2">
                    <input type="hidden" name="chamado_id" value={c.id} />
                    <select name="status" defaultValue={c.status} className="min-h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground">
                      {STATUS_CHAMADO.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      name="agendado_para"
                      defaultValue={c.agendado_para ?? ""}
                      className="min-h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground"
                    />
                    <button type="submit" className="text-xs font-semibold text-accent-600 hover:underline">
                      salvar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {(chamados ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-foreground-muted">
                  Nenhum chamado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
