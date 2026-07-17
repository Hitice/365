/*
  Gera o catálogo em PDF da Catech 360 em public/catalogo-catech360.pdf.
  Usa os mesmos dados do site (lib/data.ts, via type stripping do Node).
  Rodar com: npm run catalogo
*/
import PDFDocument from "pdfkit";
import sharp from "sharp";
import { createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  maquinasProdutos,
  usinagem,
  ferramentaria,
  materiais,
  materiaisCatalogo,
  suprimentosSetores,
} from "../lib/data.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SAIDA = path.join(ROOT, "public", "catalogo-catech360.pdf");

const LARANJA = "#f2680f";
const LARANJA_ESCURO = "#d9530b";
const NAVY = "#0b1626";
const INK = "#101828";
const CINZA = "#667085";
const CINZA_CLARO = "#f2f4f7";
const BORDA = "#e4e7ec";

const A4 = { width: 595.28, height: 841.89 };
const M = 56;
const LARGURA = A4.width - M * 2;

const CONTATO = {
  fone: "+55 (34) 99117-6599",
  email: "adm.nuvem@protonmail.com",
  cidade: "Tubalina, Uberlândia - MG",
  cnpj: "CNPJ 39.914.870/0001-01",
};

const logoBuffer = await sharp(
  path.join(ROOT, "public", "images", "brand", "logo.png"),
)
  .resize({ width: 480 })
  .png()
  .toBuffer();

const doc = new PDFDocument({ size: "A4", margin: M, autoFirstPage: false });
doc.pipe(createWriteStream(SAIDA));

/* ---------- helpers ---------- */

function rodape(secao) {
  const yAntes = doc.y;
  const xAntes = doc.x;
  const margemAntes = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;

  const y = A4.height - 44;
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor(CINZA)
    .text(
      `Catech 360 · ${CONTATO.fone} · ${CONTATO.email} · ${CONTATO.cidade} · ${CONTATO.cnpj}`,
      M,
      y,
      { width: LARGURA, align: "center", lineBreak: false },
    );
  doc
    .fontSize(7.5)
    .fillColor(LARANJA_ESCURO)
    .text(secao.toUpperCase(), M, y + 12, {
      width: LARGURA,
      align: "center",
      characterSpacing: 1.5,
      lineBreak: false,
    });

  doc.page.margins.bottom = margemAntes;
  doc.y = yAntes;
  doc.x = xAntes;
}

function novaPagina(secao, titulo, subtitulo) {
  doc.addPage();
  doc.rect(0, 0, A4.width, 6).fill(LARANJA);
  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(LARANJA_ESCURO)
    .text(secao.toUpperCase(), M, 34, { characterSpacing: 2.5 });
  doc
    .font("Helvetica-Bold")
    .fontSize(21)
    .fillColor(INK)
    .text(titulo, M, 48, { width: LARGURA });
  if (subtitulo) {
    doc
      .font("Helvetica")
      .fontSize(9.5)
      .fillColor(CINZA)
      .text(subtitulo, M, doc.y + 4, { width: LARGURA, lineGap: 2 });
  }
  doc
    .moveTo(M, doc.y + 12)
    .lineTo(A4.width - M, doc.y + 12)
    .lineWidth(0.75)
    .strokeColor(BORDA)
    .stroke();
  doc.y += 24;
  rodape(secao);
  doc.font("Helvetica").fontSize(9.5).fillColor(INK);
}

function tituloBloco(texto) {
  doc
    .font("Helvetica-Bold")
    .fontSize(11.5)
    .fillColor(INK)
    .text(texto, M, doc.y, { width: LARGURA });
  doc.y += 4;
}

function itemLista(titulo, descricao, x, largura) {
  const y0 = doc.y;
  doc.circle(x + 3, y0 + 4.5, 2).fill(LARANJA);
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(INK)
    .text(titulo, x + 12, y0, { width: largura - 12 });
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(CINZA)
    .text(descricao, x + 12, doc.y + 1, { width: largura - 12, lineGap: 1.5 });
  doc.y += 8;
}

function listaDuasColunas(itens) {
  const larguraCol = (LARGURA - 20) / 2;
  const metade = Math.ceil(itens.length / 2);
  const yInicio = doc.y;
  let yMax = yInicio;

  for (const [coluna, grupo] of [
    [0, itens.slice(0, metade)],
    [1, itens.slice(metade)],
  ]) {
    const x = M + coluna * (larguraCol + 20);
    doc.y = yInicio;
    for (const item of grupo) {
      itemLista(item.titulo, item.descricao, x, larguraCol);
    }
    yMax = Math.max(yMax, doc.y);
  }
  doc.y = yMax + 4;
  doc.x = M;
}

function tabela(colunas, linhas, opcoes = {}) {
  const larguras = opcoes.larguras ?? colunas.map(() => LARGURA / colunas.length);
  const pad = 7;
  let y = doc.y;

  const linhaAltura = (celulas, fonte, tamanho) => {
    doc.font(fonte).fontSize(tamanho);
    return (
      Math.max(
        ...celulas.map((texto, i) =>
          doc.heightOfString(String(texto), { width: larguras[i] - pad * 2 }),
        ),
      ) +
      pad * 2
    );
  };

  const desenharLinha = (celulas, { header = false, zebra = false } = {}) => {
    const fonte = header ? "Helvetica-Bold" : "Helvetica";
    const tamanho = header ? 8.5 : 8.5;
    const h = linhaAltura(celulas, fonte, tamanho);
    if (header) doc.rect(M, y, LARGURA, h).fill(NAVY);
    else if (zebra) doc.rect(M, y, LARGURA, h).fill(CINZA_CLARO);
    let x = M;
    celulas.forEach((texto, i) => {
      doc
        .font(i === 0 && !header ? "Helvetica-Bold" : fonte)
        .fontSize(tamanho)
        .fillColor(header ? "#ffffff" : i === 0 ? INK : "#344054")
        .text(String(texto), x + pad, y + pad, {
          width: larguras[i] - pad * 2,
          lineGap: 1,
        });
      x += larguras[i];
    });
    y += h;
  };

  const yTopo = y;
  desenharLinha(colunas, { header: true });
  linhas.forEach((linha, i) => desenharLinha(linha, { zebra: i % 2 === 1 }));
  doc
    .rect(M, yTopo, LARGURA, y - yTopo)
    .lineWidth(0.75)
    .strokeColor(BORDA)
    .stroke();
  doc.y = y + 10;
  doc.x = M;
}

/* ---------- capa ---------- */

doc.addPage();
doc.rect(0, 0, A4.width, 10).fill(LARANJA);
doc.rect(0, A4.height - 10, A4.width, 10).fill(LARANJA);

doc.image(logoBuffer, A4.width / 2 - 60, 150, { width: 120 });

doc
  .font("Helvetica-Bold")
  .fontSize(40)
  .fillColor(INK)
  .text("Catech ", M, 300, { width: LARGURA, align: "center", continued: true })
  .fillColor(LARANJA)
  .text("360");

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor(CINZA)
  .text("INDÚSTRIA COMPLETA · UBERLÂNDIA MG", M, doc.y + 8, {
    width: LARGURA,
    align: "center",
    characterSpacing: 2,
  });

doc
  .font("Helvetica-Bold")
  .fontSize(17)
  .fillColor(INK)
  .text("Catálogo de Produtos, Serviços e Máquinas", M, 430, {
    width: LARGURA,
    align: "center",
  });

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor(CINZA)
  .text(
    "Plásticos industriais em estoque · Usinagem e moldes sob demanda · Máquinas CNC de fabricação própria",
    M + 40,
    doc.y + 10,
    { width: LARGURA - 80, align: "center", lineGap: 3 },
  );

const yContatoCapa = 690;
doc.rect(M, yContatoCapa, LARGURA, 74).fill(CINZA_CLARO);
doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor(LARANJA_ESCURO)
  .text("FALE COM A GENTE", M, yContatoCapa + 14, {
    width: LARGURA,
    align: "center",
    characterSpacing: 2,
  });
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(INK)
  .text(
    `WhatsApp ${CONTATO.fone} · ${CONTATO.email}`,
    M,
    yContatoCapa + 30,
    { width: LARGURA, align: "center" },
  )
  .fillColor(CINZA)
  .text(`${CONTATO.cidade} · ${CONTATO.cnpj} · ${new Date().getFullYear()}`, M, doc.y + 4, {
    width: LARGURA,
    align: "center",
  });

/* ---------- quem somos ---------- */

novaPagina(
  "Quem somos",
  "Nascemos da vontade de juntar tudo em um lugar só",
  "Transformamos conhecimento técnico em soluções que aumentam a eficiência, reduzem desperdícios e impulsionam a competitividade industrial.",
);

doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor("#344054")
  .text(
    "A Catech 360 reúne três frentes em uma única oficina em Uberlândia MG: revenda de plásticos industriais com estoque próprio, serviços de usinagem, moldes e ferramentaria sob demanda, e a fabricação de máquinas CNC com suporte direto de quem projetou e montou.",
    M,
    doc.y,
    { width: LARGURA, lineGap: 3 },
  )
  .moveDown(0.6)
  .text(
    "Somos uma equipe enxuta, e é por isso que conseguimos atender com rapidez o que as fábricas grandes deixam na fila: peça avulsa, reposição urgente e lote pequeno, sem pedido mínimo. Todo serviço é orçado individualmente: mande uma peça, foto ou desenho pelo WhatsApp e devolvemos o orçamento sem compromisso, com prazo e valores claros.",
    { width: LARGURA, lineGap: 3 },
  );

doc.y += 14;
const cards = [
  ["Missão", "Transformar desafios em soluções através da engenharia, tecnologia e inovação aplicada."],
  ["Visão", "Construir um futuro onde conhecimento, tecnologia e produção ampliem continuamente o potencial das pessoas e das organizações."],
];
const cardLargura = (LARGURA - 16) / 2;
const cardY = doc.y;
let cardAltura = 0;
cards.forEach(([titulo, texto], i) => {
  const x = M + i * (cardLargura + 16);
  doc.font("Helvetica").fontSize(8.5);
  const h = doc.heightOfString(texto, { width: cardLargura - 24 }) + 44;
  cardAltura = Math.max(cardAltura, h);
  doc.rect(x, cardY, cardLargura, h).fill(CINZA_CLARO);
  doc.rect(x, cardY, 3, h).fill(LARANJA);
  doc
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .fillColor(INK)
    .text(titulo, x + 14, cardY + 12);
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(CINZA)
    .text(texto, x + 14, cardY + 28, { width: cardLargura - 24, lineGap: 2 });
});
doc.y = cardY + cardAltura + 18;
doc.x = M;

tituloBloco("Números que resumem o nosso jeito de trabalhar");
doc.y += 4;
const numeros = [
  ["+5", "máquinas entregues"],
  ["17", "materiais em catálogo"],
  ["72h", "reposição recorde de peça"],
  ["0", "pedido mínimo"],
];
const numLargura = LARGURA / 4;
const numY = doc.y;
numeros.forEach(([valor, rotulo], i) => {
  const x = M + i * numLargura;
  doc.rect(x, numY, 2.5, 34).fill(LARANJA);
  doc
    .font("Helvetica-Bold")
    .fontSize(17)
    .fillColor(INK)
    .text(valor, x + 12, numY, { width: numLargura - 16 });
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(CINZA)
    .text(rotulo, x + 12, numY + 20, { width: numLargura - 16 });
});
doc.y = numY + 52;
doc.x = M;

/* ---------- 01 produtos ---------- */

novaPagina(
  "01 · Produtos",
  "Plásticos industriais em estoque",
  "Chapas, buchas e tarugos em plásticos industriais semiacabados, prontos para entrega. Quem usina internamente também pode comprar direto.",
);

tituloBloco("Guia rápido: qual material para qual peça?");
tabela(
  ["Material", "Característica", "Onde usamos"],
  materiais.map((m) => [m.nome, m.caracteristica, m.usos]),
  { larguras: [LARGURA * 0.24, LARGURA * 0.33, LARGURA * 0.43] },
);

novaPagina(
  "01 · Produtos",
  "Catálogo e aplicações",
  "Dezessete materiais em catálogo e peças técnicas para os principais setores da indústria.",
);

tituloBloco("Catálogo completo");
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor("#344054")
  .text(materiaisCatalogo.join("  ·  "), M, doc.y + 2, {
    width: LARGURA,
    lineGap: 3,
  });
doc.y += 12;

tituloBloco("Aplicações por setor");
tabela(
  ["Setor", "Peças típicas"],
  suprimentosSetores.map((s) => [s.setor, s.itens]),
  { larguras: [LARGURA * 0.38, LARGURA * 0.62] },
);
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(CINZA)
  .text(
    "Também fornecemos vedações de válvulas e cilindros hidráulicos, roldanas em nylon, poliacetal e polipropileno, e perfis guia para todos os segmentos industriais.",
    M,
    doc.y,
    { width: LARGURA, lineGap: 2 },
  );

/* ---------- 02 serviços ---------- */

novaPagina(
  "02 · Serviços",
  "Usinagem, moldes e fabricação sob demanda",
  "Todo serviço é orçado individualmente por foto, desenho ou amostra. Sem pedido mínimo.",
);

tituloBloco("Usinagem e moldes");
listaDuasColunas(usinagem);
doc.y += 6;

tituloBloco("Metal e ferramentaria");
listaDuasColunas(ferramentaria);

novaPagina(
  "02 · Serviços",
  "Manutenção e Retrofit de CNC",
  "Suporte técnico completo em Uberlândia e região, do reparo emergencial à modernização total da sua máquina.",
);

tituloBloco("Manutenção");
listaDuasColunas([
  {
    titulo: "Reparos e peças",
    descricao:
      "Diagnóstico, troca de componentes e recuperação de máquinas CNC de qualquer fabricante.",
  },
  {
    titulo: "Atendimento remoto",
    descricao:
      "Suporte por acesso remoto para configuração, parametrização e resolução rápida de falhas de software.",
  },
  {
    titulo: "Atendimento presencial",
    descricao:
      "Equipe técnica em Uberlândia e região para visitas programadas e chamados emergenciais.",
  },
]);
doc.y += 6;

tituloBloco("Retrofit");
listaDuasColunas([
  {
    titulo: "Atualização de comandos",
    descricao:
      "Migração para DDCS e controladores atuais, com ganho real de velocidade, precisão e confiabilidade.",
  },
  {
    titulo: "Nova eletrônica",
    descricao:
      "Substituição de drivers, motores e fiação por componentes modernos com peças de reposição disponíveis.",
  },
  {
    titulo: "Sua máquina valorizada",
    descricao:
      "A estrutura mecânica que você já tem passa a operar como uma máquina nova, por uma fração do custo.",
  },
]);

/* ---------- 03 máquinas ---------- */

for (const [i, produto] of maquinasProdutos.entries()) {
  novaPagina(
    `03 · Máquinas · Linha ${String(i + 1).padStart(2, "0")}`,
    produto.titulo,
    produto.descricao,
  );

  tituloBloco("Itens de série em todos os modelos");
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor("#344054")
    .text(produto.base.join("  ·  "), M, doc.y + 2, {
      width: LARGURA,
      lineGap: 3,
    });
  doc.y += 14;

  tituloBloco("Modelos e preços de referência");
  tabela(
    ["Modelo", "Área útil", "Diferenciais", "Preço"],
    produto.modelos.map((m) => [
      m.nome,
      m.area.replace("Área útil ", ""),
      m.specs.join(", "),
      m.preco,
    ]),
    {
      larguras: [LARGURA * 0.24, LARGURA * 0.2, LARGURA * 0.34, LARGURA * 0.22],
    },
  );

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(CINZA)
    .text(
      "Valores aproximados. O preço final sai junto com a cotação e o desenvolvimento do projeto, conforme a configuração escolhida. Todas as máquinas saem com inversor WEG e suporte direto de quem projetou e montou.",
      M,
      doc.y,
      { width: LARGURA, lineGap: 2 },
    );
}

/* ---------- contracapa ---------- */

doc.addPage();
doc.rect(0, 0, A4.width, A4.height).fill(NAVY);
doc.rect(0, 0, A4.width, 8).fill(LARANJA);
doc.rect(0, A4.height - 8, A4.width, 8).fill(LARANJA);

doc.image(logoBuffer, A4.width / 2 - 42, 240, { width: 84 });

doc
  .font("Helvetica-Bold")
  .fontSize(24)
  .fillColor("#ffffff")
  .text("Vamos tirar o seu projeto do papel?", M, 370, {
    width: LARGURA,
    align: "center",
  });

doc
  .font("Helvetica")
  .fontSize(10.5)
  .fillColor("#c8cdd6")
  .text(
    "Mande uma peça, foto ou desenho pelo WhatsApp e devolvemos o orçamento sem compromisso, com prazo e valores claros.",
    M + 60,
    doc.y + 12,
    { width: LARGURA - 120, align: "center", lineGap: 3 },
  );

doc
  .font("Helvetica-Bold")
  .fontSize(13)
  .fillColor(LARANJA)
  .text(`WhatsApp ${CONTATO.fone}`, M, doc.y + 26, {
    width: LARGURA,
    align: "center",
  });
doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#ffffff")
  .text(CONTATO.email, M, doc.y + 8, { width: LARGURA, align: "center" })
  .fillColor("#8a93a3")
  .text(`${CONTATO.cidade} · ${CONTATO.cnpj}`, M, doc.y + 6, {
    width: LARGURA,
    align: "center",
  })
  .text(
    "WhatsApp em horário comercial · E-mail respondido em até 24h · Atendimento remoto em todo o Brasil",
    M,
    doc.y + 18,
    { width: LARGURA, align: "center" },
  );

doc.end();
console.log(`Catálogo gerado em ${SAIDA}`);
