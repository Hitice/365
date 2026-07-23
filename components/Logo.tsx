import Image from "next/image";
import { cn } from "@/lib/utils";

const DIR = "/images/brand/catech360";

/*
  Logo oficial Catech 360 (SVGs exportados do Corel). Duas variantes de tema,
  trocadas por CSS via .dark: o laranja e fixo, a mira e o texto mudam de cor.
  `unoptimized` serve o SVG cru (sem passar pelo otimizador do Next). Controle
  o tamanho pela altura no className, ex: <Logo className="h-8" />.
*/
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <>
      <Image
        src={`${DIR}/catech360-lockup-light.svg`}
        alt="Catech 360"
        width={234}
        height={40}
        unoptimized
        priority={priority}
        className={cn("w-auto dark:hidden", className)}
      />
      <Image
        src={`${DIR}/catech360-lockup-dark.svg`}
        alt="Catech 360"
        width={234}
        height={40}
        unoptimized
        priority={priority}
        className={cn("hidden w-auto dark:block", className)}
      />
    </>
  );
}

// Só o ícone (mira 360), para favicon, sidebar recolhida e espaços quadrados.
export function LogoMark({ className }: { className?: string }) {
  return (
    <>
      <Image
        src={`${DIR}/catech360-icon-light.svg`}
        alt="Catech 360"
        width={42}
        height={40}
        unoptimized
        className={cn("w-auto dark:hidden", className)}
      />
      <Image
        src={`${DIR}/catech360-icon-dark.svg`}
        alt=""
        width={42}
        height={40}
        unoptimized
        className={cn("hidden w-auto dark:block", className)}
      />
    </>
  );
}
