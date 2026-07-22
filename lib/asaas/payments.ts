import "server-only";
import { asaasFetch, asaasListAll, type Resultado } from "./client";

export type FormaPagamento = "BOLETO" | "PIX" | "CREDIT_CARD" | "UNDEFINED";

export type CobrancaAsaasInput = {
  clienteAsaasId: string;
  valor: number;
  vencimento: string; // YYYY-MM-DD
  descricao?: string | null;
  forma?: FormaPagamento;
  referenciaExterna?: string | null; // id do orcamento/empresa
};

export type CobrancaAsaas = {
  id: string;
  customer: string;
  value: number;
  netValue: number | null;
  status: string; // PENDING, RECEIVED, CONFIRMED, OVERDUE, REFUNDED...
  billingType: FormaPagamento;
  dueDate: string;
  invoiceUrl: string | null;
  bankSlipUrl: string | null;
  externalReference: string | null;
};

export async function criarCobranca(
  input: CobrancaAsaasInput,
): Promise<Resultado<CobrancaAsaas>> {
  return asaasFetch<CobrancaAsaas>("/payments", {
    method: "POST",
    body: JSON.stringify({
      customer: input.clienteAsaasId,
      billingType: input.forma ?? "UNDEFINED", // UNDEFINED = cliente escolhe
      value: input.valor,
      dueDate: input.vencimento,
      description: input.descricao || undefined,
      externalReference: input.referenciaExterna || undefined,
    }),
  });
}

// QR Code PIX de uma cobranca ja criada.
export async function pixDaCobranca(
  paymentId: string,
): Promise<Resultado<{ encodedImage: string; payload: string; expirationDate: string }>> {
  return asaasFetch(`/payments/${paymentId}/pixQrCode`);
}

export async function listarCobrancasDoCliente(
  clienteAsaasId: string,
): Promise<Resultado<CobrancaAsaas[]>> {
  return asaasListAll<CobrancaAsaas>("/payments", `&customer=${clienteAsaasId}`);
}

export async function buscarCobranca(paymentId: string): Promise<Resultado<CobrancaAsaas>> {
  return asaasFetch<CobrancaAsaas>(`/payments/${paymentId}`);
}
