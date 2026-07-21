type HeroBackgroundProps = {
  position?: "top" | "top-right";
};

/*
  Camadas decorativas de fundo do hero: brilho radial sutil + grid tecnico
  (linhas finas, estilo desenho de engenharia) gerado em CSS puro, sem
  imagem. Compartilhado entre todas as paginas com hero para nao duplicar
  o mesmo CSS em cada uma.
*/
export default function HeroBackground({ position = "top-right" }: HeroBackgroundProps) {
  const origin = position === "top" ? "ellipse_at_top" : "ellipse_at_top_right";
  const glowOpacity = position === "top" ? "60%" : "55%";

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[radial-gradient(${origin},rgba(59,130,196,0.08),transparent_${glowOpacity})]`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[linear-gradient(to_right,var(--border-strong)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-strong)_1px,transparent_1px)] bg-[length:48px_48px] opacity-30 [mask-image:radial-gradient(${origin},black,transparent_70%)] dark:opacity-20`}
      />
    </>
  );
}
