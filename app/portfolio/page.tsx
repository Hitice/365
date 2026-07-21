import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import Button from "@/components/Button";
import FadeUp from "@/components/FadeUp";
import PortfolioFilter, { type PortfolioItem } from "@/components/PortfolioFilter";
import HeroBackground from "@/components/HeroBackground";
import { usinagem, ferramentaria, maquinasProdutos, materiaisCatalogo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Peças usinadas, ferramentaria, máquinas CNC e plásticos industriais fabricados e fornecidos pela Catech 360 em Uberlândia MG.",
};

const categorias = ["Usinagem", "Máquinas", "Plásticos"];

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

  const plasticos: PortfolioItem[] = materiaisCatalogo.map((material) => ({
    id: material.nome.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    titulo: material.nome,
    descricao: "Chapas, tarugos e buchas em estoque, prontos para usinagem.",
    imagem: material.imagem,
    categoria: "Plásticos",
  }));

  const items: PortfolioItem[] = [
    ...usinagem.map((i) => ({ ...i, categoria: "Usinagem" })),
    ...ferramentaria.map((i) => ({ ...i, categoria: "Usinagem" })),
    ...maquinas,
    ...plasticos,
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <section className="relative overflow-hidden bg-surface-alt pb-14 pt-[calc(4rem+10mm)] sm:pb-16">
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
                Peças usinadas, ferramentaria, máquinas CNC de fabricação
                própria e plásticos industriais em estoque.
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
                    src="/images/catech/Retrofit.png"
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

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
