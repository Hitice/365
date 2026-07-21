import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import FadeUp from "@/components/FadeUp";
import HeroBackground from "@/components/HeroBackground";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Catech 360 por WhatsApp ou e-mail. Tubalina, Uberlândia - MG, atendimento remoto em todo o Brasil.",
};

const WHATSAPP_ICON = (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ICON_PROPS = {
  className: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  "aria-hidden": true,
} as const;

const PHONE_ICON = (
  <svg {...ICON_PROPS}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.077-1.44l-4.193-1.198a1.5 1.5 0 00-1.586.44l-.911 1.093a12.06 12.06 0 01-5.183-5.183l1.093-.911a1.5 1.5 0 00.44-1.587L8.373 3.327a1.5 1.5 0 00-1.44-1.077H5.25A2.25 2.25 0 003 4.5v2.25z"
    />
  </svg>
);

const MAIL_ICON = (
  <svg {...ICON_PROPS}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0-.966.784-1.75 1.75-1.75h16c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0120 19H4a1.75 1.75 0 01-1.75-1.75V6.75z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
  </svg>
);

const PIN_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

const BUILDING_ICON = (
  <svg {...ICON_PROPS}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 21V6.5L12 3l8 3.5V21M4 21h16M4 21H2m18 0h2M9 9h1M9 13h1m4-4h1m-1 4h1m-6 8v-4h6v4"
    />
  </svg>
);

const info = [
  { label: "Telefone", value: "+55 (34) 99117-6599", icon: PHONE_ICON },
  { label: "E-mail", value: "adm.nuvem@protonmail.com", icon: MAIL_ICON },
  { label: "Endereço", value: "Tubalina, Uberlândia - MG, CEP 38412-044", icon: PIN_ICON },
  { label: "CNPJ", value: "39.914.870/0001-01", icon: BUILDING_ICON },
];

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <section className="relative overflow-hidden bg-background pb-14 pt-[calc(4rem+10mm)] sm:pb-16">
          <HeroBackground />
          <div className="relative mx-auto max-w-[1480px] px-4 text-center sm:px-6 lg:px-8">
            <FadeUp className="mx-auto max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Contato
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Envie seu projeto
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
                Anexe um desenho, PDF, STEP, foto ou amostra. Em até 24 horas
                úteis retornamos com análise técnica e orçamento.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  href="https://wa.me/5534991176599?text=Ol%C3%A1!%20Quero%20enviar%20um%20projeto%20para%20or%C3%A7amento."
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={WHATSAPP_ICON}
                >
                  WhatsApp
                </Button>
                <Button href="mailto:adm.nuvem@protonmail.com" variant="secondary">
                  Enviar e-mail
                </Button>
              </div>
            </FadeUp>
          </div>
        </section>

        <section className="border-t border-border py-14 sm:py-16">
          <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <FadeUp className="mx-auto max-w-2xl">
              <dl className="grid gap-4 sm:grid-cols-2">
                {info.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent-500/15 text-accent-600"
                    >
                      {item.icon}
                    </span>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm text-foreground-muted">{item.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-center text-sm text-foreground-muted">
                <span className="font-semibold text-foreground-subtle">Horário: </span>
                Segunda a sexta, das 8h às 18h
              </p>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
