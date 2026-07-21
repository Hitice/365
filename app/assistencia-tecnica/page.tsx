import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import FadeUp from "@/components/FadeUp";
import HeroBackground from "@/components/HeroBackground";

export const metadata: Metadata = {
  title: "Assistência Técnica",
  description:
    "Retrofit, manutenção e migração para DDCS em máquinas CNC de qualquer fabricante. Atendimento remoto e presencial em Uberlândia MG.",
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
      "Migração para DDCS e controladores atuais, com ganho de velocidade e precisão.",
  },
  {
    titulo: "Nova eletrônica",
    descricao:
      "Substituição de drivers, motores e fiação por componentes com peças de reposição disponíveis.",
  },
  {
    titulo: "Estrutura aproveitada",
    descricao:
      "A mecânica que você já tem passa a operar com comando atual, por uma fração do custo de uma máquina nova.",
  },
];

function Lista({ itens }: { itens: { titulo: string; descricao: string }[] }) {
  return (
    <ul className="mt-6 space-y-5">
      {itens.map((item) => (
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
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <p className="font-semibold text-foreground">{item.titulo}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
              {item.descricao}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function AssistenciaTecnicaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <section className="relative overflow-hidden bg-background pb-14 pt-[calc(4rem+10mm)] sm:pb-16">
          <HeroBackground />
          <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Assistência Técnica
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Manutenção e retrofit para sua CNC{" "}
                <span className="text-accent-600">continuar produzindo</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                Reparo, migração de comando e suporte remoto ou presencial
                para máquinas CNC de qualquer fabricante, em Uberlândia e
                região.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-14 sm:py-16">
          <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <FadeUp>
                <div className="rounded-2xl border border-border bg-surface p-8">
                  <h2 className="text-xl font-bold text-foreground">Manutenção</h2>
                  <Lista itens={manutencaoItens} />
                </div>
              </FadeUp>
              <FadeUp delay={120}>
                <div className="rounded-2xl border border-border bg-surface p-8">
                  <h2 className="text-xl font-bold text-foreground">Retrofit</h2>
                  <Lista itens={retrofitItens} />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        <ContactCta
          titulo="Máquina parada?"
          texto="Descreva o problema pelo WhatsApp e um técnico responde com o diagnóstico inicial e o prazo de atendimento."
        />
      </main>
      <Footer />
    </>
  );
}
