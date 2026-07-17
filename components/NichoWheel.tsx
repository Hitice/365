"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Nicho = {
  label: string;
  desc: string;
  href: string;
  laranja: boolean;
};

/*
  Ordem horária a partir do topo. Seis nichos, um por fatia, cada um levando
  a uma seção única do site.
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
    desc: "Peças, moldes e fabricação sob demanda",
    href: "/servicos#usinagem",
    laranja: false,
  },
  {
    label: "Insumos",
    desc: "Chapas, buchas e tarugos em plásticos industriais",
    href: "/produtos",
    laranja: true,
  },
  {
    label: "Ferramental",
    desc: "Matrizes, punções, carimbos, eletrodos e gravações",
    href: "/servicos#ferramentaria",
    laranja: false,
  },
  {
    label: "Manutenção",
    desc: "Reparos com atendimento remoto e presencial",
    href: "/servicos#manutencao",
    laranja: true,
  },
  {
    label: "Retrofit",
    desc: "Migração para DDCS e comandos atuais",
    href: "/servicos#retrofit",
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
  const router = useRouter();

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <svg
        viewBox="0 0 400 400"
        role="navigation"
        aria-label="Áreas da Catech 360"
        className="w-full select-none"
      >
        {/* anel decorativo girando */}
        <circle
          cx={CX}
          cy={CY}
          r={172}
          fill="none"
          stroke="var(--ink-300)"
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
              : "var(--ink-300)";
          const [tx, ty] = polar((R1 + R2) / 2, mid);
          const flip = mid > 0 && mid < 180;
          const rotation = flip ? mid - 90 : mid + 90;

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
                style={{
                  transformOrigin: "200px 200px",
                  transform: mounted
                    ? isActive
                      ? "scale(1.05) rotate(0deg)"
                      : "scale(1) rotate(0deg)"
                    : "scale(0.55) rotate(-40deg)",
                  opacity: mounted ? 1 : 0,
                  transition: `transform 0.45s cubic-bezier(0.34,1.4,0.64,1) ${
                    mounted ? "0ms" : `${i * 80}ms`
                  }, opacity 0.5s ease-out ${mounted ? "0ms" : `${i * 80}ms`}`,
                }}
              >
                <path
                  d={segmentPath(start, end)}
                  fill={fill}
                  style={{
                    transition: "fill 0.25s ease",
                    opacity: isActive || nicho.laranja ? 1 : 0.9,
                  }}
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={`rotate(${rotation} ${tx} ${ty})`}
                  style={{
                    fill:
                      isActive || nicho.laranja
                        ? "#ffffff"
                        : "var(--ink-700)",
                    fontSize: nicho.label.length > 9 ? "12.5px" : "14px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "fill 0.25s ease",
                    pointerEvents: "none",
                  }}
                >
                  {nicho.label}
                </text>
              </g>
            </a>
          );
        })}

        {/* centro */}
        <text
          x={CX}
          y={active === null ? CY : CY - 6}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fill: "var(--ink-700)",
            fontSize: active === null ? "52px" : "22px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            transition: "all 0.2s ease",
            pointerEvents: "none",
          }}
        >
          {active === null ? "360" : nichos[active].label}
        </text>
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
        className="mt-3 min-h-10 text-center text-sm leading-relaxed text-ink-700"
        aria-live="polite"
      >
        {active !== null ? nichos[active].desc : ""}
      </p>
    </div>
  );
}
