const CHIP_CLASS =
  "shrink-0 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs font-medium text-foreground-muted";

/*
  Faixa de chips rolando devagar e continuamente (tipo ticker), em vez de
  truncar com "Ver mais". O segundo bloco (oculto de leitor de tela e da
  arvore com prefers-reduced-motion) so existe pra fechar o loop sem
  emenda, ja que a animacao anda exatamente 50% da largura total.
*/
export default function ChipList({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)] motion-reduce:[mask-image:none]">
      <div
        role="list"
        className="chip-marquee flex w-max gap-2 motion-reduce:w-full motion-reduce:flex-wrap"
      >
        {items.map((item) => (
          <span key={item} role="listitem" className={CHIP_CLASS}>
            {item}
          </span>
        ))}
        <div aria-hidden="true" className="flex gap-2 motion-reduce:hidden">
          {items.map((item, i) => (
            <span key={i} className={CHIP_CLASS}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
