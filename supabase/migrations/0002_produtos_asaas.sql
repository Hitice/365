-- CRM Fase 2: catalogo de produtos/servicos, dados formais de cliente
-- (documento/endereco) e campo pra guardar o id do cliente no Asaas.
-- Rode DEPOIS da 0001_crm_init.sql. Idempotente (pode rodar de novo).

-- =========================================================
-- 1. produtos — catalogo separado (tipo estoque), editavel pelo
-- team_leader direto na tela /painel/produtos, sem mexer em codigo.
-- Nao tem relacao automatica com lib/data.ts do site institucional —
-- e a copia operacional do CRM, seedada uma vez abaixo.
-- =========================================================
create table if not exists public.produtos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  tipo text not null check (tipo in ('maquina', 'usinagem', 'ferramentaria', 'material')),
  descricao text,
  preco text,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.produtos enable row level security;

drop policy if exists "Autenticado ve produtos" on public.produtos;
create policy "Autenticado ve produtos" on public.produtos
  for select using (auth.uid() is not null);

drop policy if exists "Team leader gerencia produtos" on public.produtos;
create policy "Team leader gerencia produtos" on public.produtos
  for all using (public.is_team_leader());

-- =========================================================
-- 2. contatos — campos pra virar cliente de verdade (Asaas exige
-- documento; endereco e usado na cobranca/nota fiscal) + nicho, que
-- segmenta o cliente por vertical de negocio:
--   marcenaria            -> compra Router CNC, mobiliario/madeira
--   comunicacao_visual    -> compra Router CNC, ACM/acrilico/letreiros
--   industria             -> compra CNC Usinagem, moldes, usinagem, assistencia
--   transformacao         -> compra materia-prima plastica (chapas/tarugos/buchas)
-- Assistencia tecnica segue os mesmos 3 nichos de maquinas CNC.
-- =========================================================
do $$ begin
  if not exists (select 1 from pg_type where typname = 'nicho_cliente') then
    create type nicho_cliente as enum (
      'marcenaria', 'comunicacao_visual', 'industria', 'transformacao'
    );
  end if;
end $$;

alter table public.contatos
  add column if not exists documento text,
  add column if not exists endereco text,
  add column if not exists cidade text,
  add column if not exists estado text,
  add column if not exists cep text,
  add column if not exists nicho nicho_cliente,
  add column if not exists produto_id uuid references public.produtos(id),
  add column if not exists asaas_customer_id text;

create index if not exists contatos_produto_idx on public.contatos(produto_id);

-- =========================================================
-- 3. Seed do catalogo real (33 itens, copiados de lib/data.ts em
-- 2026-07-22). So insere se a tabela ainda estiver vazia — rodar de
-- novo nao duplica.
-- =========================================================
insert into public.produtos (nome, tipo, descricao, preco)
select * from (values
  -- Maquinas: CNC Usinagem
  ('CNC 300x300', 'maquina', 'Área útil 300 x 300 mm. Spindle 3 CV, Controlador DDCS V4.', 'a partir de R$ 25.000'),
  ('CNC 400x400', 'maquina', 'Área útil 400 x 400 mm. Spindle 3 CV, Controlador DDCS V4.', 'a partir de R$ 32.000'),
  ('CNC 500x500', 'maquina', 'Área útil 500 x 500 mm. Spindle 4 CV, Controlador DDCS Expert.', 'a partir de R$ 38.000'),
  -- Maquinas: Router CNC
  ('Router 3000x1500', 'maquina', 'Área útil 3000 x 1500 mm. Spindle 3 CV.', 'a partir de R$ 35.000'),
  ('Router 4000x2000', 'maquina', 'Área útil 4000 x 2000 mm. Cabeçote flutuante, motor spindle 3 CV.', 'a partir de R$ 48.000'),
  ('Router 4000x2000 Full', 'maquina', 'Área útil 4000 x 2000 mm. Cabeçote flutuante, duplo eixo Z, motor principal 4 CV, auxiliar 3 CV.', 'a partir de R$ 85.000'),
  -- Usinagem
  ('Fabricação de moldes injetáveis', 'usinagem', 'Molde completo para injeção plástica, sob projeto. Novo, réplica ou atualização.', null),
  ('Peças em PEAD, tecnil e poliacetal', 'usinagem', 'Corte, furação e fresagem de peças de desgaste, guias, batentes e chapas.', null),
  ('Corte em acrílico e policarbonato', 'usinagem', 'Corte e usinagem de precisão para proteções, visores e peças técnicas.', null),
  ('Projeto e fabricação de gabaritos', 'usinagem', 'Guias de precisão em policarbonato, acrílico ou alumínio.', null),
  ('Torneamento, engrenagens e buchas', 'usinagem', 'Buchas, engrenagens, roletes e peças rotativas em polímeros de engenharia.', null),
  ('Reposição e nacionalização de peças', 'usinagem', 'Refaz peça quebrada ou fora de linha, reproduzida localmente.', null),
  -- Ferramentaria
  ('Corte e usinagem em alumínio', 'ferramentaria', 'Corte, furação e fresagem de peças em alumínio conforme projeto.', null),
  ('Gravação de moldes e talões', 'ferramentaria', 'Texto, logo e número de série gravados no molde ou na peça.', null),
  ('Gravação em baixo e alto relevo', 'ferramentaria', 'Gravação 3D em relevo com acabamento elaborado.', null),
  ('Fabricação de matrizes, punções e placas', 'ferramentaria', 'Ferramental de corte e estampo sob medida.', null),
  ('Confecção de carimbos em aço inox', 'ferramentaria', 'Ferramentas de marcação personalizadas, resistentes à corrosão.', null),
  ('Eletrodos personalizados e eletroerosão', 'ferramentaria', 'Eletrodos industriais sob medida para eletroerosão.', null),
  -- Materiais
  ('Acrílico', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Celeron', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Fenolite', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Nylon', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Nylon Cast', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Polietileno (PEAD)', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('PEEK', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Poliacetal (POM)', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Policarbonato', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Polipropileno', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Poliestireno', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('Poliuretano', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('PVC', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('PVDF', 'material', 'Chapas, tarugos e buchas em estoque.', null),
  ('UHMW', 'material', 'Chapas, tarugos e buchas em estoque.', null)
) as seed(nome, tipo, descricao, preco)
where not exists (select 1 from public.produtos limit 1);
