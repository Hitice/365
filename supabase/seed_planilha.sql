-- Carga unica dos leads da planilha de prospeccao (Google Sheets, importado
-- em 2026-07-22 — NAO fica sincronizado, foi so pra pegar os dados uma vez).
-- Rode DEPOIS de 0001_crm_init.sql e 0002_produtos_asaas.sql.
-- NAO e idempotente de proposito: rode uma unica vez. Revise os dados
-- abaixo antes de rodar.

insert into public.contatos (nome, empresa, telefone, email, origem, etapa, notas, responsavel_id)
select v.nome, v.empresa, v.telefone, v.email, 'Planilha de prospecção', 'portfolio_enviado', v.notas,
       (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
from (values
  ('kelly', 'Repet Emb e frascos', '34984197573', 'suporte@repet.ind.br',
    'Visita técnica e envio de portfólio realizados.'),
  ('Edilene', 'SuperSol Ind. e Com.', '34998715241', 'compras2@supersol.com.br',
    'Visita técnica e envio de portfólio realizados.'),
  ('Lara', '4Planet', null, 'laracaetano@4planet.com.br',
    'Visita técnica e envio de portfólio realizados.'),
  ('Fernando', 'Emplastic', '34997319821', 'fernandocompras@emplastic.com.br',
    'Visita técnica e envio de portfólio realizados.'),
  ('Lourival', 'Plastilar', null, 'lourival@plastilar.com',
    'Visita técnica e envio de portfólio realizados.'),
  ('Felipe', 'Brasil Borrachas', null, 'felipe@brasilborrachas.com.br',
    'Visita técnica e envio de portfólio realizados. Interesse: moldes para artefatos de borracha, facas e gabaritos de corte.'),
  ('Guilherme', 'Paratudo', '32283813', 'manutencao@paratudo.com.br',
    'Visita técnica e envio de portfólio realizados. Interesse: possibilidade de vendas e manutenção.'),
  ('Noemi', 'AvaCosmeticos', null, 'qualidade@ayacosmeticos.com.br',
    'Visita técnica e envio de portfólio realizados. Interesse: peças de envase (estrelas, guias, roscas) em PEAD; gabaritos para frascos de clientes.'),
  ('Deusmir', 'Hlr Telhas', '34997776482', null,
    'Visita técnica e envio de portfólio realizados. Interesse: matrizes e gabaritos, peças de reposição.'),
  ('Leidiane', 'Tm Maquinas', '3432153288', null,
    'Visita técnica e envio de portfólio realizados. Interesse: usinagem terceirizada (overflow), buchas e peças em PEAD para máquinas.'),
  ('Safe Ind (Uberaba)', 'Safe Ind (Uberaba)', null, 'compras@safe.ind.br',
    'Visita técnica e envio de portfólio realizados. Interesse: molde acessível para pequenas séries.')
) as v(nome, empresa, telefone, email, notas);
