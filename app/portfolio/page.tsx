import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import CaseCard from "@/components/CaseCard";
import FadeUp from "@/components/FadeUp";
import PortfolioFilter, { type PortfolioItem } from "@/components/PortfolioFilter";
import HeroBackground from "@/components/HeroBackground";
import { usinagem, ferramentaria, maquinasProdutos, casesIndustria } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Peças usinadas, ferramentaria e máquinas CNC fabricadas pela Catech 360 em Uberlândia MG.",
};

const categorias = ["Usinagem", "Máquinas"];

export default function PortfolioPage() {
  const maquinas: PortfolioItem[] = maquinasProdutos.flatMap((produto) =>
    produto.modelos.map((modelo) => ({
      id: modelo.id,
      titulo: modelo.nome,
      descricao: `${produto.titulo} · ${modelo.area}`,
      imagem: modelo.imagem,
      categoria: "Máquinas",
    })),
  );

  const items: PortfolioItem[] = [
    ...usinagem.map((i) => ({ ...i, categoria: "Usinagem" })),
    ...ferramentaria.map((i) => ({ ...i, categoria: "Usinagem" })),
    ...maquinas,
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <section className="relative overflow-hidden bg-background pb-14 pt-28 sm:pb-16 sm:pt-36">
          <HeroBackground />
          <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Portfólio
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Projetos realizados
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                Peças usinadas, ferramentaria e máquinas CNC de fabricação
                própria.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-14 sm:py-16">
          <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <PortfolioFilter items={items} categorias={categorias} />
          </div>
        </section>

        {/* Assistência e Retrofit */}
        <section className="border-t border-border bg-surface-alt py-14 sm:py-16">
          <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <FadeUp>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
                  Assistência e Retrofit
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Máquina parada também é projeto realizado
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground-muted">
                  Reparo, retrofit e migração de comando para CNC de qualquer
                  fabricante, com atendimento remoto e presencial em
                  Uberlândia e região.
                </p>
                <div className="mt-6">
                  <Button href="/assistencia-tecnica" variant="secondary">
                    Ver assistência técnica
                  </Button>
                </div>
              </FadeUp>
              <FadeUp delay={120}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
                  <Image
                    src="/images/catech/industrial-maintenance.png"
                    alt="Assistência técnica e retrofit de CNC"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section className="border-t border-border py-14 sm:py-16">
          <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <SectionHeading eyebrow="Resultados" title="Problema, solução e resultado" />
            </FadeUp>
            <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2">
              {casesIndustria.map((caso) => (
                <CaseCard key={caso.id} caso={caso} />
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
