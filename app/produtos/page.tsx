import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCta from "@/components/ContactCta";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import {
  materiaisDetalhe,
  suprimentosSetores,
  materiaisCatalogo,
  materiais,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Produtos e Insumos",
  description:
    "Chapas, buchas e tarugos em plásticos industriais semiacabados: PEAD, POM, Nylon, PTFE, PEEK, UHMW e mais. Estoque pronto para entrega em Uberlândia MG.",
};

export default function ProdutosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white pb-14 pt-28 sm:pb-16 sm:pt-36">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,196,0.08),transparent_55%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#0b1626 1px, transparent 1px), linear-gradient(90deg, #0b1626 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                01 · Produtos
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                Plásticos industriais{" "}
                <span className="text-accent-600">em estoque</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
                Chapas, buchas e tarugos em plásticos industriais semiacabados,
                prontos para entrega. Plásticos industriais substituem materiais
                tradicionais com baixo custo e vantagens técnicas, e quem usina
                internamente também pode comprar direto.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contato"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  Pedir cotação
                </a>
                <a
                  href="#materiais-destaque"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink-300 px-6 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-50"
                >
                  Ver os materiais
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Materiais em destaque */}
        <section
          id="materiais-destaque"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
        >
          <SectionHeading
            eyebrow="Materiais"
            title="Os mais pedidos da prateleira"
            subtitle="Cada material com sua vocação. Não achou o que precisa? Pergunte, buscamos para você."
          />
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {materiaisDetalhe.map((material) => (
              <ProductCard
                key={material.id}
                nome={material.titulo}
                descricao={material.descricao}
                imagem={material.imagem}
                ctaLabel="Pedir cotação"
              />
            ))}
          </div>

          <h3 className="mt-12 text-center font-mono text-sm font-semibold uppercase tracking-[0.25em] text-steel-700">
            Catálogo completo
          </h3>
          <ul className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2">
            {materiaisCatalogo.map((material) => (
              <li
                key={material}
                className="rounded-full border border-ink-100 bg-ink-50 px-3.5 py-1.5 font-mono text-sm font-medium text-ink-700"
              >
                {material}
              </li>
            ))}
          </ul>
        </section>

        {/* Aplicações por setor */}
        <section
          id="setores"
          className="border-y border-ink-100 bg-ink-50 py-14 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Aplicações"
              title="Peças técnicas para cada setor"
              subtitle="Componentes em plástico industrial para manutenção e produção, do desenho à peça pronta."
            />
            <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
              {suprimentosSetores.map((s) => (
                <ProductCard
                  key={s.setor}
                  nome={s.setor}
                  descricao={s.itens}
                  imagem={s.imagem}
                  ctaLabel="Pedir cotação"
                />
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-ink-700">
              Também fornecemos vedações de válvulas e cilindros hidráulicos,
              roldanas em nylon, poliacetal e polipropileno, e perfis guia para
              todos os segmentos industriais.
            </p>
          </div>
        </section>

        {/* Guia rápido */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading
            eyebrow="Guia rápido"
            title="Qual material para qual peça?"
            subtitle="Um resumo prático dos materiais que mais saem e onde cada um se destaca."
          />
          <div className="mt-10 overflow-x-auto rounded-xl border border-ink-100 sm:mt-12">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 bg-ink-50">
                  <th scope="col" className="px-5 py-4 font-semibold text-ink-900">
                    Material
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold text-ink-900">
                    Característica
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold text-ink-900">
                    Onde usamos
                  </th>
                </tr>
              </thead>
              <tbody>
                {materiais.map((material) => (
                  <tr
                    key={material.id}
                    className="border-b border-ink-100 last:border-b-0"
                  >
                    <td className="px-5 py-4 font-semibold text-ink-900">
                      {material.nome}
                    </td>
                    <td className="px-5 py-4 text-ink-700">
                      {material.caracteristica}
                    </td>
                    <td className="px-5 py-4 text-ink-700">{material.usos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ContactCta
          titulo="Precisa de material ou peça técnica?"
          texto="Diga o material, a medida e a quantidade pelo WhatsApp e devolvemos a cotação sem compromisso. Estoque próprio e entrega rápida em Uberlândia e região."
        />
      </main>
      <Footer />
    </>
  );
}
