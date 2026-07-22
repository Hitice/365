import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import Button from "@/components/Button";
import HeroBackground from "@/components/HeroBackground";
import MaterialCarousel from "@/components/MaterialCarousel";
import SectionHeading from "@/components/SectionHeading";
import { materiaisCatalogo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Plásticos Industriais",
  description:
    "Chapas, tarugos e buchas em PEAD, UHMW, POM, Nylon, Policarbonato, PVC, PEEK e PVDF. Estoque próprio em Uberlândia MG.",
};

export default function ProdutosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <section className="relative overflow-hidden bg-surface-alt pb-14 pt-[calc(4rem+10mm)] sm:pb-16">
          <HeroBackground />
          <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Plásticos Industriais
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Chapas, tarugos e buchas nos principais{" "}
                <span className="text-accent-600">polímeros de engenharia</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                Fornecemos os polímeros mais usados pela indústria, com
                estoque próprio em Uberlândia MG. Também fabricamos peças
                técnicas sob desenho utilizando esses materiais.
              </p>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground-subtle">
              Atendemos indústria de bebidas, alimentícia, metalúrgica e de
              embalagens, com peças como estrelas, roscas sem fim, guias,
              raspadores e placas de desgaste.
            </p>

            <div className="mt-8">
              <Button href="/contato">Solicitar cotação</Button>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-14 sm:py-16">
          <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Catálogo" title="Materiais em estoque" />
            <div className="mt-10 sm:mt-12">
              <MaterialCarousel items={materiaisCatalogo} />
            </div>
          </div>
        </section>

        <ContactCta
          titulo="Precisa de material ou peça técnica?"
          texto="Diga o material, a medida e a quantidade pelo WhatsApp. Estoque próprio e entrega rápida em Uberlândia e região."
        />
      </main>
      <Footer />
    </>
  );
}
