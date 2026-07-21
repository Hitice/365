# Guia de imagens do site

## brand/ e catech/

- `brand/logo.png`: logotipo oficial da Catech 360, usado no header e no rodapé.
- `brand/plasticos/`: uma foto por material do catálogo de plásticos
  (`materiaisCatalogo` em `lib/data.ts`), usadas na página /produtos
  (carrossel "Materiais em estoque") e na categoria "Plásticos" de
  /portfolio. Trocar a imagem de um material é só substituir o arquivo
  mantendo o mesmo nome.
- `catech/`: fotos avulsas usadas pontualmente (Retrofit.png na página de
  Assistência Técnica e na seção "Assistência e Retrofit" de /portfolio,
  entre outras). Pode substituir mantendo o mesmo nome de arquivo.

Salve cada foto com o nome exato indicado abaixo. Assim que o arquivo
existir, a imagem aparece automaticamente no card correspondente. Enquanto
não existir, o card mostra um placeholder com o caminho esperado.

Tamanho recomendado: 1200 x 900 px (proporção 4:3), até 300 KB cada.

## cnc/ (máquinas, 2 por nicho)

| Arquivo | Máquina |
|---|---|
| comunicacao-visual-1.jpg | Router 3000x1500 |
| comunicacao-visual-2.jpg | Router 4000x2000 |
| moldes-1.jpg | CNC 300x300 |
| moldes-2.jpg | CNC 400x400 |
| marcenaria-1.jpg | Router 4000x2000 Full |
| marcenaria-2.jpg | (livre) |

## usinagem/ (usadas em /usinagem, seção "O que fabricamos", e em /portfolio)

| Arquivo | Serviço |
|---|---|
| moldes-injetaveis.jpg | Fabricação de moldes injetáveis |
| moldes-plasticos.jpg | Peças em PEAD, tecnil e poliacetal |
| acrilicos.jpg | Corte em acrílico e policarbonato |
| gabaritos.jpg | Projeto e fabricação de gabaritos |
| torno.jpg | Torneamento, engrenagens e buchas |
| reposicao.jpg | Reposição e nacionalização de peças |
| aluminio.jpg | Corte e usinagem em alumínio |
| gravacoes.jpg | Gravação de moldes e talões |
| baixo-relevo.jpg | Gravação em baixo e alto relevo |
| matrizes.jpg | Fabricação de matrizes, punções e placas |
| carimbos.jpg | Confecção de carimbos em aço inox |
| eletrodos.jpg | Eletrodos personalizados e eletroerosão |

## materiais/

Pasta antiga, não usada pelo site hoje — as fotos de material ficam em
`brand/plasticos/` (ver acima).

## hero/

Reservado para uma foto de destaque futura (ex.: hero.jpg com a fábrica ou
uma máquina em operação). Hoje o hero usa fundo gráfico (grid técnico em
CSS), sem foto.

Para trocar nomes de máquinas, textos ou caminhos de imagem, edite o arquivo
lib/data.ts na raiz do projeto.
