import type { Role } from "./types";

/*
  Grupos de papeis pra controle de acesso. "Gestor" e quem enxerga o sistema
  todo (financeiro, usuarios, configuracoes); o comercial/vendedor ve so a
  operacao (clientes, orcamentos, projetos, agenda, catalogo, assistencia).
*/
export const GESTOR: Role[] = ["team_leader", "admin"];

// Quem pode ver/operar o Financeiro (cobrancas). Alem do gestor, o papel
// dedicado "financeiro".
export const FINANCEIRO_ROLES: Role[] = ["team_leader", "admin", "financeiro"];

export function ehGestor(role: Role): boolean {
  return GESTOR.includes(role);
}

export function podeFinanceiro(role: Role): boolean {
  return FINANCEIRO_ROLES.includes(role);
}
