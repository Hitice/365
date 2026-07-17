type ContactCtaProps = {
  titulo?: string;
  texto?: string;
};

export default function ContactCta({
  titulo = "Vamos tirar o seu projeto do papel?",
  texto = "Conte o que você precisa e receba uma proposta técnica com prazo e valores claros. Atendemos Uberlândia, região e todo o Brasil.",
}: ContactCtaProps) {
  return (
    <section id="contato" className="border-t border-ink-100 bg-ink-50 py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
          {titulo}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-700">
          {texto}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/5534991176599?text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Chamar no WhatsApp
          </a>
          <a
            href="mailto:adm.nuvem@protonmail.com"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink-300 bg-white px-6 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-500"
          >
            Enviar e-mail
          </a>
        </div>
        <p className="mt-6 text-xs text-ink-500">
          WhatsApp em horário comercial · E-mail respondido em até 24h ·
          Tubalina, Uberlândia - MG · Atendimento remoto em todo o Brasil
        </p>
      </div>
    </section>
  );
}
