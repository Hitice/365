import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { TIPOS_PRODUTO, type Produto } from "@/lib/crm/types";
import { alternarAtivoProduto } from "./actions";

export const metadata: Metadata = {
  title: "Produtos",
  robots: { index: false, follow: false },
};

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const profile = await getCurrentProfile();
  const isTeamLeader = profile.role === "team_leader";

  const supabase = await createClient();
  const { data: produtos } = await supabase
    .from("produtos")
    .select("*")
    .order("tipo")
    .order("nome")
    .returns<Produto[]>();

  const tipoLabel = (tipo: string) => TIPOS_PRODUTO.find((t) => t.id === tipo)?.label ?? tipo;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
            Produtos
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Catálogo</h1>
        </div>
        {isTeamLeader && <Button href="/dashboard/produtos/novo">Novo produto</Button>}
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {!produtos || produtos.length === 0 ? (
          <p className="p-6 text-sm text-foreground-muted">Nenhum produto cadastrado ainda.</p>
        ) : (
          <ul>
            {produtos.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                    {p.nome}
                    <span className="rounded-full bg-accent-500/15 px-2 py-0.5 text-[11px] font-medium uppercase text-accent-600">
                      {tipoLabel(p.tipo)}
                    </span>
                    {!p.ativo && (
                      <span className="rounded-full bg-border px-2 py-0.5 text-[11px] font-medium uppercase text-foreground-muted">
                        Inativo
                      </span>
                    )}
                  </p>
                  {p.descricao && (
                    <p className="mt-0.5 max-w-xl truncate text-xs text-foreground-subtle">
                      {p.descricao}
                    </p>
                  )}
                </div>
                <div className="flex flex-none items-center gap-3">
                  {p.tipo === "material" && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        Number(p.quantidade) > 0
                          ? "bg-border text-foreground-muted"
                          : "bg-accent-500/15 text-accent-600"
                      }`}
                    >
                      {Number(p.quantidade) > 0
                        ? `${p.quantidade} ${p.unidade ?? "un"}`
                        : "Sem estoque"}
                    </span>
                  )}
                  {p.preco && (
                    <span className="text-sm font-semibold text-accent-600">{p.preco}</span>
                  )}
                  {isTeamLeader && (
                    <>
                      <Link
                        href={`/dashboard/produtos/${p.id}/editar`}
                        className="text-sm font-medium text-accent-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <form action={alternarAtivoProduto}>
                        <input type="hidden" name="produto_id" value={p.id} />
                        <input type="hidden" name="novo_status" value={String(!p.ativo)} />
                        <button
                          type="submit"
                          className="text-sm font-medium text-foreground-muted hover:text-foreground"
                        >
                          {p.ativo ? "Desativar" : "Reativar"}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
