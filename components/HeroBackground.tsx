type HeroBackgroundProps = {
  position?: "top" | "top-right";
};

/*
  Camadas decorativas de fundo do hero: brilho radial sutil + textura de
  rede de particulas (clara/escura conforme o tema). Compartilhado entre
  todas as paginas com hero para nao duplicar o mesmo CSS em cada uma.
*/
export default function HeroBackground({ position = "top-right" }: HeroBackgroundProps) {
  const origin = position === "top" ? "ellipse_at_top" : "ellipse_at_top_right";
  const opacity = position === "top" ? "60%" : "55%";

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[radial-gradient(${origin},rgba(59,130,196,0.08),transparent_${opacity})]`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/images/particles-bg-light.webp')] bg-cover bg-center opacity-[0.05] dark:bg-[url('/images/particles-bg-dark.webp')] dark:opacity-[0.12]"
      />
    </>
  );
}
