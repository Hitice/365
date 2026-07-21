import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Button from "@/components/Button";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default async function PainelPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
            Painel
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{user.email}</h1>
        </div>
        <form action={logout}>
          <Button type="submit" variant="secondary" size="compact">
            Sair
          </Button>
        </form>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-8 text-sm text-foreground-muted shadow-sm">
        Base do painel interno da Catech 360. As telas do CRM (clientes,
        orçamentos, ordens de serviço) entram aqui.
      </div>
    </main>
  );
}
