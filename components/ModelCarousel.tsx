"use client";

import Image from "next/image";
import { useState } from "react";
import type { MaquinaProduto } from "@/lib/data";

/*
  Carrossel de modelos de uma linha de máquina: um modelo por vez,
  com foto, ficha técnica, preço e CTA de orçamento pelo WhatsApp.
*/
export default function ModelCarousel({ produto }: { produto: MaquinaProduto }) {
  const [index, setIndex] = useState(0);
  const total = produto.modelos.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {produto.modelos.map((modelo) => (
            <div
              key={modelo.id}
              className="grid w-full flex-shrink-0 md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px]">
                <Image
                  src={modelo.imagem}
                  alt={modelo.nome}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-md bg-navy-950/85 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {index + 1} / {total}
                </span>
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                  {modelo.area}
                </p>
                <h4 className="mt-2 text-2xl font-bold text-ink-900 sm:text-3xl">
                  {modelo.nome}
                </h4>
                <p className="mt-3 font-mono text-lg font-bold text-accent-600">
                  {modelo.preco}
                </p>

                <ul className="mt-5 flex-1 space-y-2">
                  {modelo.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex gap-2.5 text-sm text-ink-700"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 flex-none text-accent-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {spec}
                    </li>
                  ))}
                  <li className="pt-1 text-xs text-ink-500">
                    + todos os itens de série da linha listados acima
                  </li>
                </ul>

                <a
                  href={`https://wa.me/5534991176599?text=${encodeURIComponent(
                    `Olá! Quero uma cotação da ${modelo.nome} (${produto.titulo}).`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center self-start rounded-md bg-accent-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  Cotar este modelo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-ink-100 px-4 py-3">
        <button
          onClick={prev}
          aria-label="Modelo anterior"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink-300 text-ink-700 transition-colors hover:border-accent-500/60 hover:text-accent-600"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {produto.modelos.map((modelo, i) => (
            <button
              key={modelo.id}
              onClick={() => setIndex(i)}
              aria-label={modelo.nome}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-accent-500"
                  : "w-1.5 bg-ink-300 hover:bg-ink-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Próximo modelo"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink-300 text-ink-700 transition-colors hover:border-accent-500/60 hover:text-accent-600"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
