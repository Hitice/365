"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "./LogoIcon";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";

const links = [
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border bg-surface/95 backdrop-blur transition-shadow duration-300 ${
        scrolled && !open ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:pr-20">
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
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Button
            href="/catalogo-catech360.pdf"
            download
            variant="secondary"
            size="compact"
            icon={DownloadIcon}
          >
            Catálogo
          </Button>
          <Button href="/login" variant="secondary" size="compact" icon={LoginIcon}>
            Entrar
          </Button>
        </nav>

        <div className="flex items-center gap-1 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground"
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
      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 xl:block">
        <ThemeToggle />
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu principal"
          className="flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto bg-surface px-4 pb-8 pt-4 xl:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
            {DownloadIcon}
            Baixar catálogo (PDF)
          </a>
          <Link
            href="/login"
            className="mt-4 flex items-center gap-2 self-start rounded-md border border-border-strong px-6 py-3 text-sm font-semibold text-foreground"
            onClick={() => setOpen(false)}
          >
            {LoginIcon}
            Entrar
          </Link>
        </nav>
      )}
    </header>
  );
}
