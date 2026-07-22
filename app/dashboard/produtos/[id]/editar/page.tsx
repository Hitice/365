import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Button from "@/components/Button";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { TIPOS_PRODUTO, type Produto } from "@/lib/crm/types";
import { atualizarProduto } from "../../actions";

export const metadata: Metadata = {
  title: "Editar produto",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle";

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getCurrentProfile();
  if (profile.role !== "team_leader") {
    redirect("/dashboard");
  }

  const supabase = await createClient();
  const { data: produto } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .single<Produto>();

  if (!produto) notFound();

  const atualizarProdutoComId = atualizarProduto.bind(null, id);

  return (
    <div className="mx-auto max-w-xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
        Produtos
      </p>
      <h1 className="mt-1 text-2xl font-bold text-foreground">Editar produto</h1>

      <form
        action={atualizarProdutoComId}
        className="mt-6 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="nome" className={LABEL_CLASS}>
            Nome *
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            defaultValue={produto.nome}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="tipo" className={LABEL_CLASS}>
            Tipo *
          </label>
          <select id="tipo" name="tipo" required defaultValue={produto.tipo} className={INPUT_CLASS}>
            {TIPOS_PRODUTO.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="preco" className={LABEL_CLASS}>
            Preço
          </label>
          <input
            id="preco"
            name="preco"
            type="text"
            defaultValue={produto.preco ?? ""}
            className={INPUT_CLASS}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quantidade" className={LABEL_CLASS}>
              Estoque
            </label>
            <input
              id="quantidade"
              name="quantidade"
              type="text"
              inputMode="decimal"
              defaultValue={String(produto.quantidade ?? 0)}
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="unidade" className={LABEL_CLASS}>
              Unidade
            </label>
            <input
              id="unidade"
              name="unidade"
              type="text"
              defaultValue={produto.unidade ?? "un"}
              placeholder="un, kg, chapa, tarugo..."
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div>
          <label htmlFor="descricao" className={LABEL_CLASS}>
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows={3}
            defaultValue={produto.descricao ?? ""}
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus-visible:border-accent-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Salvar</Button>
          <Button href="/dashboard/produtos" variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
