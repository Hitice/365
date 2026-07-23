import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import Button from "@/components/Button";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next = "/dashboard" } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2.5 text-foreground">
          <Logo className="h-9" priority />
        </Link>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <h1 className="text-xl font-bold text-foreground">Entrar</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Acesso restrito à equipe Catech 360.
          </p>

          {error && (
            <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
              {error}
            </p>
          )}

          <form action={login} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500"
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
