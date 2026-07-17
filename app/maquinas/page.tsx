import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import ModelCarousel from "@/components/ModelCarousel";
import FadeUp from "@/components/FadeUp";
import { maquinasProdutos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Máquinas CNC",
  description:
    "CNC para alumínio e gravações (300x300, 400x400, 500x500) e routers para comunicação visual e marcenaria (3000x1500 e 4000x2000). Fabricação própria em Uberlândia MG, a partir de R$ 25.000.",
};

export default function MaquinasPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white pb-14 pt-28 sm:pb-16 sm:pt-36">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,196,0.08),transparent_55%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#0b1626 1px, transparent 1px), linear-gradient(90deg, #0b1626 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                03 · Máquinas
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                Máquinas CNC de{" "}
                <span className="text-accent-600">fabricação própria</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
                Duas linhas, seis modelos, todas com inversor WEG e suporte
                direto de quem projetou e montou. Já saíram da nossa bancada
                mais de cinco máquinas em operação nos clientes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#cnc-aluminio"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  CNC Alumínio e Gravações
                </a>
                <a
                  href="#cnc-router"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink-300 px-6 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-50"
                >
                  Routers CV e Marcenaria
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Linhas de máquinas */}
        {maquinasProdutos.map((produto, i) => (
          <section
            key={produto.id}
            id={produto.id}
            className={`py-14 sm:py-16 ${
              i % 2 === 1 ? "border-y border-ink-100 bg-ink-50" : ""
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <FadeUp>
                <div className="max-w-3xl">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                    Linha {String(i + 1).padStart(2, "0")} ·{" "}
                    {produto.modelos.length} modelos
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                    {produto.titulo}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-700 sm:text-lg">
                    {produto.descricao}
                  </p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {produto.base.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-ink-100 bg-white px-3.5 py-1.5 font-mono text-xs font-medium text-ink-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeUp>

              <FadeUp delay={120} className="mt-8">
                <ModelCarousel produto={produto} />
              </FadeUp>
            </div>
          </section>
        ))}

        <ContactCta
          titulo="Qual máquina faz sentido para a sua produção?"
          texto="Conte o que você produz e em qual volume. Indicamos o modelo certo, com preço final junto da cotação e do desenvolvimento do projeto, conforme a configuração escolhida."
        />
      </main>
      <Footer />
    </>
  );
}
