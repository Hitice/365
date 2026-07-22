// Constante e tipos da listagem de clientes. Ficam fora de actions.ts
// porque um arquivo "use server" so pode exportar funcoes async.

// Tamanho do lote da rolagem infinita. O mesmo valor alimenta o primeiro
// lote (server) e os proximos (client).
export const BATCH_EMPRESAS = 30;

export type EmpresaLinha = {
  id: string;
  nome_fantasia: string;
  razao_social: string | null;
  status: string;
  telefone: string | null;
  email: string | null;
  nicho: string | null;
  cidade: string | null;
  asaas_customer_id: string | null;
  pessoas: { id: string; nome: string; deleted_at: string | null }[];
};

export type FiltrosEmpresas = { q?: string; status?: string; nicho?: string };
