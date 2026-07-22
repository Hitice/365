import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import { getCurrentProfile } from "@/lib/crm/session";
import { criarUsuario } from "../actions";

export const metadata: Metadata = {
  title: "Novo usuário",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle";

export default async function NovoUsuarioPage({
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
        Usuários
      </p>
      <h1 className="mt-1 text-2xl font-bold text-foreground">Novo usuário</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Cria o login (e-mail e senha) direto — não precisa mexer no
        dashboard do Supabase. Avise a senha pro usuário por fora (WhatsApp,
        por exemplo).
      </p>

      {error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {error}
        </p>
      )}

      <form
        action={criarUsuario}
        className="mt-6 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="nome" className={LABEL_CLASS}>
            Nome *
          </label>
          <input id="nome" name="nome" type="text" required className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="email" className={LABEL_CLASS}>
            E-mail *
          </label>
          <input id="email" name="email" type="email" required className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="senha" className={LABEL_CLASS}>
            Senha inicial *
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className={INPUT_CLASS}
          />
          <p className="mt-1 text-xs text-foreground-subtle">Pelo menos 6 caracteres.</p>
        </div>
        <div>
          <label htmlFor="role" className={LABEL_CLASS}>
            Cargo
          </label>
          <select id="role" name="role" defaultValue="vendedor" className={INPUT_CLASS}>
            <option value="vendedor">Vendedor</option>
            <option value="team_leader">Team leader</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Criar usuário</Button>
          <Button href="/dashboard/usuarios" variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
