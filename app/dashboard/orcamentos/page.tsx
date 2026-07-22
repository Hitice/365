import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { STATUS_ORCAMENTO, formatarValor, type Orcamento } from "@/lib/crm/types";

export const metadata: Metadata = {
  title: "Orçamentos",
  robots: { index: false, follow: false },
};

type OrcamentoLinha = Orcamento & {
  empresas: { id: string; nome_fantasia: string } | null;
  orcamento_itens: { quantidade: number; valor_unitario: number }[];
};

const VARIANTE: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  rascunho: "outline",
  enviado: "secondary",
  aprovado: "default",
  recusado: "destructive",
  vencido: "destructive",
};

export default async function OrcamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const sp = await searchParams;
  await getCurrentProfile();
  const supabase = await createClient();

  let query = supabase
    .from("orcamentos")
    .select("*, empresas ( id, nome_fantasia ), orcamento_itens ( quantidade, valor_unitario )")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (sp.status) query = query.eq("status", sp.status);

  const { data } = await query.returns<OrcamentoLinha[]>();
  const orcamentos = data ?? [];

  const totalDe = (o: OrcamentoLinha) =>
    o.orcamento_itens.reduce((s, i) => s + i.quantidade * i.valor_unitario, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
            Comercial
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Orçamentos</h1>
        </div>
        <Button href="/dashboard/orcamentos/novo">Novo orçamento</Button>
      </div>

      {sp.error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {sp.error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-alt text-left text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              <th className="px-4 py-3">Orçamento</th>
              <th className="px-4 py-3">Empresa</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Validade</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-b-0 hover:bg-surface-alt">
                <td className="px-4 py-3">
                  <Link href={`/dashboard/orcamentos/${o.id}`} className="font-semibold text-foreground hover:text-accent-600">
                    {o.titulo}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {o.empresas && (
                    <Link href={`/dashboard/clientes/${o.empresas.id}`} className="text-accent-600 hover:underline">
                      {o.empresas.nome_fantasia}
                    </Link>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={VARIANTE[o.status] ?? "outline"}>
                    {STATUS_ORCAMENTO.find((s) => s.id === o.status)?.label ?? o.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">{formatarValor(totalDe(o) || null)}</td>
                <td className="px-4 py-3 text-xs text-foreground-muted">
                  {o.validade ? new Date(`${o.validade}T12:00:00`).toLocaleDateString("pt-BR") : "—"}
                </td>
              </tr>
            ))}
            {orcamentos.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-foreground-muted">
                  Nenhum orçamento ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
