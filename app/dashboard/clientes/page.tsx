import type { Metadata } from "next";
import Button from "@/components/Button";
import ClientesFiltros from "@/components/dashboard/ClientesFiltros";
import ClientesTabela from "@/components/dashboard/ClientesTabela";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { listarEmpresas, sincronizarAsaas } from "./actions";
import { BATCH_EMPRESAS } from "./lista";

export const metadata: Metadata = {
  title: "Clientes",
  robots: { index: false, follow: false },
};

/*
  Cadastro unico de empresas: lead e cliente sao STATUS da mesma empresa
  (nunca duplica). A lista usa rolagem infinita (ClientesTabela) e os filtros
  vivem na URL, aplicados em tempo real (ClientesFiltros).
*/
export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string; status?: string; nicho?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const filtros = { q: sp.q, status: sp.status, nicho: sp.nicho };
  const inicial = await listarEmpresas(filtros, 0, BATCH_EMPRESAS);

  // Total apenas pra exibir a contagem (o carregamento em si e por lotes).
  let countQuery = supabase.from("empresas").select("id", { count: "exact", head: true }).is("deleted_at", null);
  if (sp.status === "lead" || sp.status === "cliente") countQuery = countQuery.eq("status", sp.status);
  if (sp.nicho) countQuery = countQuery.eq("nicho", sp.nicho);
  if (sp.q) countQuery = countQuery.or(`nome_fantasia.ilike.%${sp.q}%,razao_social.ilike.%${sp.q}%`);
  const { count } = await countQuery;
  const total = count ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">Comercial</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Clientes</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Cadastro único de empresas: lead e cliente são status.
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
        <p className="mt-4 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground">{sp.ok}</p>
      )}

      <ClientesFiltros />

      <p className="mt-4 text-sm text-foreground-muted">
        {total} empresa{total === 1 ? "" : "s"}
      </p>

      <ClientesTabela
        key={`${sp.q ?? ""}|${sp.status ?? ""}|${sp.nicho ?? ""}`}
        inicial={inicial}
        filtros={filtros}
      />
    </div>
  );
}
