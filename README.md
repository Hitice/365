# Catech 360

Site institucional da Catech 360 (Uberlândia MG): plásticos industriais, usinagem CNC, máquinas de fabricação própria, assistência técnica e um portfólio de projetos de automação.

## Tecnologias

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack) — esta versão tem convenções que fogem do Next.js "clássico"; antes de mexer no roteamento ou nas Metadata APIs, veja `node_modules/next/dist/docs/`.
- **React 19.2**
- **TypeScript**
- **Tailwind CSS v4** — configurado via `@theme` direto em `app/globals.css`, sem `tailwind.config.js`.
- **pdfkit** + **sharp** — geram o catálogo em PDF a partir dos mesmos dados do site.
- **Supabase** (`@supabase/ssr` + `@supabase/supabase-js`) — autenticação do painel interno (`/login`, `/painel`), base para o CRM futuro.

## Rodar localmente

```bash
npm install
cp .env.local.example .env.local   # preencha com as chaves do Supabase
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

Hospedado na Vercel, projeto `365` na conta `pedromuska-6439s-projects`, conectado ao repositório do GitHub — todo push em `main` dispara um deploy automático. Domínio final: `catech.ind.br`.

Variáveis de ambiente necessárias no projeto Vercel (Settings → Environment Variables):

| Variável | Onde pegar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Painel Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Painel Supabase → Project Settings → API |
| `NEXT_PUBLIC_SITE_URL` | `https://catech.ind.br` |

Sem `NEXT_PUBLIC_SITE_URL`, `app/sitemap.ts`, `app/robots.ts` e o `metadataBase` caem no domínio `https://catech.ind.br` como padrão mesmo assim (já configurado como fallback).

## Autenticação e CRM interno (`/painel`)

- **`lib/supabase/server.ts`** / **`lib/supabase/client.ts`**: clientes Supabase para Server Components/Actions e para Client Components, respectivamente.
- **`lib/supabase/admin.ts`**: cliente com a `service_role` key (ignora RLS, cria login de usuário). Só pode ser importado por Server Actions — nunca por um Client Component (o import `"server-only"` faz o build falhar se isso acontecer).
- **`proxy.ts`** (equivalente ao `middleware.ts` do Next 15 — renomeado no Next 16): roda em toda rota, atualiza a sessão do Supabase e redireciona pra `/login` quem tentar acessar `/painel` sem sessão válida.
- **`/login`**: formulário de e-mail/senha, autentica via Server Action (`app/login/actions.ts`).
- **`/painel`**: CRM interno, protegido (checa a sessão de novo em `lib/crm/session.ts`, não confia só no `proxy.ts`). Dois papéis: `team_leader` (CRUD completo de contatos, produtos e usuários) e `vendedor` (só vê/edita os próprios contatos, via RLS).
  - `/painel/contatos` (Funil): tabela com busca (nome/empresa), filtro por etapa/nicho/responsável e paginação — telefone (link WhatsApp), e-mail, valor do negócio e próximo contato visíveis na linha; etapa editável direto na linha (`components/painel/EtapaSelect.tsx`). Botão "Exportar CSV" baixa o mailing com os filtros aplicados (`export/route.ts`).
  - `/painel/clientes` (Carteira): quem já fechou ou está no Asaas — resumo por nicho e cidade, botão "Importar do Asaas" (team_leader) que puxa a carteira do Asaas e vincula/cria contatos por CPF/CNPJ.
  - `/painel/contatos/[id]`: dados do contato (inclui documento/endereço, nicho e produto de interesse) + botão "Cadastrar no Asaas" + histórico de atividades (ligação, e-mail, portfólio enviado, reunião, nota).
  - `/painel/produtos` (leitura para todos, edição só `team_leader`): catálogo operacional de máquinas/serviços/materiais com estoque (quantidade + unidade, migração `0003_estoque.sql`), independente do `lib/data.ts` do site.
  - `/painel/usuarios` (só `team_leader`): cria login de verdade (e-mail+senha) pra vendedores novos, edita nome/cargo, ativa/desativa.
  - Schema em `supabase/migrations/` (rodar em ordem): `0001_crm_init.sql` (`profiles`, `contatos`, `atividades` + RLS), `0002_produtos_asaas.sql` (`produtos`, nicho, campos de cliente), `0003_estoque.sql` (quantidade/unidade), `0004_crm_v2.sql` (valor do negócio, próximo contato, trigger de `updated_at` e log automático de mudança de etapa no histórico).

Não existe cadastro público: o primeiro usuário (team_leader) é promovido por SQL direto (ver o final da migração); os demais são criados pela tela `/painel/usuarios`.

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
| `/maquinas` | Máquinas CNC de fabricação própria (CNC Usinagem e Router CNC) |
| `/assistencia-tecnica` | Manutenção e retrofit de CNC |
| `/portfolio` | Projetos realizados, com filtro por categoria |
| `/sobre` | Quem é a Catech 360 |
| `/contato` | WhatsApp, e-mail, endereço e horário |
| `/login` | Acesso ao painel interno (fora do sitemap, `noindex`) |
| `/painel` | CRM interno: contatos (tabela do funil), produtos, atividades e usuários (fora do sitemap, `noindex`) |

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
