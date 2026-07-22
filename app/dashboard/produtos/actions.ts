"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import type { TipoProduto } from "@/lib/crm/types";

const TIPOS_VALIDOS: TipoProduto[] = ["maquina", "usinagem", "ferramentaria", "material"];

// Aceita "12", "12,5" ou "12.5"; qualquer coisa invalida vira 0.
function lerQuantidade(formData: FormData): number {
  const bruto = String(formData.get("quantidade") ?? "").trim().replace(",", ".");
  const numero = Number(bruto);
  return Number.isFinite(numero) && numero >= 0 ? numero : 0;
}

async function exigirTeamLeader() {
  const profile = await getCurrentProfile();
  if (profile.role !== "team_leader") {
    redirect("/dashboard");
  }
  return profile;
}

export async function criarProduto(formData: FormData) {
  await exigirTeamLeader();
  const supabase = await createClient();

  const nome = String(formData.get("nome") ?? "").trim();
  const tipo = String(formData.get("tipo") ?? "") as TipoProduto;
  const descricao = String(formData.get("descricao") ?? "").trim() || null;
  const preco = String(formData.get("preco") ?? "").trim() || null;
  const quantidade = lerQuantidade(formData);
  const unidade = String(formData.get("unidade") ?? "").trim() || "un";

  if (!nome || !TIPOS_VALIDOS.includes(tipo)) {
    redirect(
      `/dashboard/produtos/novo?error=${encodeURIComponent("Preencha nome e tipo do produto.")}`,
    );
  }

  const { error } = await supabase
    .from("produtos")
    .insert({ nome, tipo, descricao, preco, quantidade, unidade });

  if (error) {
    redirect(`/dashboard/produtos/novo?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/produtos");
  redirect("/dashboard/produtos");
}

export async function atualizarProduto(produtoId: string, formData: FormData) {
  await exigirTeamLeader();
  const supabase = await createClient();

  const nome = String(formData.get("nome") ?? "").trim();
  const tipo = String(formData.get("tipo") ?? "") as TipoProduto;
  const descricao = String(formData.get("descricao") ?? "").trim() || null;
  const preco = String(formData.get("preco") ?? "").trim() || null;
  const quantidade = lerQuantidade(formData);
  const unidade = String(formData.get("unidade") ?? "").trim() || "un";

  if (!nome || !TIPOS_VALIDOS.includes(tipo)) {
    redirect(
      `/dashboard/produtos?error=${encodeURIComponent("Preencha nome e tipo do produto.")}`,
    );
  }

  const { error } = await supabase
    .from("produtos")
    .update({ nome, tipo, descricao, preco, quantidade, unidade })
    .eq("id", produtoId);

  if (error) {
    redirect(`/dashboard/produtos?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/produtos");
  redirect("/dashboard/produtos");
}

export async function alternarAtivoProduto(formData: FormData) {
  await exigirTeamLeader();

  const produtoId = String(formData.get("produto_id") ?? "");
  const novoStatus = String(formData.get("novo_status") ?? "") === "true";
  if (!produtoId) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("produtos")
    .update({ ativo: novoStatus })
    .eq("id", produtoId);

  if (error) {
    redirect(`/dashboard/produtos?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/produtos");
  redirect("/dashboard/produtos");
}
