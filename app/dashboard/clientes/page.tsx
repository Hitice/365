import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { NICHOS, type Empresa } from "@/lib/crm/types";
import { sincronizarAsaas } from "./actions";

export const metadata: Metadata = {
  title: "Clientes",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "min-h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:border-accent-500";

/*
  Cadastro unico de empresas: lead e cliente sao STATUS da mesma
  empresa (nunca duplica). O funil de negocios vive em /dashboard/negocios.
*/
export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string; status?: string; nicho?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  let query = supabase
    .from("empresas")
    .select("*, pessoas ( id, nome, deleted_at )")
    .is("deleted_at", null)
    .order("nome_fantasia");
  if (sp.status === "lead" || sp.status === "cliente") query = query.eq("status", sp.status);
  if (sp.nicho) query = query.eq("nicho", sp.nicho);
  if (sp.q) query = query.or(`nome_fantasia.ilike.%${sp.q}%,razao_social.ilike.%${sp.q}%`);

  const { data } = await query.returns<(Empresa & { pessoas: { id: string; nome: string; deleted_at: string | null }[] })[]>();
  const empresas = data ?? [];

  const nichoLabel = (id: string | null) => NICHOS.find((n) => n.id === id)?.label ?? "—";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
            Comercial
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Clientes</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Cadastro único de empresas — lead e cliente são status, nunca duplicam.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {profile.role === "team_leader" && (
            <form action={sincronizarAsaas}>
              <Button type="submit" variant="secondary">
                Sincronizar com Asaas
              </Button>
            </form>
          )}
          <Button href="/dashboard/clientes/novo">Nova empresa</Button>
        </div>
      </div>

      {sp.error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {sp.error}
        </p>
      )}
      {sp.ok && (
        <p className="mt-4 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground">
          {sp.ok}
        </p>
      )}

      <form method="get" className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-surface p-4">
        <div className="flex flex-1 flex-col gap-1 sm:min-w-[200px]">
          <label htmlFor="q" className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground-subtle">
            Buscar
          </label>
          <input id="q" name="q" type="text" defaultValue={sp.q ?? ""} placeholder="Nome ou razão social..." className={INPUT_CLASS} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground-subtle">
            Status
          </label>
          <select id="status" name="status" defaultValue={sp.status ?? ""} className={INPUT_CLASS}>
            <option value="">Todos</option>
            <option value="lead">Lead</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="nicho" className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground-subtle">
            Nicho
          </label>
          <select id="nicho" name="nicho" defaultValue={sp.nicho ?? ""} className={INPUT_CLASS}>
            <option value="">Todos</option>
            {NICHOS.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="compact">
          Filtrar
        </Button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[880px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-alt text-left text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              <th className="px-4 py-3">Empresa</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Contato</th>
              <th className="px-4 py-3">Nicho</th>
              <th className="px-4 py-3">Cidade</th>
              <th className="px-4 py-3">Asaas</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((e) => {
              const pessoa = e.pessoas.find((p) => !p.deleted_at);
              return (
                <tr key={e.id} className="border-b border-border last:border-b-0 hover:bg-surface-alt">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/clientes/${e.id}`} className="font-semibold text-foreground hover:text-accent-600">
                      {e.nome_fantasia}
                    </Link>
                    {e.razao_social && e.razao_social !== e.nome_fantasia && (
                      <p className="text-xs text-foreground-muted">{e.razao_social}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={e.status === "cliente" ? "default" : "secondary"}>
                      {e.status === "cliente" ? "Cliente" : "Lead"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col text-xs">
                      {pessoa && <span className="font-medium text-foreground">{pessoa.nome}</span>}
                      {e.telefone && <span className="text-foreground-muted">{e.telefone}</span>}
                      {e.email && <span className="text-foreground-muted">{e.email}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground-muted">{nichoLabel(e.nicho)}</td>
                  <td className="px-4 py-3 text-foreground-muted">{e.cidade ?? "—"}</td>
                  <td className="px-4 py-3">
                    {e.asaas_customer_id ? (
                      <span className="text-xs font-semibold text-accent-600">✓</span>
                    ) : (
                      <span className="text-xs text-foreground-subtle">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {empresas.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-foreground-muted">
                  Nenhuma empresa. Cadastre uma ou sincronize com o Asaas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
