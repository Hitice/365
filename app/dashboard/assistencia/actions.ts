"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";

function campo(fd: FormData, n: string): string | null {
  return String(fd.get(n) ?? "").trim() || null;
}

export async function abrirChamado(formData: FormData) {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const empresa_id = campo(formData, "empresa_id");
  const defeito = campo(formData, "defeito");
  if (!empresa_id || !defeito) {
    redirect("/dashboard/assistencia?error=Empresa e defeito são obrigatórios.");
  }

  const prioridade = campo(formData, "prioridade");
  await supabase.from("chamados").insert({
    empresa_id,
    maquina: campo(formData, "maquina"),
    defeito,
    prioridade: ["baixa", "media", "alta"].includes(prioridade ?? "") ? prioridade : "media",
    responsavel_id: profile.id,
  });

  revalidatePath("/dashboard/assistencia");
  redirect("/dashboard/assistencia");
}

export async function mudarStatusChamado(formData: FormData) {
  const supabase = await createClient();
  const chamadoId = String(formData.get("chamado_id") ?? "");
  const status = String(formData.get("status") ?? "");
  const validos = ["aberto", "agendado", "em_atendimento", "aguardando_peca", "fechado"];
  if (!chamadoId || !validos.includes(status)) return;

  const agendado = String(formData.get("agendado_para") ?? "");
  await supabase
    .from("chamados")
    .update({
      status,
      agendado_para: /^\d{4}-\d{2}-\d{2}$/.test(agendado) ? agendado : null,
    })
    .eq("id", chamadoId);

  revalidatePath("/dashboard/assistencia");
  redirect("/dashboard/assistencia");
}
