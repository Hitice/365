import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Catech 360: fabricação de máquinas CNC, usinagem de peças, plásticos de engenharia e assistência técnica em uma única empresa em Uberlândia MG.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <section className="mx-auto max-w-3xl px-4 pb-28 pt-[calc(4rem+10mm)] sm:px-6 sm:pb-36 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
              Sobre a Catech 360
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Engenharia aplicada à indústria.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
              A Catech reúne fabricação de máquinas CNC, usinagem de peças,
              plásticos de engenharia e assistência técnica com retrofit em
              uma única empresa.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              Atendemos desde a reposição urgente de uma peça até o
              desenvolvimento completo de dispositivos, moldes e máquinas
              especiais.
            </p>
          </FadeUp>

          <FadeUp delay={120} className="mt-14 border-t border-border pt-8">
            <dl className="grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                  Onde estamos
                </dt>
                <dd className="mt-1.5 text-sm text-foreground-muted">
                  Tubalina, Uberlândia - MG
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                  Atendimento
                </dt>
                <dd className="mt-1.5 text-sm text-foreground-muted">
                  Todo o Brasil, remoto e presencial
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                  CNPJ
                </dt>
                <dd className="mt-1.5 text-sm text-foreground-muted">
                  39.914.870/0001-01
                </dd>
              </div>
            </dl>
          </FadeUp>
        </section>

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
