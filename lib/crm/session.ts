import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "./types";

/*
  Busca o usuario logado + a linha correspondente em profiles. Usado no
  layout do /dashboard e em qualquer pagina que precise checar o role (ex:
  /dashboard/usuarios, que so team_leader pode ver). Redireciona pro login
  se nao houver sessao.
*/
export async function getCurrentProfile(): Promise<Profile> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // Nao deveria acontecer (trigger/backfill cria a linha automaticamente),
    // mas se acontecer e melhor avisar do que deixar a pagina quebrar.
    redirect("/login?error=Perfil não encontrado. Fale com o administrador.");
  }

  if (!(profile as Profile).ativo) {
    // "Desativar" em /dashboard/usuarios precisa bloquear acesso de verdade,
    // nao so mudar uma etiqueta na lista.
    await supabase.auth.signOut();
    redirect("/login?error=Sua conta foi desativada. Fale com o administrador.");
  }

  return profile as Profile;
}
