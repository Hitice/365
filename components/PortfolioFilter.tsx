"use client";

import { useState } from "react";
import Image from "next/image";
import type { Servico } from "@/lib/data";

export type PortfolioItem = Servico & { categoria: string };

export default function PortfolioFilter({
  items,
  categorias,
}: {
  items: PortfolioItem[];
  categorias: string[];
}) {
  const [ativo, setAtivo] = useState("Todos");
  const opcoes = ["Todos", ...categorias];
  const filtrados = ativo === "Todos" ? items : items.filter((i) => i.categoria === ativo);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por categoria">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            type="button"
            onClick={() => setAtivo(opcao)}
            aria-pressed={ativo === opcao}
            className={`inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-semibold transition-colors active:scale-95 ${
              ativo === opcao
                ? "border-accent-500 bg-accent-500 text-white dark:text-navy-950"
                : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground"
            }`}
          >
            {opcao}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-lg hover:shadow-navy-900/10"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
              <Image
                src={item.imagem}
                alt={item.titulo}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-md bg-navy-950/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {item.categoria}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-base font-semibold text-foreground">{item.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                {item.descricao}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
