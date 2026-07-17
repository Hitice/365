"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "./LogoIcon";

const links = [
  { href: "/produtos", label: "Produtos" },
  { href: "/servicos", label: "Serviços" },
  { href: "/maquinas", label: "Máquinas" },
  { href: "/#sobre", label: "Sobre" },
];

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

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-ink-100 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled && !open ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink-900"
          onClick={() => setOpen(false)}
        >
          <LogoIcon className="h-9 w-9" />
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="text-xl font-bold tracking-tight">Catech</span>
            <span className="text-xl font-bold text-accent-600">360</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "font-semibold text-accent-600"
                  : "text-ink-700 hover:text-ink-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contato"
            className="ml-2 inline-flex h-9 items-center whitespace-nowrap rounded-md bg-accent-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Solicitar orçamento
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-900 lg:hidden"
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

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu principal"
          className="flex h-[calc(100dvh-4rem)] flex-col gap-1 bg-white px-4 pb-8 pt-4 lg:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-3 text-lg font-medium transition-colors hover:bg-ink-50 ${
                isActive(link.href) ? "text-accent-600" : "text-ink-900"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contato"
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
