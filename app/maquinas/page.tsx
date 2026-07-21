import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import ModelCarousel from "@/components/ModelCarousel";
import ChipList from "@/components/ChipList";
import FadeUp from "@/components/FadeUp";
import { maquinasProdutos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Máquinas CNC",
  description:
    "Linha Compacta (300x300, 400x400, 500x500) e Linha Router (3000x1500, 4000x2000) de fabricação própria em Uberlândia MG, a partir de R$ 25.000.",
};

export default function MaquinasPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden bg-background pb-14 pt-28 sm:pb-16 sm:pt-36">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,196,0.08),transparent_55%)]"
          />
          <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Máquinas CNC
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Fabricadas por quem usa CNC{" "}
                <span className="text-accent-600">todos os dias</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                Projetadas e montadas pela Catech, priorizando rigidez
                estrutural, facilidade de manutenção e componentes
                disponíveis no mercado nacional. Suporte direto de quem
                projetou.
              </p>
            </div>
          </div>
        </section>

        {/* Linhas de máquinas */}
        {maquinasProdutos.map((produto) => (
          <section key={produto.id} id={produto.id} className="border-t border-border py-14 sm:py-16">
            <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
              <FadeUp>
                <div className="max-w-3xl">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                    {produto.modelos.length} modelos
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {produto.titulo}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
                    {produto.descricao}
                  </p>
                </div>

                <div className="mt-6">
                  <ChipList items={produto.base} />
                </div>
              </FadeUp>

              <FadeUp delay={120} className="mt-8">
                <ModelCarousel produto={produto} />
              </FadeUp>
            </div>
          </section>
        ))}

        <ContactCta
          titulo="Qual máquina faz sentido para a sua produção?"
          texto="Conte o que você produz e em qual volume. Indicamos o modelo certo, com preço final na cotação."
        />
      </main>
      <Footer />
    </>
  );
}
