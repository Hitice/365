"use client";

import { useState } from "react";
import type { MaquinaProduto } from "@/lib/data";
import ChipList from "./ChipList";
import ModelCarousel from "./ModelCarousel";
import FadeUp from "./FadeUp";

/*
  Abas pra alternar entre as linhas de maquina em vez de empilhar as duas
  na mesma pagina — fica mais facil o cliente comparar sem rolar tudo.
*/
export default function MaquinasTabs({ produtos }: { produtos: MaquinaProduto[] }) {
  const [active, setActive] = useState(0);
  const produto = produtos[active];

  return (
    <section className="border-t border-border py-14 sm:py-16">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <div role="tablist" aria-label="Linhas de máquinas" className="flex border-b border-border">
          {produtos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`relative -mb-px min-h-11 rounded-t-lg border border-b-0 px-6 text-sm font-semibold transition-colors ${
                i === active
                  ? "z-10 border-border bg-background text-accent-600"
                  : "border-transparent bg-border text-foreground-muted hover:text-foreground"
              }`}
            >
              {p.titulo}
            </button>
          ))}
        </div>

        <div key={produto.id} role="tabpanel">
          <FadeUp className="mt-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                {produto.modelos.length} modelos
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {produto.titulo}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
                {produto.descricao}
              </p>
            </div>

            <div className="mt-6">
              <ChipList items={produto.base} />
            </div>
          </FadeUp>

          <FadeUp delay={120} className="mt-8">
            <ModelCarousel produto={produto} />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
