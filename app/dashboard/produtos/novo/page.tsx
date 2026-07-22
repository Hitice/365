import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import { getCurrentProfile } from "@/lib/crm/session";
import { TIPOS_PRODUTO } from "@/lib/crm/types";
import { criarProduto } from "../actions";

export const metadata: Metadata = {
  title: "Novo produto",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle";

export default async function NovoProdutoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const profile = await getCurrentProfile();
  if (profile.role !== "team_leader") {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
        Produtos
      </p>
      <h1 className="mt-1 text-2xl font-bold text-foreground">Novo produto</h1>

      {error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {error}
        </p>
      )}

      <form
        action={criarProduto}
        className="mt-6 space-y-4 rounded-2xl bg-surface p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="nome" className={LABEL_CLASS}>
            Nome *
          </label>
          <input id="nome" name="nome" type="text" required className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="tipo" className={LABEL_CLASS}>
            Tipo *
          </label>
          <select id="tipo" name="tipo" required defaultValue="" className={INPUT_CLASS}>
            <option value="" disabled>
              Selecione
            </option>
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
            placeholder="a partir de R$ 25.000"
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
              defaultValue="0"
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
              defaultValue="un"
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
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus-visible:border-accent-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Criar produto</Button>
          <Button href="/dashboard/produtos" variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
