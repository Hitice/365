"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Material } from "@/lib/data";

const GAP = 16;
const CLONE = 4;
const DRAG_THRESHOLD = 40;

/*
  Carrossel infinito com autoplay pro catalogo de materiais. Responsivo:
  1 card no celular, 2 no tablet, 4 no desktop. Pausa no hover/arraste;
  setas, pontos de navegacao e swipe por toque. Mesmo padrao do
  CardCarousel da Vitrine, so que sem link (materiais nao tem pagina
  propria) e com 4 por vez em vez de 3.
*/
export default function MaterialCarousel({ items }: { items: Material[] }) {
  const extended = [...items.slice(-CLONE), ...items, ...items.slice(0, CLONE)];

  const [index, setIndex] = useState(CLONE);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(0);
  const [dragX, setDragX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; dragging: boolean } | null>(null);

  const visible = width < 640 ? 1 : width < 1024 ? 2 : 4;
  const cardWidth = width > 0 ? (width - GAP * (visible - 1)) / visible : 0;
  const tx = index * (cardWidth + GAP) - dragX;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!animated) return;
    const t = setTimeout(() => {
      if (index < CLONE) {
        setAnimated(false);
        setIndex(index + items.length);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimated(true)),
        );
      } else if (index >= items.length + CLONE) {
        setAnimated(false);
        setIndex(index - items.length);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimated(true)),
        );
      }
    }, 520);
    return () => clearTimeout(t);
  }, [index, animated, items.length]);

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = () => setIndex((i) => i - 1);

  const realIdx =
    (((index - CLONE) % items.length) + items.length) % items.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragState.current = { startX: e.clientX, dragging: true };
    setAnimated(false);
    setPaused(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current?.dragging) return;
    setDragX(e.clientX - dragState.current.startX);
  };

  const endDrag = () => {
    if (!dragState.current?.dragging) return;
    dragState.current.dragging = false;
    setPaused(false);
    setAnimated(true);
    if (dragX <= -DRAG_THRESHOLD) {
      setIndex((i) => i + 1);
    } else if (dragX >= DRAG_THRESHOLD) {
      setIndex((i) => i - 1);
    }
    setDragX(0);
  };

  return (
    <div
      className="group/carousel relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={containerRef}
        className="touch-pan-y overflow-hidden rounded-xl"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="flex select-none"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(-${tx}px)`,
            transition: animated ? "transform 500ms ease-in-out" : "none",
          }}
        >
          {extended.map((item, i) => (
            <div
              key={`${item.nome}-${i}`}
              className="group flex-shrink-0 overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:border-accent-500/60 hover:shadow-md"
              style={{
                width: `calc((100% - ${GAP * (visible - 1)}px) / ${visible})`,
              }}
            >
              <div className="relative aspect-square overflow-hidden bg-surface-alt">
                <Image
                  src={item.imagem}
                  alt={item.nome}
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-3.5">
                <h3 className="text-sm font-semibold text-foreground">{item.nome}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute -left-1 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface text-foreground-muted shadow-sm transition-colors duration-200 hover:border-accent-500/60 hover:text-accent-600 sm:-left-4"
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
        aria-label="Próximo"
        className="absolute -right-1 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface text-foreground-muted shadow-sm transition-colors duration-200 hover:border-accent-500/60 hover:text-accent-600 sm:-right-4"
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

      <div className="mt-3 flex justify-center gap-1">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i + CLONE)}
            aria-label={`Material ${i + 1}`}
            aria-current={i === realIdx}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === realIdx
                  ? "w-5 bg-accent-500"
                  : "w-1.5 bg-border-strong"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
