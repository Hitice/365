export type Role =
  | "team_leader"
  | "admin"
  | "comercial"
  | "engenharia"
  | "producao"
  | "financeiro"
  | "vendedor"; // legado, equivale a comercial

export const LABEL_ROLE: Record<Role, string> = {
  team_leader: "Team leader",
  admin: "Administrador",
  comercial: "Comercial",
  engenharia: "Engenharia",
  producao: "Produção",
  financeiro: "Financeiro",
  vendedor: "Comercial",
};

export type Profile = {
  id: string;
  nome: string;
  email: string;
  role: Role;
  ativo: boolean;
  created_at: string;
};

// ---------------------------------------------------------------------
// Funil de NEGOCIOS (oportunidades). Empresa e cadastro; negocio e o
// que anda no funil — uma empresa pode ter varios negocios.
// ---------------------------------------------------------------------
export type EtapaNegocio =
  | "novo"
  | "contato"
  | "levantamento"
  | "orcamento"
  | "negociacao"
  | "fechado"
  | "perdido";

export const ETAPAS_NEGOCIO: { id: EtapaNegocio; label: string }[] = [
  { id: "novo", label: "Novo lead" },
  { id: "contato", label: "Contato realizado" },
  { id: "levantamento", label: "Levantamento" },
  { id: "orcamento", label: "Orçamento" },
  { id: "negociacao", label: "Negociação" },
  { id: "fechado", label: "Fechado" },
  { id: "perdido", label: "Perdido" },
];

// Etapas "vivas" (excluem fechado/perdido) — usadas em KPIs de pipeline.
export const ETAPAS_ABERTAS: EtapaNegocio[] = [
  "novo",
  "contato",
  "levantamento",
  "orcamento",
  "negociacao",
];

export type Nicho = "marcenaria" | "comunicacao_visual" | "industria" | "transformacao";

export const NICHOS: { id: Nicho; label: string }[] = [
  { id: "marcenaria", label: "Marcenaria" },
  { id: "comunicacao_visual", label: "Comunicação visual" },
  { id: "industria", label: "Indústria / injetáveis" },
  { id: "transformacao", label: "Indústria de transformação" },
];

export type StatusEmpresa = "lead" | "cliente";

export type Empresa = {
  id: string;
  status: StatusEmpresa;
  nome_fantasia: string;
  razao_social: string | null;
  cnpj: string | null;
  inscricao_estadual: string | null;
  email: string | null;
  telefone: string | null;
  endereco: string | null;
  numero: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  nicho: Nicho | null;
  origem: string | null;
  observacoes: string | null;
  asaas_customer_id: string | null;
  responsavel_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type FuncaoPessoa = "comercial" | "financeiro" | "engenharia" | "compras" | "outro";

export const FUNCOES_PESSOA: { id: FuncaoPessoa; label: string }[] = [
  { id: "comercial", label: "Comercial" },
  { id: "financeiro", label: "Financeiro" },
  { id: "engenharia", label: "Engenharia" },
  { id: "compras", label: "Compras" },
  { id: "outro", label: "Outro" },
];

export type Pessoa = {
  id: string;
  empresa_id: string;
  nome: string;
  cargo: string | null;
  funcao: FuncaoPessoa;
  email: string | null;
  telefone: string | null;
  created_at: string;
  deleted_at: string | null;
};

export type Negocio = {
  id: string;
  empresa_id: string;
  titulo: string;
  etapa: EtapaNegocio;
  valor_estimado: number | null;
  produto_id: string | null;
  proximo_contato: string | null;
  responsavel_id: string | null;
  observacoes: string | null;
  fechado_em: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TipoEvento =
  | "ligacao"
  | "email"
  | "portfolio_enviado"
  | "reuniao"
  | "visita"
  | "nota"
  | "etapa"
  | "alteracao";

// "etapa" e "alteracao" sao gerados por trigger/sistema — nao aparecem
// no formulario de registrar evento, so na timeline.
export const TIPOS_EVENTO_MANUAIS: { id: TipoEvento; label: string }[] = [
  { id: "ligacao", label: "Ligação" },
  { id: "email", label: "E-mail" },
  { id: "portfolio_enviado", label: "Portfólio enviado" },
  { id: "reuniao", label: "Reunião" },
  { id: "visita", label: "Visita técnica" },
  { id: "nota", label: "Nota" },
];

export const LABEL_EVENTO: Record<TipoEvento, string> = {
  ligacao: "Ligação",
  email: "E-mail",
  portfolio_enviado: "Portfólio enviado",
  reuniao: "Reunião",
  visita: "Visita técnica",
  nota: "Nota",
  etapa: "Mudança de etapa",
  alteracao: "Alteração",
};

export type Evento = {
  id: string;
  empresa_id: string;
  negocio_id: string | null;
  autor_id: string | null;
  tipo: TipoEvento;
  descricao: string | null;
  created_at: string;
};

// ---------------------------------------------------------------------
// Catalogo
// ---------------------------------------------------------------------
export type TipoProduto = "maquina" | "usinagem" | "ferramentaria" | "material";

export const TIPOS_PRODUTO: { id: TipoProduto; label: string }[] = [
  { id: "maquina", label: "Máquina" },
  { id: "usinagem", label: "Usinagem" },
  { id: "ferramentaria", label: "Ferramentaria" },
  { id: "material", label: "Material" },
];

export type Produto = {
  id: string;
  nome: string;
  tipo: TipoProduto;
  descricao: string | null;
  preco: string | null;
  quantidade: number;
  unidade: string;
  ativo: boolean;
  created_at: string;
};

// ---------------------------------------------------------------------
// Operacoes: orcamentos, projetos, chamados, cobrancas
// ---------------------------------------------------------------------
export type StatusOrcamento = "rascunho" | "enviado" | "aprovado" | "recusado" | "vencido";

export const STATUS_ORCAMENTO: { id: StatusOrcamento; label: string }[] = [
  { id: "rascunho", label: "Rascunho" },
  { id: "enviado", label: "Enviado" },
  { id: "aprovado", label: "Aprovado" },
  { id: "recusado", label: "Recusado" },
  { id: "vencido", label: "Vencido" },
];

export type Orcamento = {
  id: string;
  empresa_id: string;
  negocio_id: string | null;
  titulo: string;
  status: StatusOrcamento;
  validade: string | null;
  observacoes: string | null;
  responsavel_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type OrcamentoItem = {
  id: string;
  orcamento_id: string;
  produto_id: string | null;
  descricao: string;
  quantidade: number;
  unidade: string;
  valor_unitario: number;
  created_at: string;
};

export type StatusProjeto =
  | "planejamento"
  | "engenharia"
  | "producao"
  | "entrega"
  | "concluido"
  | "cancelado";

export const STATUS_PROJETO: { id: StatusProjeto; label: string }[] = [
  { id: "planejamento", label: "Planejamento" },
  { id: "engenharia", label: "Engenharia" },
  { id: "producao", label: "Produção" },
  { id: "entrega", label: "Entrega" },
  { id: "concluido", label: "Concluído" },
  { id: "cancelado", label: "Cancelado" },
];

export type Projeto = {
  id: string;
  empresa_id: string;
  orcamento_id: string | null;
  titulo: string;
  status: StatusProjeto;
  previsao_entrega: string | null;
  observacoes: string | null;
  responsavel_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type PrioridadeChamado = "baixa" | "media" | "alta";
export type StatusChamado =
  | "aberto"
  | "agendado"
  | "em_atendimento"
  | "aguardando_peca"
  | "fechado";

export const STATUS_CHAMADO: { id: StatusChamado; label: string }[] = [
  { id: "aberto", label: "Aberto" },
  { id: "agendado", label: "Agendado" },
  { id: "em_atendimento", label: "Em atendimento" },
  { id: "aguardando_peca", label: "Aguardando peça" },
  { id: "fechado", label: "Fechado" },
];

export const PRIORIDADES_CHAMADO: { id: PrioridadeChamado; label: string }[] = [
  { id: "baixa", label: "Baixa" },
  { id: "media", label: "Média" },
  { id: "alta", label: "Alta" },
];

export type Chamado = {
  id: string;
  empresa_id: string;
  maquina: string | null;
  defeito: string;
  prioridade: PrioridadeChamado;
  status: StatusChamado;
  agendado_para: string | null;
  observacoes: string | null;
  responsavel_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Cobranca = {
  id: string;
  empresa_id: string | null;
  orcamento_id: string | null;
  asaas_payment_id: string;
  valor: number;
  status: string;
  forma: string | null;
  vencimento: string | null;
  url_fatura: string | null;
  created_at: string;
  updated_at: string;
};

// Traduz status de pagamento do Asaas pra rotulo curto em pt-BR.
export function labelStatusCobranca(status: string): string {
  const mapa: Record<string, string> = {
    PENDING: "Pendente",
    RECEIVED: "Recebida",
    CONFIRMED: "Confirmada",
    OVERDUE: "Vencida",
    REFUNDED: "Estornada",
    RECEIVED_IN_CASH: "Recebida (dinheiro)",
    CHARGEBACK_REQUESTED: "Chargeback",
    AWAITING_RISK_ANALYSIS: "Em análise",
  };
  return mapa[status] ?? status;
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------
export function formatarValor(valor: number | null): string {
  if (valor == null) return "—";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}
