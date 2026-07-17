/*
  Ícone da Catech 360: seta circular (giro 360°) em laranja envolvendo
  uma mira de usinagem CNC (crosshair de fresa) em branco.
*/
export default function LogoIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 5 a15 15 0 1 1 -13 7.5"
        fill="none"
        stroke="#f2680f"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M9.3 8.6 L10.2 14.4 L4.2 11.3 Z" fill="#f2680f" />
      <circle
        cx="20"
        cy="20"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <line
        x1="20"
        y1="11"
        x2="20"
        y2="14.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="25.5"
        x2="20"
        y2="29"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="20"
        x2="14.5"
        y2="20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="25.5"
        y1="20"
        x2="29"
        y2="20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}
