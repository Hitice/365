import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import CardCarousel from "@/components/CardCarousel";
import FadeUp from "@/components/FadeUp";
import NichoWheel from "@/components/NichoWheel";
import SectionHeading from "@/components/SectionHeading";
import { vitrine, valores } from "@/lib/data";

const pilares = [
  {
    numero: "01",
    href: "/produtos",
    titulo: "Produtos",
    descricao:
      "Chapas, buchas e tarugos em plásticos industriais semiacabados. PEAD, POM, Nylon, PTFE, UHMW e mais, em estoque para entrega.",
    imagem: "/images/catech/industry-workshop.jpg",
  },
  {
    numero: "02",
    href: "/servicos",
    titulo: "Serviços",
    descricao:
      "Usinagem de precisão, moldes injetáveis, torno de plásticos, ferramentaria, manutenção e retrofit. Sem pedido mínimo.",
    imagem: "/images/catech/USI1.jpg",
  },
  {
    numero: "03",
    href: "/maquinas",
    titulo: "Máquinas",
    descricao:
      "Duas linhas CNC de fabricação própria, seis modelos a partir de R$ 25.000, com suporte direto de quem projetou e montou.",
    imagem: "/images/catech/cnc-real.jpg",
  },
];

const stats = [
  { valor: "+5", rotulo: "máquinas entregues" },
  { valor: "17", rotulo: "materiais em catálogo" },
  { valor: "72h", rotulo: "reposição recorde de peça" },
  { valor: "0", rotulo: "pedido mínimo" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col bg-white">
        {/* Hero com a roda 360 */}
        <section className="relative overflow-hidden pt-8">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,196,0.08),transparent_60%)]"
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
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-4 pb-6 pt-8 sm:px-6 sm:pt-10 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div className="text-center lg:text-left">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Uberlândia MG · Atendemos todo o Brasil
              </p>
              <h1 className="mt-3 text-4xl font-bold uppercase leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
                Indústria
                <br />
                <span className="text-accent-600">completa.</span>
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg lg:mx-0">
                Produtos, serviços e máquinas em um único parceiro técnico. Da
                chapa de plástico industrial à CNC pronta na sua fábrica.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a
                  href="#contato"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  Solicitar orçamento
                </a>
                <a
                  href="/catalogo-catech360.pdf"
                  download
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-accent-500/60 px-6 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-500/10"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"
                    />
                  </svg>
                  Baixar catálogo (PDF)
                </a>
                <a
                  href="#pilares"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink-300 px-6 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-50"
                >
                  Ver o que fazemos
                </a>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-lg">
                {stats.map((stat) => (
                  <div
                    key={stat.rotulo}
                    className="border-l-2 border-accent-500 pl-3 text-left"
                  >
                    <dt className="sr-only">{stat.rotulo}</dt>
                    <dd className="font-mono text-2xl font-bold text-ink-900">
                      {stat.valor}
                    </dd>
                    <dd className="mt-0.5 text-xs leading-snug text-ink-500">
                      {stat.rotulo}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <FadeUp delay={150}>
              <NichoWheel />
            </FadeUp>
          </div>
        </section>

        {/* Pilares: Produtos > Serviços > Máquinas */}
        <section
          id="pilares"
          className="border-t border-ink-100 bg-ink-50 py-8 sm:py-10"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <SectionHeading
                eyebrow="O que fazemos"
                title="Três frentes, uma oficina"
                subtitle="Escolha por onde começar. O orçamento é sempre individual e sem compromisso."
              />
            </FadeUp>
            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3">
              {pilares.map((pilar, i) => (
                <FadeUp key={pilar.href} delay={i * 120}>
                  <Link
                    href={pilar.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={pilar.imagem}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-md bg-navy-950/85 px-2.5 py-1 font-mono text-xs font-bold text-white backdrop-blur-sm">
                        {pilar.numero}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-bold uppercase tracking-wide text-ink-900">
                        {pilar.titulo}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">
                        {pilar.descricao}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
                        Entrar
                        <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 5l7 7-7 7M5 12h14"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Vitrine */}
        <section className="border-t border-ink-100 bg-white py-14 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <SectionHeading
                eyebrow="Vitrine"
                title="Produtos e peças da nossa fábrica"
                subtitle="Uma amostra do que sai da bancada: máquinas, usinagem, moldes, ferramentaria e insumos."
              />
            </FadeUp>
            <FadeUp delay={120} className="mt-10">
              <CardCarousel items={vitrine} />
            </FadeUp>
          </div>
        </section>

        {/* Sobre */}
        <section
          id="sobre"
          className="border-t border-ink-100 bg-ink-50 py-14 sm:py-16"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <SectionHeading
                eyebrow="Sobre a Catech 360"
                title="Nascemos da vontade de juntar tudo em um lugar só"
                subtitle="Transformamos conhecimento técnico em soluções que aumentam a eficiência, reduzem desperdícios e impulsionam a competitividade industrial."
              />
            </FadeUp>

            <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2">
              <FadeUp>
                <div className="h-full rounded-2xl border border-ink-100 bg-white p-7">
                  <h3 className="text-lg font-bold text-ink-900">Missão</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    Transformar desafios em soluções através da engenharia,
                    tecnologia e inovação aplicada.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={120}>
                <div className="h-full rounded-2xl border border-ink-100 bg-white p-7">
                  <h3 className="text-lg font-bold text-ink-900">Visão</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    Construir um futuro onde conhecimento, tecnologia e produção
                    ampliem continuamente o potencial das pessoas e das
                    organizações.
                  </p>
                </div>
              </FadeUp>
            </div>

            <FadeUp className="mt-10">
              <h3 className="text-center font-mono text-sm font-semibold uppercase tracking-[0.25em] text-steel-700">
                O que guia nossas decisões
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {valores.map((valor) => (
                  <div
                    key={valor.nome}
                    className="rounded-xl border border-ink-100 bg-white p-4"
                  >
                    <p className="text-sm font-bold text-ink-900">
                      {valor.nome}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-500">
                      {valor.frase}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp className="mt-12">
              <blockquote className="mx-auto max-w-2xl text-center">
                <p className="text-lg italic leading-relaxed text-ink-700">
                  “Se enxerguei mais longe, foi por estar sobre os ombros de
                  gigantes.”
                </p>
                <cite className="mt-3 block text-sm not-italic text-ink-500">
                  Isaac Newton
                </cite>
              </blockquote>
            </FadeUp>
          </div>
        </section>

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
