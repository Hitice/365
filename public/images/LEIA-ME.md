# Guia de imagens do site

## brand/ e catech/

- `brand/logo.png`: logotipo oficial da Catech 360, usado no header e no rodapé.
- `catech/`: imagens aproveitadas do site antigo (tech-hero, CLP1, IOT1, MONT1,
  cases1/2/3, 3d-printer, cnc-real, USI1 etc.), usadas na vitrine da Home e
  na categoria "Tecnologia" de /portfolio. Pode substituir qualquer uma
  mantendo o mesmo nome de arquivo.

Salve cada foto com o nome exato indicado abaixo (formato .jpg). Assim que o
arquivo existir, a imagem aparece automaticamente no card correspondente.
Enquanto não existir, o card mostra um placeholder com o caminho esperado.

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

## usinagem/ (usadas em /usinagem, seção "O que fabricamos")

| Arquivo | Serviço |
|---|---|
| moldes-injetaveis.jpg | Fabricação de moldes injetáveis |
| moldes-plasticos.jpg | Peças em PEAD e tecnil |
| acrilicos.jpg | Acrílicos e policarbonato |
| gabaritos.jpg | Fabricação de gabaritos |
| torno.jpg | Torneamento (buchas, engrenagens, roletes) |
| reposicao.jpg | Reposição e nacionalização de peças |
| aluminio.jpg | Usinagem de alumínio |
| gravacoes.jpg | Gravação de moldes e talões |
| baixo-relevo.jpg | Gravação em baixo e alto relevo |
| matrizes.jpg | Matrizes, punções e placas |
| carimbos.jpg | Carimbos em aço inox |
| eletrodos.jpg | Eletrodos personalizados |

## arquitetura-producao/ (usadas em /portfolio, categoria "Produção")

| Arquivo | Projeto |
|---|---|
| corte-laser.jpg | Projetos em corte a laser |
| corten.jpg | Aço corten |
| totens.jpg | Placas e totens |
| portas-acm.jpg | Portas em ACM |
| fachadas.jpg | Fachadas internas e prediais |
| letras-caixa.jpg | Letras caixa |

## arquitetura-automacao/ (usadas em /portfolio, categoria "Automação")

| Arquivo | Projeto |
|---|---|
| instalacoes.jpg | Instalações e serviços |
| biometria.jpg | Fechaduras biométricas |
| inducao.jpg | Carregadores por indução |
| moveis-inteligentes.jpg | Móveis inteligentes |
| moveis-exclusivos.jpg | Móveis exclusivos |
| projetos-arquitetos.jpg | Projetos de arquitetos |

## materiais/

Pasta reservada para uma futura página de detalhe por material. Não é usada
pelo site hoje — a página /produtos mostra o catálogo como lista de chips
(`materiaisCatalogo` em `lib/data.ts`), sem foto por material.

## hero/

Reservado para uma foto de destaque futura (ex.: hero.jpg com a fábrica ou
uma máquina em operação). Hoje o hero usa fundo gráfico, sem foto.

Para trocar nomes de máquinas, textos ou caminhos de imagem, edite o arquivo
lib/data.ts na raiz do projeto.
