import type { Case } from "@/lib/data";

export default function CaseCard({ caso }: { caso: Case }) {
  return (
    <article className="flex flex-col rounded-2xl border border-ink-100 bg-white p-7">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-500">
        {caso.setor}
      </p>
      <h3 className="mt-2 text-xl font-bold text-ink-900">{caso.titulo}</h3>

      <dl className="mt-5 flex-1 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-semibold uppercase tracking-wider text-accent-600">
            Problema
          </dt>
          <dd className="mt-1 text-ink-700">{caso.problema}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wider text-steel-700">
            Solução
          </dt>
          <dd className="mt-1 text-ink-700">{caso.solucao}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wider text-ink-900">
            Resultado
          </dt>
          <dd className="mt-1 font-medium text-ink-900">{caso.resultado}</dd>
        </div>
      </dl>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {caso.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-ink-100 bg-ink-50 px-2.5 py-0.5 text-xs font-medium text-ink-700"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
