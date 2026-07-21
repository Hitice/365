"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "./LogoIcon";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";

const links = [
  { href: "/produtos", label: "Plásticos" },
  { href: "/usinagem", label: "Usinagem" },
  { href: "/maquinas", label: "Máquinas" },
  { href: "/assistencia-tecnica", label: "Assistência" },
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
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
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

          <ThemeToggle className="ml-1" />

          <Button
            href="/catalogo-catech360.pdf"
            download
            variant="secondary"
            size="compact"
            icon={DownloadIcon}
          >
            Catálogo
          </Button>
          <Button href="/contato" size="compact">
            Solicitar orçamento
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
            href="/contato"
            className="mt-4 self-start rounded-md bg-accent-500 px-6 py-3 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Solicitar orçamento
          </Link>
        </nav>
      )}
    </header>
  );
}
