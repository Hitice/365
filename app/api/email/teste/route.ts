import { createClient } from "@/lib/supabase/server";
import { enviarEmail } from "@/lib/email";

/*
  Rota de teste do envio de email. Protegida por sessao: so quem esta logado
  no dashboard consegue disparar, e o email vai pro proprio endereco do
  usuario. Serve pra validar a configuracao (RESEND_API_KEY + dominio
  verificado) sem precisar de tela. Pode ser removida depois de validar.

  Uso: logado no /dashboard, abrir /api/email/teste no navegador.
*/
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return Response.json(
      { ok: false, error: "Faça login no dashboard antes de testar." },
      { status: 401 },
    );
  }

  const r = await enviarEmail({
    para: user.email,
    assunto: "Teste de email · Catech 360",
    html: `
      <div style="font-family: system-ui, sans-serif; font-size: 15px; color: #101828;">
        <p>Boa! Se você recebeu este email, o envio pelo sistema da <strong>Catech 360</strong> está funcionando.</p>
        <p style="color: #667085;">Enviado para ${user.email} via Resend.</p>
      </div>
    `,
    texto: "Se você recebeu este email, o envio pelo sistema da Catech 360 está funcionando.",
  });

  return Response.json(r, { status: r.ok ? 200 : 500 });
}
