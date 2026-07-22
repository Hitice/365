import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import {
  STATUS_ORCAMENTO,
  formatarValor,
  type Orcamento,
  type OrcamentoItem,
  type Produto,
} from "@/lib/crm/types";
import {
  adicionarItem,
  converterEmProjeto,
  mudarStatusOrcamento,
  removerItem,
} from "../actions";

export const metadata: Metadata = {
  title: "Orçamento",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "min-h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:border-accent-500";

type OrcamentoCompleto = Orcamento & {
  empresas: { id: string; nome_fantasia: string } | null;
  orcamento_itens: OrcamentoItem[];
};

export default async function OrcamentoFichaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  await getCurrentProfile();
  const supabase = await createClient();

  const { data: orcamento } = await supabase
    .from("orcamentos")
    .select("*, empresas ( id, nome_fantasia ), orcamento_itens ( * )")
    .eq("id", id)
    .is("deleted_at", null)
    .single<OrcamentoCompleto>();
  if (!orcamento) notFound();

  const { data: produtos } = await supabase
    .from("produtos")
    .select("id, nome")
    .eq("ativo", true)
    .order("nome")
    .returns<Pick<Produto, "id" | "nome">[]>();

  const itens = [...orcamento.orcamento_itens].sort((a, b) => a.created_at.localeCompare(b.created_at));
  const total = itens.reduce((s, i) => s + i.quantidade * i.valor_unitario, 0);
  const adicionarItemComId = adicionarItem.bind(null, id);

  return (
    <div>
      <Link href="/dashboard/orcamentos" className="text-sm text-foreground-muted hover:text-accent-600">
        ← Orçamentos
      </Link>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{orcamento.titulo}</h1>
            <Badge variant={orcamento.status === "aprovado" ? "default" : "secondary"}>
              {STATUS_ORCAMENTO.find((s) => s.id === orcamento.status)?.label}
            </Badge>
          </div>
          {orcamento.empresas && (
            <Link href={`/dashboard/clientes/${orcamento.empresas.id}`} className="mt-1 inline-block text-sm text-accent-600 hover:underline">
              {orcamento.empresas.nome_fantasia}
            </Link>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <form action={mudarStatusOrcamento} className="flex items-center gap-2">
            <input type="hidden" name="orcamento_id" value={orcamento.id} />
            <select name="status" defaultValue={orcamento.status} className="min-h-9 rounded-md border border-border bg-background px-2 text-xs font-medium text-foreground">
              {STATUS_ORCAMENTO.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <Button type="submit" size="compact" variant="secondary">
              Salvar status
            </Button>
          </form>
          {orcamento.status === "aprovado" && (
            <form action={converterEmProjeto}>
              <input type="hidden" name="orcamento_id" value={orcamento.id} />
              <Button type="submit" size="compact">
                Converter em projeto
              </Button>
            </form>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-surface shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-alt text-left text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Qtd.</th>
              <th className="px-4 py-3">Valor unit.</th>
              <th className="px-4 py-3">Subtotal</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {itens.map((it) => (
              <tr key={it.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 text-foreground">{it.descricao}</td>
                <td className="px-4 py-3 text-foreground-muted">
                  {it.quantidade} {it.unidade}
                </td>
                <td className="px-4 py-3 text-foreground-muted">{formatarValor(it.valor_unitario)}</td>
                <td className="px-4 py-3 font-semibold text-foreground">
                  {formatarValor(it.quantidade * it.valor_unitario)}
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={removerItem}>
                    <input type="hidden" name="item_id" value={it.id} />
                    <input type="hidden" name="orcamento_id" value={orcamento.id} />
                    <button type="submit" className="text-xs text-foreground-subtle hover:text-accent-600">
                      remover
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {itens.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-foreground-muted">
                  Nenhum item ainda. Adicione abaixo.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t border-border bg-surface-alt">
              <td colSpan={3} className="px-4 py-3 text-right text-sm font-semibold text-foreground-muted">
                Total
              </td>
              <td className="px-4 py-3 text-base font-bold text-foreground">{formatarValor(total || null)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      <form action={adicionarItemComId} className="mt-4 grid gap-3 rounded-2xl bg-surface p-4 shadow-sm sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-end">
        <div>
          <label htmlFor="descricao" className="text-xs font-semibold text-foreground-subtle">
            Item / serviço *
          </label>
          <input id="descricao" name="descricao" required list="produtos-lista" className={INPUT_CLASS} />
          <datalist id="produtos-lista">
            {(produtos ?? []).map((p) => (
              <option key={p.id} value={p.nome} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="quantidade" className="text-xs font-semibold text-foreground-subtle">
            Qtd.
          </label>
          <input id="quantidade" name="quantidade" defaultValue="1" inputMode="decimal" className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="unidade" className="text-xs font-semibold text-foreground-subtle">
            Unid.
          </label>
          <input id="unidade" name="unidade" defaultValue="un" className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="valor_unitario" className="text-xs font-semibold text-foreground-subtle">
            Valor unit.
          </label>
          <input id="valor_unitario" name="valor_unitario" inputMode="decimal" placeholder="0,00" className={INPUT_CLASS} />
        </div>
        <Button type="submit" size="compact">
          Adicionar
        </Button>
      </form>
    </div>
  );
}
