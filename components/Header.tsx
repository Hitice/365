"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "./LogoIcon";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/maquinas", label: "Máquinas" },
  { href: "/usinagem", label: "Usinagem" },
  { href: "/assistencia-tecnica", label: "Assistência" },
  { href: "/produtos", label: "Plásticos" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/sobre", label: "Sobre" },
];

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

const LoginIcon = (
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
      d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
    />
  </svg>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const skipFocusOnMount = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha com Escape, bloqueia o scroll da página e tira o conteúdo por
  // trás do menu do foco/leitor de tela (senão dá pra tabular "por trás").
  useEffect(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }

    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  // Move o foco pro primeiro link ao abrir e devolve pro botão ao fechar
  // (sem disparar no carregamento inicial da página).
  useEffect(() => {
    if (skipFocusOnMount.current) {
      skipFocusOnMount.current = false;
      return;
    }
    if (open) firstLinkRef.current?.focus();
    else toggleRef.current?.focus();
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border bg-surface/95 backdrop-blur transition-shadow duration-300 ${
        scrolled && !open ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:pr-80">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-foreground"
          onClick={() => setOpen(false)}
        >
          <LogoIcon className="h-9 w-9" />
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="text-xl font-bold tracking-tight">Catech</span>
            <span className="text-xl font-bold text-accent-600">360</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "font-semibold text-accent-600"
                  : "text-foreground-muted hover:text-accent-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 xl:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground active:scale-95"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Fora do container centralizado, alinhada com a mesma margem do botão de WhatsApp */}
      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-4 xl:flex">
        <Link
          href="/login"
          className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-foreground-muted transition-colors hover:text-accent-600"
        >
          <span className="text-accent-600">{LoginIcon}</span>
          Entrar
        </Link>
        <ThemeToggle />
        <Button href="/catalogo-catech360.pdf" download size="compact" icon={DownloadIcon}>
          Catálogo
        </Button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu principal"
          className="flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto bg-surface px-4 pb-8 pt-4 xl:hidden"
        >
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={i === 0 ? firstLinkRef : undefined}
              className={`rounded-md px-3 py-3 text-lg font-medium transition-colors hover:bg-surface-alt ${
                isActive(link.href) ? "text-accent-600" : "text-foreground"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/catalogo-catech360.pdf"
            download
            className="flex items-center gap-2 rounded-md px-3 py-3 text-lg font-medium text-foreground-muted transition-colors hover:bg-surface-alt"
            onClick={() => setOpen(false)}
          >
            <span className="text-accent-600">{DownloadIcon}</span>
            Baixar catálogo (PDF)
          </a>
          <Link
            href="/login"
            className="mt-4 flex items-center gap-2 self-start rounded-md border border-border-strong px-6 py-3 text-sm font-semibold text-foreground"
            onClick={() => setOpen(false)}
          >
            <span className="text-accent-600">{LoginIcon}</span>
            Entrar
          </Link>
        </nav>
      )}
    </header>
  );
}
