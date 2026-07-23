"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { criarCliente, listarClientes } from "@/lib/asaas";
import type { EtapaNegocio, FuncaoPessoa, Nicho } from "@/lib/crm/types";
import type { EmpresaLinha, FiltrosEmpresas } from "./lista";

const NICHO_VALIDOS: Nicho[] = ["marcenaria", "comunicacao_visual", "industria", "transformacao"];
const ETAPA_VALIDAS: EtapaNegocio[] = [
  "novo",
  "contato",
  "levantamento",
  "orcamento",
  "negociacao",
  "fechado",
  "perdido",
];
const FUNCAO_VALIDAS: FuncaoPessoa[] = ["comercial", "financeiro", "engenharia", "compras", "outro"];

function campo(formData: FormData, nome: string): string | null {
  return String(formData.get(nome) ?? "").trim() || null;
}

function lerValor(bruto: string | null): number | null {
  if (!bruto) return null;
  const n = Number(
    (bruto.includes(",") ? bruto.replace(/\./g, "").replace(",", ".") : bruto).replace(/[^\d.]/g, ""),
  );
  return Number.isFinite(n) && n > 0 ? n : null;
}

function lerData(bruto: string | null): string | null {
  return bruto && /^\d{4}-\d{2}-\d{2}$/.test(bruto) ? bruto : null;
}

// ------------------------------------------------------------ listagem (scroll)
// Um lote da lista de empresas, ja com os filtros aplicados. A rolagem
// infinita chama isto com offset crescente ate vir menos que o limite.
export async function listarEmpresas(
  filtros: FiltrosEmpresas,
  offset: number,
  limit: number,
): Promise<EmpresaLinha[]> {
  const supabase = await createClient();
  let query = supabase
    .from("empresas")
    .select(
      "id, nome_fantasia, razao_social, status, telefone, email, nicho, cidade, asaas_customer_id, pessoas ( id, nome, deleted_at )",
    )
    .is("deleted_at", null)
    .order("nome_fantasia");
  if (filtros.status === "lead" || filtros.status === "cliente") query = query.eq("status", filtros.status);
  if (filtros.nicho) query = query.eq("nicho", filtros.nicho);
  const termo = filtros.q?.trim();
  if (termo) query = query.or(`nome_fantasia.ilike.%${termo}%,razao_social.ilike.%${termo}%`);

  const { data } = await query.range(offset, offset + limit - 1).returns<EmpresaLinha[]>();
  return data ?? [];
}

// ------------------------------------------------------------------ empresas
export async function criarEmpresa(formData: FormData) {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const nome_fantasia = campo(formData, "nome_fantasia");
  if (!nome_fantasia) redirect("/dashboard/clientes/novo?error=Nome da empresa é obrigatório.");

  const nichoBruto = campo(formData, "nicho");
  const status = campo(formData, "status") === "cliente" ? "cliente" : "lead";
  const { data, error } = await supabase
    .from("empresas")
    .insert({
      status,
      nome_fantasia,
      razao_social: campo(formData, "razao_social"),
      cnpj: campo(formData, "cnpj"),
      inscricao_estadual: campo(formData, "inscricao_estadual"),
      email: campo(formData, "email"),
      telefone: campo(formData, "telefone"),
      endereco: campo(formData, "endereco"),
      numero: campo(formData, "numero"),
      bairro: campo(formData, "bairro"),
      cidade: campo(formData, "cidade"),
      estado: campo(formData, "estado"),
      cep: campo(formData, "cep"),
      nicho: NICHO_VALIDOS.includes(nichoBruto as Nicho) ? nichoBruto : null,
      origem: campo(formData, "origem"),
      observacoes: campo(formData, "observacoes"),
      responsavel_id: profile.id,
    })
    .select("id")
    .single();

  if (error || !data) {
    // Loga o erro real do banco (RLS, constraint, migration faltando...) pra
    // aparecer nos logs do servidor; a mensagem tambem vai pro form.
    console.error("[criarEmpresa] insert empresa falhou:", error?.message, error?.details, error?.hint);
    redirect(
      `/dashboard/clientes/novo?error=${encodeURIComponent(error?.message ?? "Erro ao criar empresa.")}`,
    );
  }

  // Pessoa de contato inicial (opcional, no mesmo form: zero redigitacao).
  // Nao derruba a criacao da empresa se a pessoa falhar — so registra.
  const pessoaNome = campo(formData, "pessoa_nome");
  if (pessoaNome) {
    const { error: pessoaErro } = await supabase.from("pessoas").insert({
      empresa_id: data.id,
      nome: pessoaNome,
      cargo: campo(formData, "pessoa_cargo"),
      email: campo(formData, "pessoa_email"),
      telefone: campo(formData, "pessoa_telefone"),
    });
    if (pessoaErro) console.error("[criarEmpresa] pessoa de contato nao inserida:", pessoaErro.message);
  }

  revalidatePath("/dashboard/clientes");
  redirect(`/dashboard/clientes/${data.id}`);
}

export async function atualizarEmpresa(empresaId: string, formData: FormData) {
  const supabase = await createClient();

  const nome_fantasia = campo(formData, "nome_fantasia");
  if (!nome_fantasia) redirect(`/dashboard/clientes/${empresaId}?error=Nome é obrigatório.`);

  const nichoBruto = campo(formData, "nicho");
  const { data: rows, error } = await supabase
    .from("empresas")
    .update({
      nome_fantasia,
      razao_social: campo(formData, "razao_social"),
      cnpj: campo(formData, "cnpj"),
      inscricao_estadual: campo(formData, "inscricao_estadual"),
      email: campo(formData, "email"),
      telefone: campo(formData, "telefone"),
      endereco: campo(formData, "endereco"),
      numero: campo(formData, "numero"),
      bairro: campo(formData, "bairro"),
      cidade: campo(formData, "cidade"),
      estado: campo(formData, "estado"),
      cep: campo(formData, "cep"),
      nicho: NICHO_VALIDOS.includes(nichoBruto as Nicho) ? nichoBruto : null,
      origem: campo(formData, "origem"),
      observacoes: campo(formData, "observacoes"),
    })
    .eq("id", empresaId)
    .select("id");

  if (error) redirect(`/dashboard/clientes/${empresaId}?error=${encodeURIComponent(error.message)}`);
  if (!rows || rows.length === 0) {
    redirect(
      `/dashboard/clientes/${empresaId}?error=${encodeURIComponent(
        "Sem permissão para editar esta empresa (responsável é outro vendedor).",
      )}`,
    );
  }

  revalidatePath(`/dashboard/clientes/${empresaId}`);
  redirect(`/dashboard/clientes/${empresaId}`);
}

export async function arquivarEmpresa(formData: FormData) {
  const profile = await getCurrentProfile();
  if (profile.role !== "team_leader") {
    redirect("/dashboard/clientes?error=Só o team leader pode arquivar empresas.");
  }
  const empresaId = String(formData.get("empresa_id") ?? "");
  if (!empresaId) return;

  // Soft delete: nunca apaga de verdade.
  const supabase = await createClient();
  await supabase
    .from("empresas")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", empresaId);
  revalidatePath("/dashboard/clientes");
  redirect("/dashboard/clientes");
}

// ------------------------------------------------------------------ pessoas
export async function adicionarPessoa(empresaId: string, formData: FormData) {
  const supabase = await createClient();
  const nome = campo(formData, "nome");
  if (!nome) redirect(`/dashboard/clientes/${empresaId}?error=Nome da pessoa é obrigatório.`);

  const funcaoBruta = campo(formData, "funcao");
  await supabase.from("pessoas").insert({
    empresa_id: empresaId,
    nome,
    cargo: campo(formData, "cargo"),
    funcao: FUNCAO_VALIDAS.includes(funcaoBruta as FuncaoPessoa) ? funcaoBruta : "comercial",
    email: campo(formData, "email"),
    telefone: campo(formData, "telefone"),
  });

  revalidatePath(`/dashboard/clientes/${empresaId}`);
  redirect(`/dashboard/clientes/${empresaId}`);
}

export async function removerPessoa(formData: FormData) {
  const supabase = await createClient();
  const pessoaId = String(formData.get("pessoa_id") ?? "");
  const empresaId = String(formData.get("empresa_id") ?? "");
  if (!pessoaId) return;
  await supabase
    .from("pessoas")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", pessoaId);
  revalidatePath(`/dashboard/clientes/${empresaId}`);
  redirect(`/dashboard/clientes/${empresaId}`);
}

// ------------------------------------------------------------------ negocios
export async function criarNegocio(empresaId: string, formData: FormData) {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const titulo = campo(formData, "titulo");
  if (!titulo) redirect(`/dashboard/clientes/${empresaId}?error=Título do negócio é obrigatório.`);

  await supabase.from("negocios").insert({
    empresa_id: empresaId,
    titulo,
    valor_estimado: lerValor(campo(formData, "valor_estimado")),
    produto_id: campo(formData, "produto_id"),
    proximo_contato: lerData(campo(formData, "proximo_contato")),
    responsavel_id: profile.id,
  });

  revalidatePath(`/dashboard/clientes/${empresaId}`);
  revalidatePath("/dashboard/negocios");
  redirect(`/dashboard/clientes/${empresaId}`);
}

export async function atualizarEtapaNegocio(negocioId: string, etapa: EtapaNegocio) {
  if (!ETAPA_VALIDAS.includes(etapa)) return { ok: false as const, error: "Etapa inválida." };

  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("negocios")
    .update({ etapa })
    .eq("id", negocioId)
    .select("id, empresa_id");

  if (error) return { ok: false as const, error: error.message };
  if (!rows || rows.length === 0) {
    return { ok: false as const, error: "Sem permissão para mover este negócio." };
  }

  // Negocio fechado: a empresa ja virou cliente (trigger no banco);
  // se tiver CNPJ e ainda nao estiver no Asaas, cria la na hora
  // (modelo event-driven). Best-effort: falha no Asaas nao desfaz o
  // fechamento — a proxima sincronizacao reconcilia.
  if (etapa === "fechado") {
    const { data: e } = await supabase
      .from("empresas")
      .select("*")
      .eq("id", rows[0].empresa_id)
      .single();
    if (e && e.cnpj && !e.asaas_customer_id) {
      const r = await criarCliente({
        nome: e.nome_fantasia,
        documento: e.cnpj,
        razaoSocial: e.razao_social,
        inscricaoEstadual: e.inscricao_estadual,
        email: e.email,
        telefone: e.telefone,
        endereco: e.endereco,
        numero: e.numero,
        bairro: e.bairro,
        cep: e.cep,
        referenciaExterna: e.id,
      });
      if (r.ok) {
        await supabase
          .from("empresas")
          .update({ asaas_customer_id: r.data.id })
          .eq("id", e.id);
      }
    }
  }

  revalidatePath("/dashboard/negocios");
  revalidatePath("/dashboard");
  return { ok: true as const };
}

// ------------------------------------------------------------------ eventos
export async function registrarEvento(empresaId: string, formData: FormData) {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  await supabase.from("eventos").insert({
    empresa_id: empresaId,
    autor_id: profile.id,
    tipo: campo(formData, "tipo") ?? "nota",
    descricao: campo(formData, "descricao"),
  });

  revalidatePath(`/dashboard/clientes/${empresaId}`);
  redirect(`/dashboard/clientes/${empresaId}`);
}

// ------------------------------------------------------------------ Asaas
// Push individual: cadastra UMA empresa no Asaas (botao na ficha).
export async function cadastrarEmpresaAsaas(empresaId: string) {
  const supabase = await createClient();
  const { data: e } = await supabase.from("empresas").select("*").eq("id", empresaId).single();

  if (!e) redirect(`/dashboard/clientes/${empresaId}?error=Empresa não encontrada.`);
  if (e.asaas_customer_id) redirect(`/dashboard/clientes/${empresaId}?error=Já cadastrada no Asaas.`);
  if (!e.cnpj) redirect(`/dashboard/clientes/${empresaId}?error=Preencha o CNPJ/CPF antes.`);

  const r = await criarCliente({
    nome: e.nome_fantasia,
    documento: e.cnpj,
    razaoSocial: e.razao_social,
    inscricaoEstadual: e.inscricao_estadual,
    email: e.email,
    telefone: e.telefone,
    endereco: e.endereco,
    numero: e.numero,
    bairro: e.bairro,
    cep: e.cep,
    referenciaExterna: e.id,
  });

  if (!r.ok) redirect(`/dashboard/clientes/${empresaId}?error=${encodeURIComponent(`Asaas: ${r.error}`)}`);

  await supabase
    .from("empresas")
    .update({ asaas_customer_id: r.data.id, status: "cliente" })
    .eq("id", empresaId);
  revalidatePath(`/dashboard/clientes/${empresaId}`);
  redirect(`/dashboard/clientes/${empresaId}`);
}

/*
  Sincronizacao completa sob demanda (botao "Sincronizar com Asaas").
  Duas vias, sem duplicar (match por asaas_customer_id, depois CNPJ):
  1. PULL: clientes do Asaas que nao existem aqui viram empresas
     (status cliente); os que existem sao vinculados e tem buracos
     preenchidos (nunca sobrescreve o que foi digitado aqui).
  2. PUSH: empresas cliente com CNPJ e sem asaas_customer_id sao
     criadas no Asaas.
  No dia a dia o fluxo e por evento (criar cliente -> cria no Asaas);
  isso aqui e reconciliacao.
*/
export async function sincronizarAsaas() {
  const profile = await getCurrentProfile();
  if (profile.role !== "team_leader") {
    redirect("/dashboard/clientes?error=Só o team leader pode sincronizar.");
  }

  const lista = await listarClientes();
  if (!lista.ok) {
    redirect(`/dashboard/clientes?error=${encodeURIComponent(`Asaas: ${lista.error}`)}`);
  }
  const clientesAsaas = lista.data;

  const supabase = await createClient();
  const { data: empresas, error: erroEmpresas } = await supabase
    .from("empresas")
    .select(
      "id, cnpj, asaas_customer_id, email, telefone, endereco, cidade, estado, cep, razao_social",
    );

  // Se a tabela nao existe (migracao 0005 nao rodada), avisa em vez de
  // reportar "0 importadas" enganosamente.
  if (erroEmpresas) {
    redirect(
      `/dashboard/clientes?error=${encodeURIComponent(
        `Banco não preparado (${erroEmpresas.message}). Rode a migração 0005_erp_core.sql no Supabase.`,
      )}`,
    );
  }

  const porAsaasId = new Map(
    (empresas ?? []).filter((e) => e.asaas_customer_id).map((e) => [e.asaas_customer_id, e]),
  );
  const cnpjsVistos = new Map(
    (empresas ?? []).filter((e) => e.cnpj).map((e) => [String(e.cnpj).replace(/\D/g, ""), e]),
  );

  let criadas = 0;
  let vinculadas = 0;

  for (const c of clientesAsaas) {
    if (porAsaasId.has(c.id)) continue;
    const doc = c.cpfCnpj ? c.cpfCnpj.replace(/\D/g, "") : "";
    const match = doc ? cnpjsVistos.get(doc) : undefined;

    if (match) {
      await supabase
        .from("empresas")
        .update({
          asaas_customer_id: match.asaas_customer_id ?? c.id,
          status: "cliente",
          razao_social: match.razao_social ?? c.company,
          email: match.email ?? c.email,
          telefone: match.telefone ?? c.mobilePhone ?? c.phone,
          endereco: match.endereco ?? c.address,
          cidade: match.cidade ?? c.cityName,
          estado: match.estado ?? c.state,
          cep: match.cep ?? c.postalCode,
        })
        .eq("id", match.id);
      vinculadas++;
    } else {
      const { data: nova } = await supabase
        .from("empresas")
        .insert({
          status: "cliente",
          nome_fantasia: c.name,
          razao_social: c.company,
          cnpj: c.cpfCnpj,
          inscricao_estadual: c.stateInscription,
          email: c.email,
          telefone: c.mobilePhone ?? c.phone,
          endereco: c.address,
          numero: c.addressNumber,
          bairro: c.province,
          cidade: c.cityName,
          estado: c.state,
          cep: c.postalCode,
          origem: "Sincronizado do Asaas",
          asaas_customer_id: c.id,
          responsavel_id: profile.id,
        })
        .select("id, cnpj, asaas_customer_id, email, telefone, endereco, cidade, estado, cep, razao_social")
        .single();
      if (nova) {
        // O Asaas aceita clientes duplicados com o mesmo CNPJ; registrar
        // o doc como visto evita criar duas empresas locais.
        if (doc) cnpjsVistos.set(doc, nova);
        criadas++;
      }
    }
  }

  // PUSH: clientes locais com CNPJ ainda fora do Asaas
  let enviadas = 0;
  const { data: pendentes } = await supabase
    .from("empresas")
    .select("*")
    .eq("status", "cliente")
    .is("asaas_customer_id", null)
    .not("cnpj", "is", null)
    .is("deleted_at", null);

  for (const e of pendentes ?? []) {
    const r = await criarCliente({
      nome: e.nome_fantasia,
      documento: e.cnpj!,
      razaoSocial: e.razao_social,
      inscricaoEstadual: e.inscricao_estadual,
      email: e.email,
      telefone: e.telefone,
      endereco: e.endereco,
      numero: e.numero,
      bairro: e.bairro,
      cep: e.cep,
      referenciaExterna: e.id,
    });
    if (r.ok) {
      await supabase.from("empresas").update({ asaas_customer_id: r.data.id }).eq("id", e.id);
      enviadas++;
    }
  }

  revalidatePath("/dashboard/clientes");
  const mensagem =
    criadas + vinculadas + enviadas === 0
      ? "Tudo em dia com o Asaas: nada novo pra importar, vincular ou enviar."
      : `Sincronizado: ${criadas} importada(s) do Asaas, ${vinculadas} vinculada(s), ${enviadas} enviada(s) pro Asaas.`;
  redirect(`/dashboard/clientes?ok=${encodeURIComponent(mensagem)}`);
}
