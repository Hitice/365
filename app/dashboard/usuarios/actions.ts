"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentProfile } from "@/lib/crm/session";
import type { Role } from "@/lib/crm/types";

async function exigirTeamLeader() {
  const profile = await getCurrentProfile();
  if (profile.role !== "team_leader") {
    redirect("/dashboard");
  }
  return profile;
}

export async function criarUsuario(formData: FormData) {
  await exigirTeamLeader();

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const senha = String(formData.get("senha") ?? "");
  const role = String(formData.get("role") ?? "vendedor") as Role;

  if (!nome || !email || senha.length < 6) {
    redirect(
      "/dashboard/usuarios/novo?error=" +
        encodeURIComponent("Preencha nome, e-mail e uma senha com pelo menos 6 caracteres."),
    );
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
    user_metadata: { nome, role },
  });

  if (error) {
    redirect(`/dashboard/usuarios/novo?error=${encodeURIComponent(error.message)}`);
  }

  // O trigger on_auth_user_created cria a linha em profiles automaticamente.
  revalidatePath("/dashboard/usuarios");
  redirect("/dashboard/usuarios");
}

export async function atualizarUsuario(usuarioId: string, formData: FormData) {
  const quemEdita = await exigirTeamLeader();

  const nome = String(formData.get("nome") ?? "").trim();
  // Nunca deixa o proprio team_leader se rebaixar, mesmo que o form seja
  // manipulado — o campo de cargo nem aparece no form quando eh a propria
  // conta, mas isso aqui e o cinto de seguranca no servidor.
  const role =
    usuarioId === quemEdita.id
      ? quemEdita.role
      : (String(formData.get("role") ?? "vendedor") as Role);

  if (!nome) {
    redirect(`/dashboard/usuarios?error=${encodeURIComponent("Nome é obrigatório.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ nome, role })
    .eq("id", usuarioId);

  if (error) {
    redirect(`/dashboard/usuarios?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/usuarios");
  redirect("/dashboard/usuarios");
}

export async function alternarAtivo(formData: FormData) {
  const profile = await exigirTeamLeader();

  const usuarioId = String(formData.get("usuario_id") ?? "");
  const novoStatus = String(formData.get("novo_status") ?? "") === "true";

  if (!usuarioId) return;
  if (usuarioId === profile.id) {
    redirect(`/dashboard/usuarios?error=${encodeURIComponent("Você não pode desativar a própria conta.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ ativo: novoStatus })
    .eq("id", usuarioId);

  if (error) {
    redirect(`/dashboard/usuarios?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/usuarios");
  redirect("/dashboard/usuarios");
}
