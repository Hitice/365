import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Button from "@/components/Button";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import type { Profile } from "@/lib/crm/types";
import { atualizarUsuario } from "../../actions";

export const metadata: Metadata = {
  title: "Editar usuário",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle";

export default async function EditarUsuarioPage({
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
  const { data: usuario } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single<Profile>();

  if (!usuario) notFound();

  const atualizarUsuarioComId = atualizarUsuario.bind(null, id);

  return (
    <div className="mx-auto max-w-xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
        Usuários
      </p>
      <h1 className="mt-1 text-2xl font-bold text-foreground">Editar usuário</h1>
      <p className="mt-2 text-sm text-foreground-muted">{usuario.email}</p>

      <form
        action={atualizarUsuarioComId}
        className="mt-6 space-y-4 rounded-2xl bg-surface p-6 shadow-sm sm:p-8"
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
            defaultValue={usuario.nome}
            className={INPUT_CLASS}
          />
        </div>
        {usuario.id === profile.id ? (
          <div>
            <input type="hidden" name="role" value={usuario.role} />
            <p className={LABEL_CLASS}>Cargo</p>
            <p className="mt-1.5 text-sm text-foreground-muted">
              Team leader — você não pode alterar o próprio cargo.
            </p>
          </div>
        ) : (
          <div>
            <label htmlFor="role" className={LABEL_CLASS}>
              Cargo
            </label>
            <select id="role" name="role" defaultValue={usuario.role} className={INPUT_CLASS}>
              <option value="vendedor">Vendedor</option>
              <option value="team_leader">Team leader</option>
            </select>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit">Salvar</Button>
          <Button href="/dashboard/usuarios" variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
