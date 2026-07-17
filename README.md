# Site 360 | CNC, Usinagem e Arquitetura

Site institucional da startup 360 (Uberlândia MG), feito com Next.js (App Router, TypeScript) e Tailwind CSS v4.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Onde editar

- **Textos, máquinas e serviços**: [lib/data.ts](lib/data.ts). Nomes de máquinas são provisórios, troque ali e o site inteiro atualiza.
- **Imagens**: salve em [public/images/](public/images/) com os nomes listados em [public/images/LEIA-ME.md](public/images/LEIA-ME.md). O card mostra placeholder até a imagem existir.
- **Paleta de cores**: [app/globals.css](app/globals.css), tokens com contraste validado WCAG AA.
- **Contato**: troque o número do WhatsApp e o e-mail em [app/page.tsx](app/page.tsx) (busque por `wa.me` e `mailto`). Os atuais são placeholders.

## Estrutura

- `app/page.tsx`: página de entrada onde o cliente escolhe entre Máquinas e Serviços ou Arquitetura e Produção (Showroom).
- `app/maquinas/page.tsx`: máquinas CNC, manutenção, retrofit e lab de usinagem.
- `app/arquitetura/page.tsx`: showroom de produção (laser, corten, ACM, letras caixa) e automação.
- `components/Header.tsx`: menu fixo responsivo, recebe os links de cada área.
- `components/ProductCard.tsx`: card responsivo de produto/serviço com imagem, tags e CTA.
- `components/ContactCta.tsx` e `components/Footer.tsx`: contato e rodapé compartilhados.
- `components/SectionHeading.tsx`: cabeçalho padrão das seções.

## Próximos passos planejados

- Integração com Supabase (Postgres) para formulário de orçamento e catálogo dinâmico.
- Fotos reais das máquinas e serviços.
- Páginas de detalhe por máquina.
