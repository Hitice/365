import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { STATUS_PROJETO, type Projeto } from "@/lib/crm/types";

export const metadata: Metadata = {
  title: "Projetos",
  robots: { index: false, follow: false },
};

type ProjetoLinha = Projeto & { empresas: { id: string; nome_fantasia: string } | null };

export default async function ProjetosPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const sp = await searchParams;
  await getCurrentProfile();
  const supabase = await createClient();

  let query = supabase
    .from("projetos")
    .select("*, empresas ( id, nome_fantasia )")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (sp.status) query = query.eq("status", sp.status);

  const { data } = await query.returns<ProjetoLinha[]>();
  const projetos = data ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
            Operações
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Projetos</h1>
        </div>
        <Button href="/dashboard/projetos/novo">Novo projeto</Button>
      </div>

      {sp.error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {sp.error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-surface shadow-sm">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-alt text-left text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              <th className="px-4 py-3">Projeto</th>
              <th className="px-4 py-3">Empresa</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Previsão</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-b-0 hover:bg-surface-alt">
                <td className="px-4 py-3">
                  <Link href={`/dashboard/projetos/${p.id}`} className="font-semibold text-foreground hover:text-accent-600">
                    {p.titulo}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {p.empresas && (
                    <Link href={`/dashboard/clientes/${p.empresas.id}`} className="text-accent-600 hover:underline">
                      {p.empresas.nome_fantasia}
                    </Link>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={p.status === "concluido" ? "default" : "secondary"}>
                    {STATUS_PROJETO.find((s) => s.id === p.status)?.label ?? p.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-foreground-muted">
                  {p.previsao_entrega ? new Date(`${p.previsao_entrega}T12:00:00`).toLocaleDateString("pt-BR") : "—"}
                </td>
              </tr>
            ))}
            {projetos.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-foreground-muted">
                  Nenhum projeto ainda. Crie um ou converta um orçamento aprovado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
