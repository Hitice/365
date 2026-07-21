/*
  Gera o catálogo em PDF da Catech 360 em public/catalogo-catech360.pdf.
  Usa os mesmos dados do site (lib/data.ts, via type stripping do Node)
  e as mesmas fotos de public/images. Rodar com: npm run catalogo.

  Cada seção é diagramada para caber inteira na própria página; se o
  total de páginas sair do esperado, o script avisa no final.
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
  materiaisCatalogo,
} from "../lib/data.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SAIDA = path.join(ROOT, "public", "catalogo-catech360.pdf");
const ANO = 2026;

const LARANJA = "#f2680f";
const LARANJA_ESCURO = "#d9530b";
const NAVY = "#0b1626";
const INK = "#101828";
const TEXTO = "#344054";
const CINZA = "#667085";
const CINZA_CLARO = "#f2f4f7";
const BORDA = "#e4e7ec";
const FANTASMA = "#e9edf3";

const A4 = { width: 595.28, height: 841.89 };
const M = 56;
const LARGURA = A4.width - M * 2;

const CONTATO = {
  fone: "+55 (34) 99117-6599",
  email: "adm.nuvem@protonmail.com",
  cidade: "Tubalina, Uberlândia - MG",
  cnpj: "CNPJ 39.914.870/0001-01",
};

/* ---------- imagens ---------- */

function logoSvg(corMira) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="480" height="480">
  <path d="M20 5 a15 15 0 1 1 -13 7.5" fill="none" stroke="${LARANJA}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M9.3 8.6 L10.2 14.4 L4.2 11.3 Z" fill="${LARANJA}"/>
  <circle cx="20" cy="20" r="6.5" fill="none" stroke="${corMira}" stroke-width="2.5"/>
  <line x1="20" y1="11" x2="20" y2="14.5" stroke="${corMira}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="20" y1="25.5" x2="20" y2="29" stroke="${corMira}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="11" y1="20" x2="14.5" y2="20" stroke="${corMira}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="25.5" y1="20" x2="29" y2="20" stroke="${corMira}" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="20" cy="20" r="2" fill="${corMira}"/>
</svg>`;
}

const logoClaro = await sharp(Buffer.from(logoSvg(INK))).png().toBuffer();
const logoEscuro = await sharp(Buffer.from(logoSvg("#ffffff"))).png().toBuffer();

const fotoCache = new Map();
async function foto(sitePath, largura = 900) {
  const chave = `${sitePath}@${largura}`;
  if (!fotoCache.has(chave)) {
    const abs = path.join(ROOT, "public", sitePath.replace(/^\//, ""));
    fotoCache.set(
      chave,
      await sharp(abs).resize({ width: largura }).jpeg({ quality: 72 }).toBuffer(),
    );
  }
  return fotoCache.get(chave);
}

/* ---------- documento ---------- */

const doc = new PDFDocument({ size: "A4", margin: M, autoFirstPage: false });
doc.pipe(createWriteStream(SAIDA));
let paginas = 0;
doc.on("pageAdded", () => paginas++);

function faixaFoto(buf, y, h, x = M, w = LARGURA, raio = 10) {
  doc.save();
  doc.roundedRect(x, y, w, h, raio).clip();
  doc.image(buf, x, y, { cover: [w, h], align: "center", valign: "center" });
  doc.restore();
  doc.roundedRect(x, y, w, h, raio).lineWidth(0.75).strokeColor(BORDA).stroke();
}

function trilhaFotos(bufs, y, h) {
  const gap = 12;
  const w = (LARGURA - gap * (bufs.length - 1)) / bufs.length;
  bufs.forEach((buf, i) => faixaFoto(buf, y, h, M + i * (w + gap), w, 8));
}

function rodape(secao) {
  const margem = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;
  const y = A4.height - 42;
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
    .text(`${secao.toUpperCase()} · CATÁLOGO ${ANO}`, M, y + 12, {
      width: LARGURA,
      align: "center",
      characterSpacing: 1.5,
      lineBreak: false,
    });
  doc.page.margins.bottom = margem;
}

/* Cabeçalho padrão; devolve o y onde o conteúdo começa. */
function novaPagina({ secao, numero, titulo, subtitulo }) {
  doc.addPage();
  doc.rect(0, 0, A4.width, 6).fill(LARANJA);

  if (numero) {
    doc
      .font("Helvetica-Bold")
      .fontSize(88)
      .fillColor(FANTASMA)
      .text(numero, A4.width - M - 120, 22, {
        width: 120,
        align: "right",
        lineBreak: false,
      });
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(LARANJA_ESCURO)
    .text(secao.toUpperCase(), M, 36, { characterSpacing: 2.5, lineBreak: false });
  doc
    .font("Helvetica-Bold")
    .fontSize(21)
    .fillColor(INK)
    .text(titulo, M, 50, { width: LARGURA - 90 });
  let y = doc.y + 4;
  if (subtitulo) {
    doc
      .font("Helvetica")
      .fontSize(9.5)
      .fillColor(CINZA)
      .text(subtitulo, M, y, { width: LARGURA - 90, lineGap: 2 });
    y = doc.y;
  }
  y += 14;
  doc.moveTo(M, y).lineTo(A4.width - M, y).lineWidth(0.75).strokeColor(BORDA).stroke();
  rodape(secao);
  return y + 16;
}

function tituloBloco(texto, y) {
  doc
    .font("Helvetica-Bold")
    .fontSize(11.5)
    .fillColor(INK)
    .text(texto, M, y, { width: LARGURA, lineBreak: false });
  return y + 20;
}

function tabela(colunas, linhas, y, larguras) {
  const pad = 7;
  const yTopo = y;

  const altura = (celulas, fonte, tamanho) => {
    doc.font(fonte).fontSize(tamanho);
    return (
      Math.max(
        ...celulas.map((t, i) =>
          doc.heightOfString(String(t), { width: larguras[i] - pad * 2 }),
        ),
      ) +
      pad * 2
    );
  };

  const linha = (celulas, { header = false, zebra = false } = {}) => {
    const fonte = header ? "Helvetica-Bold" : "Helvetica";
    const h = altura(celulas, fonte, 8.5);
    if (header) doc.rect(M, y, LARGURA, h).fill(NAVY);
    else if (zebra) doc.rect(M, y, LARGURA, h).fill(CINZA_CLARO);
    let x = M;
    celulas.forEach((t, i) => {
      doc
        .font(i === 0 && !header ? "Helvetica-Bold" : fonte)
        .fontSize(8.5)
        .fillColor(header ? "#ffffff" : i === 0 ? INK : TEXTO)
        .text(String(t), x + pad, y + pad, {
          width: larguras[i] - pad * 2,
          lineGap: 1,
        });
      x += larguras[i];
    });
    y += h;
  };

  linha(colunas, { header: true });
  linhas.forEach((l, i) => linha(l, { zebra: i % 2 === 1 }));
  doc.rect(M, yTopo, LARGURA, y - yTopo).lineWidth(0.75).strokeColor(BORDA).stroke();
  return y + 12;
}

function listaDuasColunas(itens, y) {
  const gap = 20;
  const larguraCol = (LARGURA - gap) / 2;
  const metade = Math.ceil(itens.length / 2);
  let yMax = y;

  [itens.slice(0, metade), itens.slice(metade)].forEach((grupo, coluna) => {
    const x = M + coluna * (larguraCol + gap);
    let yc = y;
    for (const item of grupo) {
      doc.circle(x + 3, yc + 4.5, 2).fill(LARANJA);
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(INK)
        .text(item.titulo, x + 12, yc, { width: larguraCol - 12 });
      doc
        .font("Helvetica")
        .fontSize(8.5)
        .fillColor(CINZA)
        .text(item.descricao, x + 12, doc.y + 1, {
          width: larguraCol - 12,
          lineGap: 1.5,
        });
      yc = doc.y + 9;
    }
    yMax = Math.max(yMax, yc);
  });
  return yMax + 4;
}

function chips(texto, y, largura = LARGURA) {
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(TEXTO)
    .text(texto, M, y, { width: largura, lineGap: 3.5 });
  return doc.y + 12;
}

/* ==================== CAPA ==================== */

doc.addPage();
paginas = 1;
doc.rect(0, 0, A4.width, 10).fill(LARANJA);
doc.rect(0, A4.height - 10, A4.width, 10).fill(LARANJA);

doc.image(logoClaro, A4.width / 2 - 55, 74, { width: 110 });

doc.font("Helvetica-Bold").fontSize(38);
{
  const parte1 = "Catech ";
  const parte2 = "360";
  const w1 = doc.widthOfString(parte1);
  const w2 = doc.widthOfString(parte2);
  const x0 = (A4.width - (w1 + w2)) / 2;
  doc.fillColor(INK).text(parte1, x0, 208, { lineBreak: false });
  doc.fillColor(LARANJA).text(parte2, x0 + w1, 208, { lineBreak: false });
}

doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(CINZA)
  .text("INDÚSTRIA COMPLETA · UBERLÂNDIA MG", M, 258, {
    width: LARGURA,
    align: "center",
    characterSpacing: 2.5,
  });

doc
  .font("Helvetica-Bold")
  .fontSize(16)
  .fillColor(INK)
  .text("Catálogo de Produtos, Serviços e Máquinas", M, 300, {
    width: LARGURA,
    align: "center",
  });
doc
  .font("Helvetica-Bold")
  .fontSize(46)
  .fillColor(LARANJA)
  .text(String(ANO), M, 326, { width: LARGURA, align: "center" });

faixaFoto(await foto("/images/hero/cnc-usinagem.png", 1100), 430, 240);

doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(CINZA)
  .text(
    "Plásticos industriais em estoque · Usinagem e moldes sob demanda · Máquinas CNC de fabricação própria",
    M + 30,
    706,
    { width: LARGURA - 60, align: "center", lineGap: 3 },
  );

/* ==================== QUEM SOMOS ==================== */

{
  let y = novaPagina({
    secao: "Quem somos",
    titulo: "Engenharia aplicada à indústria",
    subtitulo:
      "Fabricação, usinagem CNC, plásticos de engenharia e automação industrial em uma única empresa em Uberlândia MG.",
  });

  faixaFoto(await foto("/images/catech/USI1.jpg", 1100), y, 118);
  y += 134;

  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXTO)
    .text(
      "Atendemos desde a reposição urgente de uma peça até o desenvolvimento completo de dispositivos, moldes e máquinas especiais. Peça avulsa, reposição urgente ou lote pequeno, sem pedido mínimo.",
      M,
      y,
      { width: LARGURA, lineGap: 3 },
    );
  y = doc.y + 8;
  doc.text(
    "Cada serviço é orçado a partir do seu desenho, foto ou amostra, com retorno em até 24 horas úteis.",
    M,
    y,
    { width: LARGURA, lineGap: 3 },
  );
}

/* ==================== 01 PLÁSTICOS INDUSTRIAIS ==================== */

{
  let y = novaPagina({
    secao: "01 · Plásticos Industriais",
    numero: "01",
    titulo: "Plásticos industriais em estoque",
    subtitulo:
      "Chapas, buchas e tarugos nos principais polímeros de engenharia, prontos para entrega em Uberlândia MG.",
  });

  faixaFoto(await foto("/images/catech/industry-workshop.jpg", 1100), y, 104);
  y += 122;

  y = tituloBloco("Catálogo completo", y);
  y = chips(materiaisCatalogo.join("  ·  "), y);
  y += 4;

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(CINZA)
    .text(
      "Atendemos indústria de bebidas, alimentícia, metalúrgica e de embalagens, com peças como estrelas, roscas sem fim, guias, raspadores e placas de desgaste. Também fabricamos peças técnicas sob desenho utilizando esses materiais.",
      M,
      y,
      { width: LARGURA, lineGap: 2 },
    );
}

/* ==================== 02 USINAGEM CNC ==================== */

{
  let y = novaPagina({
    secao: "02 · Usinagem CNC",
    numero: "02",
    titulo: "Peças técnicas, ferramentaria e engenharia reversa",
    subtitulo:
      "Peça avulsa, reposição urgente ou lote pequeno, sem pedido mínimo. Orçado a partir de desenho, STEP, PDF, foto ou amostra.",
  });

  trilhaFotos(
    [
      await foto("/images/usinagem/moldes-injetaveis.jpg", 600),
      await foto("/images/usinagem/gravacoes.jpg", 600),
      await foto("/images/usinagem/eletrodos.jpg", 600),
    ],
    y,
    96,
  );
  y += 114;

  y = tituloBloco("Usinagem e moldes", y);
  y = listaDuasColunas(usinagem, y);
  y += 6;

  y = tituloBloco("Metal e ferramentaria", y);
  listaDuasColunas(ferramentaria, y);
}

/* ==================== 03 MÁQUINAS ==================== */

for (const [i, produto] of maquinasProdutos.entries()) {
  let y = novaPagina({
    secao: `03 · Máquinas · Linha ${String(i + 1).padStart(2, "0")}`,
    numero: "03",
    titulo: produto.titulo,
    subtitulo: produto.descricao,
  });

  trilhaFotos(
    await Promise.all(produto.modelos.map((m) => foto(m.imagem, 600))),
    y,
    104,
  );
  y += 122;

  y = tituloBloco("Itens de série em todos os modelos", y);
  y = chips(produto.base.join("  ·  "), y);
  y += 4;

  y = tituloBloco("Modelos e preços de referência", y);
  y = tabela(
    ["Modelo", "Área útil", "Diferenciais", "Preço"],
    produto.modelos.map((m) => [
      m.nome,
      m.area.replace("Área útil ", ""),
      m.specs.join(", "),
      m.preco,
    ]),
    y,
    [LARGURA * 0.24, LARGURA * 0.2, LARGURA * 0.34, LARGURA * 0.22],
  );

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(CINZA)
    .text(
      "Valores aproximados. O preço final sai junto com a cotação e o desenvolvimento do projeto, conforme a configuração escolhida. Todas as máquinas saem com inversor WEG e suporte direto de quem projetou e montou.",
      M,
      y,
      { width: LARGURA, lineGap: 2 },
    );
}

/* ==================== 04 ASSISTÊNCIA TÉCNICA ==================== */

{
  let y = novaPagina({
    secao: "04 · Assistência Técnica",
    numero: "04",
    titulo: "Manutenção e Retrofit de CNC",
    subtitulo:
      "Reparo, retrofit e migração de comando para máquinas CNC de qualquer fabricante, com atendimento remoto e presencial.",
  });

  faixaFoto(
    await foto("/images/catech/industrial-maintenance.png", 1100),
    y,
    118,
  );
  y += 136;

  y = tituloBloco("Manutenção", y);
  y = listaDuasColunas(
    [
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
    ],
    y,
  );
  y += 8;

  y = tituloBloco("Retrofit", y);
  listaDuasColunas(
    [
      {
        titulo: "Atualização de comandos",
        descricao:
          "Migração para DDCS e controladores atuais, com ganho de velocidade e precisão.",
      },
      {
        titulo: "Nova eletrônica",
        descricao:
          "Substituição de drivers, motores e fiação por componentes com peças de reposição disponíveis.",
      },
      {
        titulo: "Estrutura aproveitada",
        descricao:
          "A mecânica que você já tem passa a operar com comando atual, por uma fração do custo de uma máquina nova.",
      },
    ],
    y,
  );
}

/* ==================== CONTRACAPA ==================== */

doc.addPage();
doc.rect(0, 0, A4.width, A4.height).fill(NAVY);
doc.rect(0, 0, A4.width, 8).fill(LARANJA);
doc.rect(0, A4.height - 8, A4.width, 8).fill(LARANJA);

doc.image(logoEscuro, A4.width / 2 - 46, 214, { width: 92 });

doc
  .font("Helvetica-Bold")
  .fontSize(24)
  .fillColor("#ffffff")
  .text("Envie seu projeto", M, 356, {
    width: LARGURA,
    align: "center",
  });

doc
  .font("Helvetica")
  .fontSize(10.5)
  .fillColor("#c8cdd6")
  .text(
    "Anexe um desenho, PDF, STEP, foto ou amostra. Em até 24 horas úteis retornamos com análise técnica e orçamento.",
    M + 60,
    398,
    { width: LARGURA - 120, align: "center", lineGap: 3 },
  );

doc
  .font("Helvetica-Bold")
  .fontSize(13)
  .fillColor(LARANJA)
  .text(`WhatsApp ${CONTATO.fone}`, M, 460, { width: LARGURA, align: "center" });
doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#ffffff")
  .text(CONTATO.email, M, 482, { width: LARGURA, align: "center" })
  .fillColor("#8a93a3")
  .text(`${CONTATO.cidade} · ${CONTATO.cnpj}`, M, 500, {
    width: LARGURA,
    align: "center",
  })
  .text(
    "WhatsApp em horário comercial · E-mail respondido em até 24h · Atendimento remoto em todo o Brasil",
    M,
    524,
    { width: LARGURA, align: "center" },
  );

doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor("#8a93a3")
  .text(`CATÁLOGO ${ANO}`, M, 760, {
    width: LARGURA,
    align: "center",
    characterSpacing: 3,
  });

doc.end();

const ESPERADO = 8;
if (paginas !== ESPERADO) {
  console.warn(
    `ATENÇÃO: ${paginas} páginas geradas (esperado ${ESPERADO}). Alguma seção estourou o espaço da página.`,
  );
} else {
  console.log(`OK: ${paginas} páginas.`);
}
console.log(`Catálogo gerado em ${SAIDA}`);
