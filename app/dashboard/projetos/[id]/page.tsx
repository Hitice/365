import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { STATUS_PROJETO, type Projeto } from "@/lib/crm/types";
import { mudarStatusProjeto } from "../actions";

export const metadata: Metadata = {
  title: "Projeto",
  robots: { index: false, follow: false },
};

type ProjetoCompleto = Projeto & {
  empresas: { id: string; nome_fantasia: string } | null;
  orcamentos: { id: string; titulo: string } | null;
};

export default async function ProjetoFichaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await getCurrentProfile();
  const supabase = await createClient();

  const { data: projeto } = await supabase
    .from("projetos")
    .select("*, empresas ( id, nome_fantasia ), orcamentos ( id, titulo )")
    .eq("id", id)
    .is("deleted_at", null)
    .single<ProjetoCompleto>();
  if (!projeto) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/dashboard/projetos" className="text-sm text-foreground-muted hover:text-accent-600">
        ← Projetos
      </Link>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{projeto.titulo}</h1>
            <Badge variant={projeto.status === "concluido" ? "default" : "secondary"}>
              {STATUS_PROJETO.find((s) => s.id === projeto.status)?.label}
            </Badge>
          </div>
          {projeto.empresas && (
            <Link href={`/dashboard/clientes/${projeto.empresas.id}`} className="mt-1 inline-block text-sm text-accent-600 hover:underline">
              {projeto.empresas.nome_fantasia}
            </Link>
          )}
        </div>
        <form action={mudarStatusProjeto} className="flex items-center gap-2">
          <input type="hidden" name="projeto_id" value={projeto.id} />
          <select name="status" defaultValue={projeto.status} className="min-h-9 rounded-md border border-border bg-background px-2 text-xs font-medium text-foreground">
            {STATUS_PROJETO.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <Button type="submit" size="compact" variant="secondary">
            Salvar
          </Button>
        </form>
      </div>

      <div className="mt-6 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase text-foreground-subtle">Previsão de entrega</p>
            <p className="mt-0.5 text-foreground">
              {projeto.previsao_entrega
                ? new Date(`${projeto.previsao_entrega}T12:00:00`).toLocaleDateString("pt-BR")
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-foreground-subtle">Orçamento de origem</p>
            {projeto.orcamentos ? (
              <Link href={`/dashboard/orcamentos/${projeto.orcamentos.id}`} className="mt-0.5 inline-block text-accent-600 hover:underline">
                {projeto.orcamentos.titulo}
              </Link>
            ) : (
              <p className="mt-0.5 text-foreground">—</p>
            )}
          </div>
        </div>
        {projeto.observacoes && (
          <div>
            <p className="text-xs font-semibold uppercase text-foreground-subtle">Observações</p>
            <p className="mt-0.5 whitespace-pre-line text-sm text-foreground">{projeto.observacoes}</p>
          </div>
        )}
        <p className="border-t border-border pt-3 text-xs text-foreground-subtle">
          Arquivos técnicos (STEP/DXF/DWG/PDF/fotos) e checklist de produção chegam na
          próxima etapa, plugados neste projeto.
        </p>
      </div>
    </div>
  );
}
