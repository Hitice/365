-- =====================================================================
-- ERP Catech — operacoes: orcamentos, projetos, chamados de assistencia,
-- cobrancas (espelho local do Asaas) e eventos de webhook.
-- Rode DEPOIS da 0005_erp_core.sql. Idempotente.
-- =====================================================================

-- 1. orcamentos + itens ----------------------------------------------
create table if not exists public.orcamentos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  negocio_id uuid references public.negocios(id) on delete set null,
  titulo text not null,
  status text not null default 'rascunho'
    check (status in ('rascunho', 'enviado', 'aprovado', 'recusado', 'vencido')),
  validade date,
  observacoes text,
  responsavel_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.orcamento_itens (
  id uuid primary key default gen_random_uuid(),
  orcamento_id uuid not null references public.orcamentos(id) on delete cascade,
  produto_id uuid references public.produtos(id),
  descricao text not null,
  quantidade numeric not null default 1,
  unidade text not null default 'un',
  valor_unitario numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists orcamentos_empresa_idx on public.orcamentos(empresa_id);
create index if not exists orcamento_itens_orc_idx on public.orcamento_itens(orcamento_id);

-- 2. projetos ---------------------------------------------------------
create table if not exists public.projetos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  orcamento_id uuid references public.orcamentos(id) on delete set null,
  titulo text not null,
  status text not null default 'planejamento'
    check (status in ('planejamento', 'engenharia', 'producao', 'entrega', 'concluido', 'cancelado')),
  previsao_entrega date,
  observacoes text,
  responsavel_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists projetos_empresa_idx on public.projetos(empresa_id);

-- 3. chamados (assistencia tecnica) ----------------------------------
create table if not exists public.chamados (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  maquina text,
  defeito text not null,
  prioridade text not null default 'media' check (prioridade in ('baixa', 'media', 'alta')),
  status text not null default 'aberto'
    check (status in ('aberto', 'agendado', 'em_atendimento', 'aguardando_peca', 'fechado')),
  agendado_para date,
  observacoes text,
  responsavel_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists chamados_empresa_idx on public.chamados(empresa_id);

-- 4. cobrancas — espelho local dos payments do Asaas ------------------
-- Criada aqui quando geramos cobranca; atualizada por webhook.
create table if not exists public.cobrancas (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references public.empresas(id) on delete set null,
  orcamento_id uuid references public.orcamentos(id) on delete set null,
  asaas_payment_id text unique not null,
  valor numeric not null,
  status text not null default 'PENDING',
  forma text,
  vencimento date,
  url_fatura text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cobrancas_empresa_idx on public.cobrancas(empresa_id);

-- 5. webhook_eventos — todo webhook recebido, pra auditoria/replay ----
create table if not exists public.webhook_eventos (
  id bigint generated always as identity primary key,
  evento text not null,
  payload jsonb not null,
  processado boolean not null default false,
  created_at timestamptz not null default now()
);

-- 6. triggers ---------------------------------------------------------
drop trigger if exists orcamentos_set_updated_at on public.orcamentos;
create trigger orcamentos_set_updated_at before update on public.orcamentos
  for each row execute function public.set_updated_at();
drop trigger if exists projetos_set_updated_at on public.projetos;
create trigger projetos_set_updated_at before update on public.projetos
  for each row execute function public.set_updated_at();
drop trigger if exists chamados_set_updated_at on public.chamados;
create trigger chamados_set_updated_at before update on public.chamados
  for each row execute function public.set_updated_at();

drop trigger if exists audit_orcamentos on public.orcamentos;
create trigger audit_orcamentos after insert or update or delete on public.orcamentos
  for each row execute function public.fn_audit();
drop trigger if exists audit_projetos on public.projetos;
create trigger audit_projetos after insert or update or delete on public.projetos
  for each row execute function public.fn_audit();
drop trigger if exists audit_chamados on public.chamados;
create trigger audit_chamados after insert or update or delete on public.chamados
  for each row execute function public.fn_audit();

-- 7. RLS --------------------------------------------------------------
alter table public.orcamentos enable row level security;
alter table public.orcamento_itens enable row level security;
alter table public.projetos enable row level security;
alter table public.chamados enable row level security;
alter table public.cobrancas enable row level security;
alter table public.webhook_eventos enable row level security;

-- Equipe pequena: todo autenticado le e escreve operacoes; auditoria
-- registra quem fez o que. Webhook escreve via service_role (sem RLS).
do $$
declare t text;
begin
  foreach t in array array['orcamentos', 'orcamento_itens', 'projetos', 'chamados', 'cobrancas'] loop
    execute format('drop policy if exists "%s all" on public.%I', t, t);
    execute format('create policy "%s all" on public.%I for all using (auth.uid() is not null) with check (auth.uid() is not null)', t, t);
  end loop;
end $$;

drop policy if exists "webhook select" on public.webhook_eventos;
create policy "webhook select" on public.webhook_eventos for select using (public.is_team_leader());
