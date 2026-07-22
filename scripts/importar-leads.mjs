/*
  Gera supabase/seed_leads_planilhas.sql a partir das planilhas em /leads.
  Carga unica: cada empresa entra como lead (status 'lead'), segmentada
  por nicho conforme a planilha de origem. Guard por nome (nao duplica
  se rodar de novo ou se a empresa ja existir).

  Uso: node scripts/importar-leads.mjs
*/
import XLSX from "xlsx";
import { writeFileSync } from "fs";

const q = (v) => {
  if (v == null || v === "" || v === "—" || v === "-") return "null";
  return "'" + String(v).trim().replace(/'/g, "''").slice(0, 500) + "'";
};

const linhas = [];

function add({ nome, cnpj, telefone, email, endereco, bairro, cidade, obs, nicho, origem }) {
  if (!nome || String(nome).trim().length < 2) return;
  linhas.push(
    `insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', ${q(nome)}, ${q(cnpj)}, ${q(telefone)}, ${q(email)}, ${q(endereco)}, ${q(bairro)}, ${q(cidade ?? "Uberlândia")}, 'MG', ${nicho ? `'${nicho}'` : "null"}, ${q(origem)}, ${q(obs)},
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower(${q(nome)}));`,
  );
}

function nichoDoSegmento(seg) {
  const s = (seg ?? "").toLowerCase();
  if (s.includes("marcenar") || s.includes("móveis") || s.includes("moveis") || s.includes("madeira")) return "marcenaria";
  if (s.includes("comunica") || s.includes("gráfica") || s.includes("grafica") || s.includes("sinaliza")) return "comunicacao_visual";
  return "industria";
}

// 1. Mailing CNC (ods) — 45 leads rankeados com segmento e CNPJ
{
  const wb = XLSX.readFile("leads/Mailing_CNC_Uberlandia_Regiao.ods");
  const rows = XLSX.utils.sheet_to_json(wb.Sheets["LEADS"], { header: 1 });
  for (const r of rows.slice(1)) {
    const [, empresa, segmento, cidade, cnpj, endContato, produz, oportunidade] = r;
    if (!empresa) continue;
    add({
      nome: empresa,
      cnpj: cnpj && String(cnpj).includes("/") ? cnpj : null,
      endereco: endContato,
      cidade,
      nicho: nichoDoSegmento(segmento),
      origem: "Mailing CNC Uberlândia",
      obs: [segmento && `Segmento: ${segmento}`, produz && `Produz: ${produz}`, oportunidade && `Oportunidade: ${oportunidade}`]
        .filter(Boolean)
        .join(" | "),
    });
  }
}

// 2. Marcenarias (xlsx) — duas abas
{
  const wb = XLSX.readFile("leads/Marcenarias_Uberlandia_Prospeccao.xlsx");
  for (const r of XLSX.utils.sheet_to_json(wb.Sheets["WhatsApp Confirmado"], { header: 1 }).slice(4)) {
    const [, empresa, telefone, , siteObs] = r;
    if (!empresa) continue;
    add({ nome: empresa, telefone, nicho: "marcenaria", origem: "Prospecção marcenarias (WhatsApp)", obs: siteObs });
  }
  for (const r of XLSX.utils.sheet_to_json(wb.Sheets["Outros Contatos"], { header: 1 }).slice(4)) {
    const [, empresa, contato, siteEndObs] = r;
    if (!empresa) continue;
    const tel = contato && /\d{4}/.test(String(contato)) ? contato : null;
    add({ nome: empresa, telefone: tel, nicho: "marcenaria", origem: "Prospecção marcenarias", obs: siteEndObs });
  }
}

// 3 e 4. Comunicacao visual + outros segmentos (mesmo layout de colunas)
function importarPadrao(sheet, nicho, origem) {
  for (const r of sheet.slice(1)) {
    const [, empresa, endereco, bairro, telefone, email, site, especialidade, usoCnc, prioridade] = r;
    if (!empresa) continue;
    const emailOk = email && String(email).includes("@") ? email : null;
    add({
      nome: empresa,
      telefone: telefone != null ? String(telefone) : null,
      email: emailOk,
      endereco,
      bairro,
      nicho,
      origem,
      obs: [especialidade, site && `Site: ${site}`, usoCnc && `CNC: ${usoCnc}`, prioridade && `Prioridade: ${prioridade}`]
        .filter(Boolean)
        .join(" | "),
    });
  }
}

{
  const wb = XLSX.readFile("leads/prospeccao_comunicacao_visual_uberlandia.xlsx");
  importarPadrao(
    XLSX.utils.sheet_to_json(wb.Sheets["Prospeccao"], { header: 1 }),
    "comunicacao_visual",
    "Prospecção comunicação visual",
  );
}
{
  const wb = XLSX.readFile("leads/prospeccao_outros_segmentos_uberlandia.xlsx");
  importarPadrao(XLSX.utils.sheet_to_json(wb.Sheets["Marcenarias"], { header: 1 }), "marcenaria", "Prospecção outros segmentos");
  importarPadrao(
    XLSX.utils.sheet_to_json(wb.Sheets["Usinagem-Tornearias-CNC"], { header: 1 }),
    "industria",
    "Prospecção outros segmentos",
  );
}

const sql = `-- Gerado por scripts/importar-leads.mjs em ${new Date().toISOString().slice(0, 10)}
-- Carga unica das planilhas de prospeccao (pasta /leads). Rode DEPOIS
-- da 0005_erp_core.sql. Guard por nome: rodar de novo nao duplica.

${linhas.join("\n\n")}
`;

writeFileSync("supabase/seed_leads_planilhas.sql", sql, "utf8");
console.log(`OK: ${linhas.length} empresas geradas em supabase/seed_leads_planilhas.sql`);
