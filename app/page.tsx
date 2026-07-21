import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import CardCarousel from "@/components/CardCarousel";
import FadeUp from "@/components/FadeUp";
import NichoWheel from "@/components/NichoWheel";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import HeroBackground from "@/components/HeroBackground";
import { vitrine } from "@/lib/data";

const DownloadIcon = (
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
);

const PortfolioIcon = (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.2" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.2" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.2" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.2" />
  </svg>
);

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col bg-background">
        {/* Hero com a roda 360 */}
        <section className="relative overflow-hidden bg-surface-alt pt-[calc(4rem+10mm)]">
          <HeroBackground position="top" />
          <div className="relative mx-auto grid w-full max-w-[1480px] items-stretch gap-8 px-4 pb-[calc(0.5rem+5mm)] sm:px-6 lg:grid-cols-[3fr_2fr] lg:gap-14 lg:px-8">
            <div className="text-center lg:text-left">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                Uberlândia MG · Atendemos todo o Brasil
              </p>
              <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
                Soluções industriais para quem{" "}
                <span className="text-accent-600">não pode parar a produção.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted lg:mx-0">
                Fabricamos peças usinadas, fornecemos plásticos de engenharia,
                desenvolvemos moldes e construímos máquinas CNC para
                indústrias em todo o Brasil.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button href="/catalogo-catech360.pdf" download icon={DownloadIcon}>
                  Catálogo
                </Button>
                <Button href="/portfolio" variant="secondary" icon={PortfolioIcon}>
                  Portfólio
                </Button>
              </div>
            </div>

            <FadeUp delay={150} className="h-full">
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
