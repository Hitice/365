import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import CaseCard from "@/components/CaseCard";
import { usinagem, ferramentaria, casesIndustria } from "@/lib/data";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Usinagem de precisão, moldes injetáveis, fabricação de peças, torno de plásticos de engenharia, ferramentaria, manutenção e retrofit de CNC em Uberlândia MG.",
};

const manutencaoItens = [
  {
    titulo: "Reparos e peças",
    descricao:
      "Diagnóstico, troca de componentes e recuperação de máquinas CNC de qualquer fabricante.",
  },
  {
    titulo: "Atendimento remoto",
    descricao:
      "Suporte por acesso remoto para configuração, parametrização e resolução rápida de falhas de software.",
  },
  {
    titulo: "Atendimento presencial",
    descricao:
      "Equipe técnica em Uberlândia e região para visitas programadas e chamados emergenciais.",
  },
];

const retrofitItens = [
  {
    titulo: "Atualização de comandos",
    descricao:
      "Migração para DDCS e controladores atuais, com ganho real de velocidade, precisão e confiabilidade.",
  },
  {
    titulo: "Nova eletrônica",
    descricao:
      "Substituição de drivers, motores e fiação por componentes modernos com peças de reposição disponíveis.",
  },
  {
    titulo: "Sua máquina valorizada",
    descricao:
      "A estrutura mecânica que você já tem passa a operar como uma máquina nova, por uma fração do custo.",
  },
];

export default function ServicosPage() {
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
                02 · Serviços
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                Usinagem, moldes e fabricação{" "}
                <span className="text-accent-600">sob demanda</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
                Equipe enxuta que atende rápido o que as fábricas grandes deixam
                na fila: peça avulsa, reposição urgente e lote pequeno, sem
                pedido mínimo. Todo serviço é orçado individualmente por foto,
                desenho ou amostra.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contato"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  Enviar peça ou desenho
                </a>
                <a
                  href="#usinagem"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink-300 px-6 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-50"
                >
                  Ver os serviços
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Usinagem e moldes */}
        <section
          id="usinagem"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
        >
          <SectionHeading
            eyebrow="Usinagem e moldes"
            title="Do molde injetável à peça de reposição"
            subtitle="Produção com precisão e prazo curto para manter a sua linha rodando, incluindo torneamento de plásticos de engenharia."
          />
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {usinagem.map((servico) => (
              <ProductCard
                key={servico.id}
                nome={servico.titulo}
                descricao={servico.descricao}
                imagem={servico.imagem}
                ctaLabel="Enviar desenho"
              />
            ))}
          </div>
        </section>

        {/* Ferramentaria */}
        <section
          id="ferramentaria"
          className="border-y border-ink-100 bg-ink-50 py-14 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Metal e ferramentaria"
              title="Ferramental e gravações de precisão"
              subtitle="Matrizes, punções, carimbos, eletrodos e gravações em aço e alumínio, tudo produzido sob medida na nossa oficina."
            />
            <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
              {ferramentaria.map((servico) => (
                <ProductCard
                  key={servico.id}
                  nome={servico.titulo}
                  descricao={servico.descricao}
                  imagem={servico.imagem}
                  ctaLabel="Enviar desenho"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Manutenção e Retrofit */}
        <section
          id="manutencao"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
        >
          <SectionHeading
            eyebrow="Sua máquina sempre produzindo"
            title="Manutenção e Retrofit de CNC"
            subtitle="Suporte técnico completo em Uberlândia e região, do reparo emergencial à modernização total da sua máquina."
          />
          <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-accent-500/40 bg-white p-8">
              <h3 className="text-xl font-bold text-ink-900">Manutenção</h3>
              <p className="mt-2 text-sm text-ink-500">
                Reparos com atendimento remoto e presencial.
              </p>
              <ul className="mt-6 space-y-5">
                {manutencaoItens.map((item) => (
                  <li key={item.titulo} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-steel-100 text-steel-700"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-ink-900">{item.titulo}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-700">
                        {item.descricao}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="retrofit"
              className="rounded-2xl border border-accent-500/40 bg-white p-8"
            >
              <h3 className="text-xl font-bold text-ink-900">Retrofit</h3>
              <p className="mt-2 text-sm text-ink-500">
                Atualização e migração para DDCS e comandos atuais.
              </p>
              <ul className="mt-6 space-y-5">
                {retrofitItens.map((item) => (
                  <li key={item.titulo} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent-500/15 text-accent-600"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 5l7 7-7 7M5 12h14"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-ink-900">{item.titulo}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-700">
                        {item.descricao}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section
          id="cases"
          className="border-t border-ink-100 bg-ink-50 py-14 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Cases"
              title="Histórias reais"
              subtitle="Problema, solução e resultado medido. É assim que preferimos apresentar o nosso trabalho."
            />
            <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2">
              {casesIndustria.map((caso) => (
                <CaseCard key={caso.id} caso={caso} />
              ))}
            </div>
          </div>
        </section>

        <ContactCta
          titulo="Precisa de peça, molde ou reparo?"
          texto="Todo serviço é orçado individualmente. Mande uma peça, foto ou desenho pelo WhatsApp e devolvemos o orçamento sem compromisso, com prazo e valores claros."
        />
      </main>
      <Footer />
    </>
  );
}
