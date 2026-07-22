import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import type { Profile } from "@/lib/crm/types";
import { alternarAtivo } from "./actions";

export const metadata: Metadata = {
  title: "Usuários",
  robots: { index: false, follow: false },
};

export default async function UsuariosPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const profile = await getCurrentProfile();
  if (profile.role !== "team_leader") {
    redirect("/dashboard");
  }

  const supabase = await createClient();
  const { data: usuarios } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at")
    .returns<Profile[]>();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
            Usuários
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Equipe</h1>
        </div>
        <Button href="/dashboard/usuarios/novo">Novo usuário</Button>
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {!usuarios || usuarios.length === 0 ? (
          <p className="p-6 text-sm text-foreground-muted">Nenhum usuário ainda.</p>
        ) : (
          <ul>
            {usuarios.map((u) => (
              <li
                key={u.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    {u.nome}
                    {!u.ativo && (
                      <span className="rounded-full bg-border px-2 py-0.5 text-[11px] font-medium uppercase text-foreground-muted">
                        Inativo
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground-subtle">
                    {u.email} · {u.role === "team_leader" ? "Team leader" : "Vendedor"}
                  </p>
                </div>
                <div className="flex flex-none items-center gap-3">
                  <Link
                    href={`/dashboard/usuarios/${u.id}/editar`}
                    className="text-sm font-medium text-accent-600 hover:underline"
                  >
                    Editar
                  </Link>
                  {u.id !== profile.id && (
                    <form action={alternarAtivo}>
                      <input type="hidden" name="usuario_id" value={u.id} />
                      <input type="hidden" name="novo_status" value={String(!u.ativo)} />
                      <button
                        type="submit"
                        className="text-sm font-medium text-foreground-muted hover:text-foreground"
                      >
                        {u.ativo ? "Desativar" : "Reativar"}
                      </button>
                    </form>
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
