"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type Nicho = {
  label: string;
  desc: string;
  href: string;
  laranja: boolean;
};

/*
  Ordem horária a partir do topo. Um nicho por fatia, cada um é um dos
  quatro pilares do site.
*/
const nichos: Nicho[] = [
  {
    label: "Máquinas",
    desc: "CNC de fabricação própria, a partir de R$ 25 mil",
    href: "/maquinas",
    laranja: true,
  },
  {
    label: "Usinagem",
    desc: "Peças sob desenho, moldes e engenharia reversa",
    href: "/usinagem",
    laranja: false,
  },
  {
    label: "Plásticos",
    desc: "Chapas, buchas e tarugos em estoque",
    href: "/produtos",
    laranja: true,
  },
  {
    label: "Assistência",
    desc: "Retrofit e manutenção de CNC",
    href: "/assistencia-tecnica",
    laranja: false,
  },
];

const CX = 200;
const CY = 200;
const R1 = 92;
const R2 = 156;
const SEG = 360 / nichos.length;
const GAP = 3.2;

function polar(r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function segmentPath(a1: number, a2: number): string {
  const [x1, y1] = polar(R2, a1);
  const [x2, y2] = polar(R2, a2);
  const [x3, y3] = polar(R1, a2);
  const [x4, y4] = polar(R1, a1);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${R2} ${R2} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L${x3.toFixed(2)} ${y3.toFixed(2)} A${R1} ${R1} 0 0 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
}

export default function NichoWheel() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const router = useRouter();
  const uid = useId();

  useEffect(() => {
    if (reduceMotion) return;
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [reduceMotion]);

  return (
    <div className="relative mx-auto flex h-full w-fit max-w-[380px] min-w-[200px] items-center justify-center lg:mx-0 lg:ml-auto">
      <svg
        viewBox="24 24 352 352"
        role="navigation"
        aria-label="Áreas da Catech 360"
        className="aspect-square h-full max-w-full w-auto select-none"
      >
        {/* anel decorativo girando */}
        <circle
          cx={CX}
          cy={CY}
          r={172}
          fill="none"
          stroke="var(--wheel-ring)"
          strokeWidth="1"
          strokeDasharray="3 9"
          className="wheel-ring"
        />

        {nichos.map((nicho, i) => {
          const start = i * SEG - 90 + GAP;
          const end = (i + 1) * SEG - 90 - GAP;
          const mid = (start + end) / 2;
          const isActive = active === i;
          const fill = isActive
            ? "var(--accent-500)"
            : nicho.laranja
              ? "var(--accent-500)"
              : "var(--border-strong)";

          // Rótulo curvo, acompanhando o arco no meio da fatia (igual ao
          // "ajustar texto ao caminho" do Corel). Nas fatias da metade de
          // baixo o arco é desenhado ao contrário para o texto não ficar
          // de cabeça para baixo.
          const rMeio = (R1 + R2) / 2;
          const flip = mid > 0 && mid < 180;
          const [ax1, ay1] = polar(rMeio, start);
          const [ax2, ay2] = polar(rMeio, end);
          const arcoId = `${uid}-arco-${i}`;
          const arco = flip
            ? `M${ax2.toFixed(2)} ${ay2.toFixed(2)} A${rMeio} ${rMeio} 0 0 0 ${ax1.toFixed(2)} ${ay1.toFixed(2)}`
            : `M${ax1.toFixed(2)} ${ay1.toFixed(2)} A${rMeio} ${rMeio} 0 0 1 ${ax2.toFixed(2)} ${ay2.toFixed(2)}`;

          return (
            <a
              key={nicho.label}
              href={nicho.href}
              aria-label={`${nicho.label}: ${nicho.desc}`}
              onClick={(e) => {
                e.preventDefault();
                router.push(nicho.href);
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="cursor-pointer outline-none"
            >
              <g
                style={
                  reduceMotion
                    ? { transformOrigin: "50% 50%" }
                    : {
                        transformOrigin: "50% 50%",
                        transform: mounted
                          ? isActive
                            ? "scale(1.015) rotate(0deg)"
                            : "scale(1) rotate(0deg)"
                          : "scale(0.55) rotate(-40deg)",
                        opacity: mounted ? 1 : 0,
                        transition: `transform 0.45s cubic-bezier(0.34,1.4,0.64,1) ${
                          mounted ? "0ms" : `${i * 80}ms`
                        }, opacity 0.5s ease-out ${mounted ? "0ms" : `${i * 80}ms`}`,
                      }
                }
              >
                <path
                  d={segmentPath(start, end)}
                  fill={fill}
                  stroke={fill}
                  strokeWidth={9}
                  strokeLinejoin="round"
                  style={{
                    transition: "fill 0.25s ease, stroke 0.25s ease",
                    opacity: isActive || nicho.laranja ? 1 : 0.9,
                  }}
                />
                <path id={arcoId} d={arco} fill="none" />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{
                    fill:
                      isActive || nicho.laranja
                        ? "var(--wheel-text-on-orange)"
                        : "var(--foreground-muted)",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    transition: "fill 0.25s ease",
                    pointerEvents: "none",
                  }}
                >
                  <textPath href={`#${arcoId}`} startOffset="50%">
                    {nicho.label}
                  </textPath>
                </text>
              </g>
            </a>
          );
        })}

        {/* centro */}
        {active === null ? (
          // "360" da marca (arte do logo). Duas variantes trocadas por tema:
          // navy no claro, branca no escuro (a bolinha do grau acompanha).
          <>
            <image
              href="/images/brand/catech360/360-light.png"
              x={CX - 60}
              y={CY - 20.75}
              width={120}
              height={41.5}
              className="dark:hidden"
              style={{ pointerEvents: "none" }}
            />
            <image
              href="/images/brand/catech360/360-dark.png"
              x={CX - 60}
              y={CY - 20.75}
              width={120}
              height={41.5}
              className="hidden dark:block"
              style={{ pointerEvents: "none" }}
            />
          </>
        ) : (
          <text
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fill: "var(--foreground-muted)",
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              transition: "all 0.2s ease",
              pointerEvents: "none",
            }}
          >
            {nichos[active].label}
          </text>
        )}
        {active !== null && (
          <text
            x={CX}
            y={CY + 18}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fill: "var(--accent-600)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              pointerEvents: "none",
            }}
          >
            clique para abrir
          </text>
        )}
      </svg>

      <p
        className="absolute left-1/2 top-full mt-3 min-h-10 w-full -translate-x-1/2 text-center text-sm leading-relaxed text-foreground-muted"
        aria-live="polite"
      >
        {active !== null ? nichos[active].desc : ""}
      </p>
    </div>
  );
}
