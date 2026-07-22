"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export type ResultadoBusca = {
  id: string;
  nome_fantasia: string;
  razao_social: string | null;
  status: string;
  cidade: string | null;
};

// Busca global da topbar: consulta empresas por nome fantasia ou razao
// social. Retorna [] pra termos muito curtos (evita varrer a base a cada
// tecla). Cada resultado leva pra ficha da empresa.
export async function buscarEmpresas(q: string): Promise<ResultadoBusca[]> {
  const termo = q.trim();
  if (termo.length < 2) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("empresas")
    .select("id, nome_fantasia, razao_social, status, cidade")
    .is("deleted_at", null)
    .or(`nome_fantasia.ilike.%${termo}%,razao_social.ilike.%${termo}%`)
    .order("nome_fantasia")
    .limit(8)
    .returns<ResultadoBusca[]>();

  return data ?? [];
}
