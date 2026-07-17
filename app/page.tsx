import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import CardCarousel from "@/components/CardCarousel";
import FadeUp from "@/components/FadeUp";
import NichoWheel from "@/components/NichoWheel";
import SectionHeading from "@/components/SectionHeading";
import { vitrine, valores } from "@/lib/data";

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

        {/* Vitrine */}
        <section className="border-t border-ink-100 bg-white py-14 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <SectionHeading
                eyebrow="Vitrine"
                title="O que sai da nossa bancada"
                subtitle="Uma amostra real do que produzimos. Toque em um card para ver os detalhes daquela frente."
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
