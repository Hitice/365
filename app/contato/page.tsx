import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import FadeUp from "@/components/FadeUp";

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

const info = [
  { label: "Telefone", value: "+55 (34) 99117-6599" },
  { label: "E-mail", value: "adm.nuvem@protonmail.com" },
  { label: "Endereço", value: "Tubalina, Uberlândia - MG, CEP 38412-044" },
  { label: "CNPJ", value: "39.914.870/0001-01" },
  { label: "Horário", value: "Segunda a sexta, horário comercial", center: true },
];

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <section className="mx-auto max-w-3xl px-4 pb-28 pt-[calc(4rem+10mm)] text-center sm:px-6 sm:pb-36 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
              Contato
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
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

          <FadeUp delay={120} className="mt-16 border-t border-border pt-10 text-left">
            <dl className="grid gap-6 sm:grid-cols-2">
              {info.map((item) => (
                <div key={item.label} className={item.center ? "sm:col-span-2 text-center" : undefined}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-sm text-foreground-muted">{item.value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </section>
      </main>
      <Footer />
    </>
  );
}
