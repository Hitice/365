"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MaquinaProduto } from "@/lib/data";

const DRAG_THRESHOLD = 40;

/*
  Carrossel de modelos de uma linha de máquina: um modelo por vez,
  com foto, ficha técnica, preço e CTA de orçamento pelo WhatsApp.
  Suporta arraste/swipe por toque, além das setas e pontos.
*/
export default function ModelCarousel({ produto }: { produto: MaquinaProduto }) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const total = produto.modelos.length;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStartX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragX(e.clientX - dragStartX.current);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX <= -DRAG_THRESHOLD) next();
    else if (dragX >= DRAG_THRESHOLD) prev();
    setDragX(0);
  };

  const tx = index * width - dragX;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div
          ref={trackRef}
          className="touch-pan-y overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            className="flex select-none"
            style={{
              transform: `translateX(-${tx}px)`,
              transition: dragging ? "none" : "transform 500ms ease-in-out",
            }}
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
                    draggable={false}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-md bg-navy-950/85 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {index + 1} / {total}
                  </span>
                </div>

                <div className="flex flex-col p-6 sm:p-8">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                    {modelo.area}
                  </p>
                  <h4 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                    {modelo.nome}
                  </h4>
                  <p className="mt-3 font-mono text-lg font-bold text-accent-600">
                    {modelo.preco}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {modelo.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex gap-2.5 text-sm text-foreground-muted"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 flex-none text-accent-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
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
                  </ul>

                  <a
                    href={`https://wa.me/5534991176599?text=${encodeURIComponent(
                      `Olá! Quero uma cotação da ${modelo.nome} (${produto.titulo}).`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center justify-center self-start rounded-md bg-accent-500 px-6 text-sm font-semibold text-white transition-all duration-150 hover:brightness-90 active:scale-[0.98] dark:text-navy-950"
                  >
                    Cotar este modelo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-border px-2 py-2">
          <div className="flex gap-1">
            {produto.modelos.map((modelo, i) => (
              <button
                key={modelo.id}
                onClick={() => setIndex(i)}
                aria-label={modelo.nome}
                aria-current={i === index}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-accent-500" : "w-1.5 bg-border-strong"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Modelo anterior"
        className="absolute -left-1 top-32 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface text-foreground-muted shadow-sm transition-colors duration-200 hover:border-accent-500/60 hover:text-accent-600 sm:-left-4 md:top-1/2"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Próximo modelo"
        className="absolute -right-1 top-32 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface text-foreground-muted shadow-sm transition-colors duration-200 hover:border-accent-500/60 hover:text-accent-600 sm:-right-4 md:top-1/2"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
