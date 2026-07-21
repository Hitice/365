import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import FadeUp from "@/components/FadeUp";
import HeroBackground from "@/components/HeroBackground";
import { usinagem, ferramentaria } from "@/lib/data";

export const metadata: Metadata = {
  title: "Usinagem CNC",
  description:
    "Peças sob desenho, moldes para injeção, ferramentaria e engenharia. Recebemos desenho, STEP, PDF, foto ou amostra.",
};

const formatos = [
  "Desenho técnico",
  "Arquivo STEP",
  "PDF",
  "Foto ou amostra",
  "Peça quebrada",
];

export default function UsinagemPage() {
  const fabricamos = [...usinagem, ...ferramentaria];

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <section className="relative overflow-hidden bg-background pb-14 pt-[calc(4rem+10mm)] sm:pb-16">
          <HeroBackground />
          <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Usinagem CNC
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Peças técnicas, projetos e{" "}
                <span className="text-accent-600">engenharia reversa</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                Peça avulsa, reposição urgente ou lote pequeno, sem pedido
                mínimo. Cada serviço é orçado a partir do seu desenho, foto
                ou amostra.
              </p>
            </div>

            <FadeUp delay={100} className="mt-10">
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {formatos.map((formato) => (
                  <span
                    key={formato}
                    className="flex items-center gap-2 text-sm font-medium text-foreground-muted"
                  >
                    <svg
                      className="h-4 w-4 flex-none text-accent-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {formato}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* O que fabricamos */}
        <section className="border-t border-border py-14 sm:py-16">
          <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Capacidade" title="O que fabricamos" />
            <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-3 lg:grid-cols-6">
              {fabricamos.map((servico) => (
                <ProductCard
                  key={servico.id}
                  nome={servico.titulo}
                  imagem={servico.imagem}
                  compact
                />
              ))}
            </div>
          </div>
        </section>

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
