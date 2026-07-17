import LogoIcon from "./LogoIcon";

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-xs text-ink-500 sm:justify-between sm:px-6 lg:px-8">
        <p className="flex items-center gap-2 text-ink-900">
          <LogoIcon className="h-5 w-5" />
          <span>
            <span className="font-semibold">Catech 360</span>
            <span className="text-ink-500"> · Indústria, software e automação</span>
          </span>
        </p>
        <p>CNPJ: 39.914.870/0001-01 · Tubalina, Uberlândia - MG, CEP 38412-044</p>
        <p>
          <a
            href="/catalogo-catech360.pdf"
            download
            className="font-semibold text-accent-600 transition-colors hover:text-accent-500"
          >
            Baixar catálogo (PDF)
          </a>{" "}
          ·{" "}
          <a
            href="mailto:adm.nuvem@protonmail.com"
            className="transition-colors hover:text-ink-900"
          >
            adm.nuvem@protonmail.com
          </a>{" "}
          ·{" "}
          <a
            href="https://wa.me/5534991176599"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink-900"
          >
            +55 (34) 99117-6599
          </a>{" "}
          · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
