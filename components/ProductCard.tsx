"use client";

import { useState } from "react";
import Image from "next/image";

type ProductCardProps = {
  nome: string;
  descricao?: string;
  bullets?: string[];
  imagem: string;
  nicho?: string;
  tags?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  compact?: boolean;
};

/*
  Card de produto ou serviço. Enquanto a imagem definitiva não existe em
  public/images, o card mostra um placeholder com o caminho esperado do
  arquivo — ao salvar a imagem com esse nome, ela aparece automaticamente.
  Em modo compact, mostra só imagem + título, para grades densas.
*/
export default function ProductCard({
  nome,
  descricao,
  bullets,
  imagem,
  nicho,
  tags,
  ctaLabel = "Saiba mais",
  ctaHref = "#contato",
  compact = false,
}: ProductCardProps) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-lg hover:shadow-navy-900/10">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
        {imgOk ? (
          <Image
            src={imagem}
            alt={nome}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-navy-800 to-steel-700 p-4 text-center">
            <svg
              className="h-10 w-10 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 19.5h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"
              />
            </svg>
            <span className="font-mono text-[11px] leading-tight text-white/50">
              {imagem}
            </span>
          </div>
        )}
        {nicho && (
          <span className="absolute left-3 top-3 rounded-md bg-navy-950/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {nicho}
          </span>
        )}
      </div>

      {compact ? (
        <div className="p-3.5">
          <h3 className="text-sm font-semibold text-foreground">{nome}</h3>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg font-semibold text-foreground">{nome}</h3>
          {bullets && bullets.length > 0 ? (
            <ul className="flex-1 space-y-2">
              {bullets.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-foreground-muted">
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
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex-1 text-sm leading-relaxed text-foreground-muted">
              {descricao}
            </p>
          )}

          {tags && tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-steel-50 px-2.5 py-0.5 text-xs font-medium text-steel-700"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <a
            href={ctaHref}
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-md border border-steel-700 px-4 text-sm font-semibold text-steel-700 transition-colors hover:bg-steel-700 hover:text-white"
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </article>
  );
}
