import "server-only";

/*
  Ponto de entrada da camada Asaas. As telas/actions importam daqui
  (import { criarCliente, criarCobranca } from "@/lib/asaas"), nunca da
  API HTTP direto. Cada recurso mora no proprio arquivo:
    - client.ts    fetch base, paginacao, tipos de resultado
    - customers.ts clientes
    - payments.ts  cobrancas, PIX
  Novos recursos (subscriptions, paymentLinks, invoices) entram como
  arquivos irmaos e sao reexportados aqui.
*/
export type { Resultado } from "./client";
export {
  criarCliente,
  atualizarCliente,
  listarClientes,
  type ClienteAsaas,
  type ClienteAsaasInput,
} from "./customers";
export {
  criarCobranca,
  pixDaCobranca,
  listarCobrancasDoCliente,
  buscarCobranca,
  type CobrancaAsaas,
  type CobrancaAsaasInput,
  type FormaPagamento,
} from "./payments";
