import type { Case } from "@/lib/data";

export default function CaseCard({ caso }: { caso: Case }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-7">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-subtle">
        {caso.setor}
      </p>
      <h3 className="mt-2 text-xl font-bold text-foreground">{caso.titulo}</h3>

      <dl className="mt-5 flex-1 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-semibold uppercase tracking-wider text-accent-600">
            Problema
          </dt>
          <dd className="mt-1 text-foreground-muted">{caso.problema}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wider text-steel-700">
            Solução
          </dt>
          <dd className="mt-1 text-foreground-muted">{caso.solucao}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wider text-foreground-subtle">
            Resultado
          </dt>
          <dd className="mt-1 text-foreground-muted">{caso.resultado}</dd>
        </div>
      </dl>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {caso.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-foreground-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
