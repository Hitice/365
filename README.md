# Catech 360

Site institucional da Catech 360 (Uberlândia MG): plásticos industriais, usinagem CNC, máquinas de fabricação própria, assistência técnica e um portfólio de projetos de automação.

## Tecnologias

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack) — esta versão tem convenções que fogem do Next.js "clássico"; antes de mexer no roteamento ou nas Metadata APIs, veja `node_modules/next/dist/docs/`.
- **React 19.2**
- **TypeScript**
- **Tailwind CSS v4** — configurado via `@theme` direto em `app/globals.css`, sem `tailwind.config.js`.
- **pdfkit** + **sharp** — geram o catálogo em PDF a partir dos mesmos dados do site.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Build e produção

```bash
npm run build   # build de produção (Turbopack)
npm run start   # serve o build gerado
npm run lint    # ESLint
```

## Deploy

O projeto não tem infraestrutura própria (sem banco, sem API routes) — é 100% estático/SSR simples, então roda em qualquer plataforma que suporte Next.js (Vercel é a mais direta: `vercel deploy` ou conectar o repositório).

Defina a variável de ambiente `NEXT_PUBLIC_SITE_URL` com o domínio final antes de publicar — ela é usada em `app/sitemap.ts` e `app/robots.ts`. Sem ela, o site cai no domínio placeholder `https://catech360.com.br`.

## Tema claro/escuro

O dark mode é controlado por classe (não por `prefers-color-scheme`), para permitir alternância manual com o claro como padrão:

- **Tokens**: `app/globals.css` define duas camadas de cor — a paleta de marca (`--navy-*`, `--steel-*`, `--accent-*`, `--ink-*`) e uma camada semântica (`--background`, `--surface`, `--surface-alt`, `--foreground`, `--foreground-muted`, `--foreground-subtle`, `--border`, `--border-strong`). Os componentes usam só a camada semântica (`bg-surface`, `text-foreground` etc.), nunca a paleta crua diretamente — isso é o que faz o dark mode funcionar num lugar só.
- **Ativação**: `@custom-variant dark (&:where(.dark, .dark *));` liga o variant `dark:` do Tailwind à classe `.dark` na tag `<html>`, e o bloco `.dark { ... }` redefine os tokens semânticos para os valores escuros.
- **Toggle**: `components/ThemeToggle.tsx` alterna a classe e grava a preferência em `localStorage.theme`.
- **Sem flash**: um script inline em `app/layout.tsx` lê o `localStorage` e aplica a classe `.dark` antes da primeira pintura da página (senão o usuário veria um flash branco antes de escurecer).
- Cores de marca fixas (laranja da logo, verde do botão de WhatsApp) não mudam entre temas — são elementos com fundo próprio, não dependem do fundo da página.

Para adicionar uma nova cor de superfície ou texto, adicione o token semântico em `:root` e o equivalente em `.dark`, depois exponha em `@theme inline` — não use `bg-white`, `text-ink-900` etc. diretamente em componentes novos.

## Estrutura de rotas

| Rota | Conteúdo |
|---|---|
| `/` | Home: hero, roda de navegação, vitrine e CTA de contato |
| `/produtos` | Plásticos industriais — catálogo de materiais |
| `/usinagem` | Usinagem CNC, ferramentaria, engenharia reversa e cases |
| `/maquinas` | Máquinas CNC de fabricação própria (Linha Compacta e Linha Router) |
| `/assistencia-tecnica` | Manutenção e retrofit de CNC |
| `/portfolio` | Projetos realizados, com filtro por categoria |
| `/sobre` | Quem é a Catech 360 |
| `/contato` | WhatsApp, e-mail, endereço e horário |

O catálogo em PDF é um download (`public/catalogo-catech360.pdf`), com botão único no Header — não é uma rota.

## Onde editar

- **Textos, máquinas e serviços**: [lib/data.ts](lib/data.ts) — troque ali e o site inteiro atualiza.
- **Imagens**: salve em [public/images/](public/images/) com os nomes listados em [public/images/LEIA-ME.md](public/images/LEIA-ME.md). O card mostra um placeholder até a imagem existir.
- **Paleta de cores e tema**: [app/globals.css](app/globals.css).
- **Contato**: número de WhatsApp e e-mail estão centralizados em `components/ContactCta.tsx`, `components/WhatsAppButton.tsx`, `components/Footer.tsx` e `app/contato/page.tsx` (busque por `wa.me` e `mailto`).
- **Catálogo em PDF**: gerado por [scripts/gerar-catalogo.mjs](scripts/gerar-catalogo.mjs) a partir de `lib/data.ts`. Rode `npm run catalogo` depois de editar os dados para regenerar o PDF.

## Componentes principais

- `components/Header.tsx` / `Footer.tsx`: navegação e rodapé, compartilhados por todas as páginas.
- `components/Button.tsx`: botão padrão do site (variantes `primary`/`secondary`, tamanhos `default`/`compact`).
- `components/ChipList.tsx`: lista de chips com limite de itens visíveis e "Ver mais".
- `components/ProductCard.tsx`: card de produto/serviço, com modo `compact` para grades densas.
- `components/CaseCard.tsx`: card de case (problema/solução/resultado).
- `components/PortfolioFilter.tsx`: grade filtrável por categoria da página `/portfolio`.
- `components/ModelCarousel.tsx` / `CardCarousel.tsx`: carrosséis de modelos de máquina e da vitrine da Home.
- `components/NichoWheel.tsx`: roda de navegação da Home, um segmento por pilar do site.
- `components/ThemeToggle.tsx`: alternância de tema claro/escuro.
