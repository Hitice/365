import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import CardCarousel from "@/components/CardCarousel";
import FadeUp from "@/components/FadeUp";
import NichoWheel from "@/components/NichoWheel";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { vitrine } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col bg-background">
        {/* Hero com a roda 360 */}
        <section className="relative overflow-hidden pt-4">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,196,0.08),transparent_60%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              color: "var(--foreground)",
            }}
          />
          <div className="relative mx-auto grid w-full max-w-[1480px] items-start gap-8 px-4 pb-2 pt-4 sm:px-6 sm:pt-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div className="text-center lg:text-left">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Uberlândia MG · Atendemos todo o Brasil
              </p>
              <h1 className="mt-2 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                Soluções industriais para quem não pode parar a produção.
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg lg:mx-0">
                Fabricamos peças usinadas, fornecemos plásticos de engenharia,
                desenvolvemos moldes e construímos máquinas CNC para
                indústrias em todo o Brasil.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button href="/contato">Solicitar orçamento</Button>
                <Button href="/portfolio" variant="secondary">
                  Ver portfólio
                </Button>
              </div>
            </div>

            <FadeUp delay={150}>
              <NichoWheel />
            </FadeUp>
          </div>
        </section>

        {/* Vitrine */}
        <section className="border-t border-border bg-background py-8 sm:py-10">
          <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <SectionHeading eyebrow="Vitrine" title="O que sai da nossa bancada" />
            </FadeUp>
            <FadeUp delay={120} className="mt-5">
              <CardCarousel items={vitrine} />
            </FadeUp>
          </div>
        </section>

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
