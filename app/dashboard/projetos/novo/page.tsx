import type { Metadata } from "next";
import Button from "@/components/Button";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { criarProjeto } from "../actions";

export const metadata: Metadata = {
  title: "Novo projeto",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle";

export default async function NovoProjetoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
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
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">Operações</p>
      <h1 className="mt-1 text-2xl font-bold text-foreground">Novo projeto</h1>

      {error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {error}
        </p>
      )}

      <form action={criarProjeto} className="mt-6 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div>
          <label htmlFor="empresa_id" className={LABEL_CLASS}>
            Empresa *
          </label>
          <select id="empresa_id" name="empresa_id" required defaultValue="" className={INPUT_CLASS}>
            <option value="" disabled>
              Selecione
            </option>
            {(empresas ?? []).map((e) => (
              <option key={e.id} value={e.id}>
                {e.nome_fantasia}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="titulo" className={LABEL_CLASS}>
            Título *
          </label>
          <input id="titulo" name="titulo" type="text" required className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="previsao_entrega" className={LABEL_CLASS}>
            Previsão de entrega
          </label>
          <input id="previsao_entrega" name="previsao_entrega" type="date" className={INPUT_CLASS} />
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
          <Button type="submit">Criar projeto</Button>
          <Button href="/dashboard/projetos" variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
