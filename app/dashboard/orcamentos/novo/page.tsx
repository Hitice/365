import type { Metadata } from "next";
import Button from "@/components/Button";
import { Combobox } from "@/components/ui/combobox";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { criarOrcamento } from "../actions";

export const metadata: Metadata = {
  title: "Novo orçamento",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle";

export default async function NovoOrcamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; empresa?: string }>;
}) {
  const sp = await searchParams;
  await getCurrentProfile();
  const supabase = await createClient();

  const { data: empresas } = await supabase
    .from("empresas")
    .select("id, nome_fantasia")
    .is("deleted_at", null)
    .order("nome_fantasia")
    .returns<{ id: string; nome_fantasia: string }[]>();

  return (
    <div className="mx-auto max-w-xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
        Comercial
      </p>
      <h1 className="mt-1 text-2xl font-bold text-foreground">Novo orçamento</h1>

      {sp.error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {sp.error}
        </p>
      )}

      <form action={criarOrcamento} className="mt-6 space-y-4 rounded-2xl bg-surface p-6 shadow-sm sm:p-8">
        <div>
          <label htmlFor="empresa_id" className={LABEL_CLASS}>
            Empresa *
          </label>
          <Combobox
            id="empresa_id"
            name="empresa_id"
            defaultValue={sp.empresa ?? ""}
            className="mt-1.5 min-h-11"
            placeholder="Selecione a empresa"
            searchPlaceholder="Buscar empresa..."
            emptyText="Nenhuma empresa."
            options={(empresas ?? []).map((e) => ({ value: e.id, label: e.nome_fantasia }))}
          />
        </div>
        <div>
          <label htmlFor="titulo" className={LABEL_CLASS}>
            Título *
          </label>
          <input id="titulo" name="titulo" type="text" required placeholder="Ex: Molde de injeção para cabo" className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="validade" className={LABEL_CLASS}>
            Validade
          </label>
          <input id="validade" name="validade" type="date" className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="observacoes" className={LABEL_CLASS}>
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            rows={3}
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus-visible:border-accent-500"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit">Criar e adicionar itens</Button>
          <Button href="/dashboard/orcamentos" variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
