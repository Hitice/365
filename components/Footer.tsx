import LogoIcon from "./LogoIcon";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-5">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-xs text-foreground-subtle sm:justify-between sm:px-6 lg:px-8">
        <p className="flex items-center gap-2 text-foreground">
          <LogoIcon className="h-5 w-5" />
          <span>
            <span className="font-semibold">Catech 360</span>
            <span className="text-foreground-subtle"> · Usinagem, plásticos e máquinas CNC</span>
          </span>
        </p>
        <p>CNPJ: 39.914.870/0001-01 · Tubalina, Uberlândia - MG, CEP 38412-044</p>
        <p>
          <a
            href="mailto:adm.nuvem@protonmail.com"
            className="inline-block py-2 transition-colors hover:text-foreground"
          >
            adm.nuvem@protonmail.com
          </a>{" "}
          ·{" "}
          <a
            href="https://wa.me/5534991176599"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-2 transition-colors hover:text-foreground"
          >
            +55 (34) 99117-6599
          </a>{" "}
          · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
