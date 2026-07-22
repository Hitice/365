import "server-only";

import { Resend } from "resend";

/*
  Camada unica de envio de email transacional (Resend). Nenhuma tela chama a
  Resend direto — passa por aqui, no mesmo padrao do lib/asaas: le a chave do
  ambiente, nunca lanca e devolve sempre um Resultado tipado.

  Requisitos pra funcionar em producao:
  - RESEND_API_KEY no ambiente (painel do Resend > API Keys).
  - Dominio catech.ind.br verificado no Resend (registros DNS no registro.br).
  - EMAIL_FROM com um endereco @catech.ind.br desse dominio verificado.
*/
export type Resultado<T> = { ok: true; data: T } | { ok: false; error: string };

// Remetente padrao. Precisa ser de um dominio verificado no Resend. Fica em
// env pra trocar (ex: comercial@ vs no-reply@) sem mexer no codigo.
const EMAIL_FROM = process.env.EMAIL_FROM ?? "Catech 360 <no-reply@catech.ind.br>";

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export type EnviarEmailInput = {
  para: string | string[];
  assunto: string;
  html: string;
  texto?: string;
  responderPara?: string;
};

// Envia um email. Nunca lanca: quem chama decide o que fazer com a falha
// (ex: registrar um evento, avisar o usuario, apenas logar).
export async function enviarEmail(input: EnviarEmailInput): Promise<Resultado<{ id: string }>> {
  const resend = client();
  if (!resend) return { ok: false, error: "RESEND_API_KEY não configurada." };

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: input.para,
      subject: input.assunto,
      html: input.html,
      text: input.texto,
      replyTo: input.responderPara,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, data: { id: data?.id ?? "" } };
  } catch {
    return { ok: false, error: "Não foi possível enviar o email." };
  }
}
