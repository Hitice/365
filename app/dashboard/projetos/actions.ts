"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";

function campo(fd: FormData, n: string): string | null {
  return String(fd.get(n) ?? "").trim() || null;
}
function data(bruto: string | null): string | null {
  return bruto && /^\d{4}-\d{2}-\d{2}$/.test(bruto) ? bruto : null;
}

export async function criarProjeto(formData: FormData) {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const empresa_id = campo(formData, "empresa_id");
  const titulo = campo(formData, "titulo");
  if (!empresa_id || !titulo) redirect("/dashboard/projetos/novo?error=Empresa e título são obrigatórios.");

  const { data: proj, error } = await supabase
    .from("projetos")
    .insert({
      empresa_id,
      titulo,
      previsao_entrega: data(campo(formData, "previsao_entrega")),
      observacoes: campo(formData, "observacoes"),
      responsavel_id: profile.id,
    })
    .select("id")
    .single();

  if (error || !proj) redirect(`/dashboard/projetos/novo?error=${encodeURIComponent(error?.message ?? "Erro.")}`);

  revalidatePath("/dashboard/projetos");
  redirect(`/dashboard/projetos/${proj.id}`);
}

export async function mudarStatusProjeto(formData: FormData) {
  const supabase = await createClient();
  const projetoId = String(formData.get("projeto_id") ?? "");
  const status = String(formData.get("status") ?? "");
  const validos = ["planejamento", "engenharia", "producao", "entrega", "concluido", "cancelado"];
  if (!projetoId || !validos.includes(status)) return;

  await supabase.from("projetos").update({ status }).eq("id", projetoId);
  revalidatePath(`/dashboard/projetos/${projetoId}`);
  revalidatePath("/dashboard/projetos");
  redirect(`/dashboard/projetos/${projetoId}`);
}
