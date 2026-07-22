import "server-only";
import { asaasFetch, asaasListAll, somenteDigitos, type Resultado } from "./client";

export type ClienteAsaasInput = {
  nome: string;
  documento: string; // CPF ou CNPJ, obrigatorio pro Asaas
  razaoSocial?: string | null;
  inscricaoEstadual?: string | null;
  email?: string | null;
  telefone?: string | null;
  endereco?: string | null;
  numero?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  cep?: string | null;
  observacoes?: string | null;
  referenciaExterna?: string | null; // id da empresa no nosso banco
};

export type ClienteAsaas = {
  id: string;
  name: string;
  company: string | null;
  cpfCnpj: string | null;
  stateInscription: string | null;
  email: string | null;
  phone: string | null;
  mobilePhone: string | null;
  address: string | null;
  addressNumber: string | null;
  province: string | null; // bairro
  city: number | null;
  cityName: string | null;
  state: string | null;
  postalCode: string | null;
  externalReference: string | null;
  deleted: boolean;
};

function corpo(input: ClienteAsaasInput) {
  return {
    name: input.nome,
    cpfCnpj: somenteDigitos(input.documento),
    company: input.razaoSocial || undefined,
    stateInscription: input.inscricaoEstadual || undefined,
    email: input.email || undefined,
    mobilePhone: input.telefone || undefined,
    address: input.endereco || undefined,
    addressNumber: input.numero || undefined,
    province: input.bairro || undefined,
    state: input.estado || undefined,
    postalCode: input.cep ? somenteDigitos(input.cep) : undefined,
    observations: input.observacoes || undefined,
    externalReference: input.referenciaExterna || undefined,
  };
}

export async function criarCliente(input: ClienteAsaasInput): Promise<Resultado<ClienteAsaas>> {
  if (!somenteDigitos(input.documento)) {
    return { ok: false, error: "CPF/CNPJ é obrigatório para cadastrar no Asaas." };
  }
  return asaasFetch<ClienteAsaas>("/customers", {
    method: "POST",
    body: JSON.stringify(corpo(input)),
  });
}

export async function atualizarCliente(
  id: string,
  input: ClienteAsaasInput,
): Promise<Resultado<ClienteAsaas>> {
  return asaasFetch<ClienteAsaas>(`/customers/${id}`, {
    method: "POST", // Asaas usa POST pra update de customer
    body: JSON.stringify(corpo(input)),
  });
}

export async function listarClientes(): Promise<Resultado<ClienteAsaas[]>> {
  const r = await asaasListAll<ClienteAsaas>("/customers");
  if (!r.ok) return r;
  return { ok: true, data: r.data.filter((c) => !c.deleted) };
}
