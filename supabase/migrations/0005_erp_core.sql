-- =====================================================================
-- ERP Catech — nucleo comercial v2.
-- Separa o que "contatos" misturava: EMPRESA (cadastro unico, nunca
-- duplica; lead/cliente e status) + PESSOAS (contatos da empresa, por
-- funcao) + NEGOCIOS (oportunidades com etapa/valor; uma empresa pode
-- ter varios) + EVENTOS (timeline unificada) + AUDIT_LOG (auditoria
-- generica) + soft delete.
-- Migra os dados de public.contatos automaticamente. Idempotente.
-- Rode DEPOIS da 0004_crm_v2.sql.
-- =====================================================================

-- 1. empresas ---------------------------------------------------------
create table if not exists public.empresas (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'lead' check (status in ('lead', 'cliente')),
  nome_fantasia text not null,
  razao_social text,
  cnpj text,
  inscricao_estadual text,
  email text,
  telefone text,
  endereco text,
  numero text,
  bairro text,
  cidade text,
  estado text,
  cep text,
  nicho nicho_cliente,
  origem text,
  observacoes text,
  asaas_customer_id text,
  responsavel_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists empresas_status_idx on public.empresas(status);
create index if not exists empresas_cnpj_idx on public.empresas(cnpj);
create index if not exists empresas_asaas_idx on public.empresas(asaas_customer_id);

-- 2. pessoas ----------------------------------------------------------
create table if not exists public.pessoas (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  nome text not null,
  cargo text,
  funcao text not null default 'comercial'
    check (funcao in ('comercial', 'financeiro', 'engenharia', 'compras', 'outro')),
  email text,
  telefone text,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists pessoas_empresa_idx on public.pessoas(empresa_id);

-- 3. negocios ---------------------------------------------------------
create table if not exists public.negocios (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  titulo text not null,
  etapa text not null default 'novo'
    check (etapa in ('novo', 'contato', 'levantamento', 'orcamento', 'negociacao', 'fechado', 'perdido')),
  valor_estimado numeric,
  produto_id uuid references public.produtos(id),
  proximo_contato date,
  responsavel_id uuid references public.profiles(id),
  observacoes text,
  fechado_em timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists negocios_empresa_idx on public.negocios(empresa_id);
create index if not exists negocios_etapa_idx on public.negocios(etapa);
create index if not exists negocios_proximo_idx on public.negocios(proximo_contato);

-- 4. eventos (timeline) ----------------------------------------------
create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  negocio_id uuid references public.negocios(id) on delete set null,
  autor_id uuid references public.profiles(id),
  tipo text not null
    check (tipo in ('ligacao', 'email', 'portfolio_enviado', 'reuniao', 'visita', 'nota', 'etapa', 'alteracao')),
  descricao text,
  created_at timestamptz not null default now()
);

create index if not exists eventos_empresa_idx on public.eventos(empresa_id);

-- 5. audit_log generico ----------------------------------------------
create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  tabela text not null,
  registro_id uuid not null,
  autor_id uuid,
  acao text not null check (acao in ('insert', 'update', 'delete')),
  dados_anteriores jsonb,
  dados_novos jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.fn_audit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into audit_log (tabela, registro_id, autor_id, acao, dados_novos)
    values (tg_table_name, new.id, auth.uid(), 'insert', to_jsonb(new));
    return new;
  elsif tg_op = 'UPDATE' then
    insert into audit_log (tabela, registro_id, autor_id, acao, dados_anteriores, dados_novos)
    values (tg_table_name, new.id, auth.uid(), 'update', to_jsonb(old), to_jsonb(new));
    return new;
  else
    insert into audit_log (tabela, registro_id, autor_id, acao, dados_anteriores)
    values (tg_table_name, old.id, auth.uid(), 'delete', to_jsonb(old));
    return old;
  end if;
end;
$$;

drop trigger if exists audit_empresas on public.empresas;
create trigger audit_empresas after insert or update or delete on public.empresas
  for each row execute function public.fn_audit();
drop trigger if exists audit_negocios on public.negocios;
create trigger audit_negocios after insert or update or delete on public.negocios
  for each row execute function public.fn_audit();
drop trigger if exists audit_pessoas on public.pessoas;
create trigger audit_pessoas after insert or update or delete on public.pessoas
  for each row execute function public.fn_audit();

-- 6. triggers de negocio ----------------------------------------------
drop trigger if exists empresas_set_updated_at on public.empresas;
create trigger empresas_set_updated_at before update on public.empresas
  for each row execute function public.set_updated_at();
drop trigger if exists negocios_set_updated_at on public.negocios;
create trigger negocios_set_updated_at before update on public.negocios
  for each row execute function public.set_updated_at();

-- Mudanca de etapa vira evento na timeline; fechar negocio promove a
-- empresa a cliente automaticamente (lead -> cliente sem redigitar).
create or replace function public.fn_negocio_etapa()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.etapa is distinct from old.etapa then
    insert into eventos (empresa_id, negocio_id, autor_id, tipo, descricao)
    values (new.empresa_id, new.id, auth.uid(), 'etapa',
            new.titulo || ': ' || old.etapa || ' → ' || new.etapa);
    if new.etapa = 'fechado' then
      new.fechado_em := now();
      update empresas set status = 'cliente' where id = new.empresa_id and status = 'lead';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists negocios_log_etapa on public.negocios;
create trigger negocios_log_etapa before update on public.negocios
  for each row execute function public.fn_negocio_etapa();

-- 7. papeis novos em profiles (RBAC) ----------------------------------
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('team_leader', 'admin', 'comercial', 'engenharia', 'producao', 'financeiro', 'vendedor'));

-- 8. RLS --------------------------------------------------------------
alter table public.empresas enable row level security;
alter table public.pessoas enable row level security;
alter table public.negocios enable row level security;
alter table public.eventos enable row level security;
alter table public.audit_log enable row level security;

-- Todos os autenticados VEEM tudo (decisao de negocio: visao completa
-- da carteira pra equipe inteira). Edicao: responsavel ou team_leader.
drop policy if exists "empresas select" on public.empresas;
create policy "empresas select" on public.empresas for select using (auth.uid() is not null);
drop policy if exists "empresas insert" on public.empresas;
create policy "empresas insert" on public.empresas for insert with check (auth.uid() is not null);
drop policy if exists "empresas update" on public.empresas;
create policy "empresas update" on public.empresas for update
  using (responsavel_id = auth.uid() or public.is_team_leader());
drop policy if exists "empresas delete" on public.empresas;
create policy "empresas delete" on public.empresas for delete using (public.is_team_leader());

drop policy if exists "pessoas select" on public.pessoas;
create policy "pessoas select" on public.pessoas for select using (auth.uid() is not null);
drop policy if exists "pessoas all" on public.pessoas;
create policy "pessoas all" on public.pessoas for all using (auth.uid() is not null);

drop policy if exists "negocios select" on public.negocios;
create policy "negocios select" on public.negocios for select using (auth.uid() is not null);
drop policy if exists "negocios insert" on public.negocios;
create policy "negocios insert" on public.negocios for insert with check (auth.uid() is not null);
drop policy if exists "negocios update" on public.negocios;
create policy "negocios update" on public.negocios for update
  using (responsavel_id = auth.uid() or public.is_team_leader());
drop policy if exists "negocios delete" on public.negocios;
create policy "negocios delete" on public.negocios for delete using (public.is_team_leader());

drop policy if exists "eventos select" on public.eventos;
create policy "eventos select" on public.eventos for select using (auth.uid() is not null);
drop policy if exists "eventos insert" on public.eventos;
create policy "eventos insert" on public.eventos for insert with check (auth.uid() is not null);

drop policy if exists "audit select" on public.audit_log;
create policy "audit select" on public.audit_log for select using (public.is_team_leader());

-- 9. Migracao de dados: contatos -> empresas + pessoas + negocios -----
-- So roda se empresas ainda estiver vazia (nao duplica em re-run).
do $$
declare
  c record;
  v_empresa_id uuid;
  v_etapa text;
begin
  if exists (select 1 from public.empresas limit 1) then
    return;
  end if;

  for c in select * from public.contatos loop
    insert into public.empresas
      (status, nome_fantasia, razao_social, cnpj, email, telefone, endereco,
       cidade, estado, cep, nicho, origem, observacoes, asaas_customer_id,
       responsavel_id, created_at)
    values
      (case when c.etapa = 'fechado' or c.asaas_customer_id is not null
            then 'cliente' else 'lead' end,
       coalesce(nullif(c.empresa, ''), c.nome),
       nullif(c.empresa, ''),
       c.documento, c.email, c.telefone, c.endereco,
       c.cidade, c.estado, c.cep, c.nicho, c.origem, c.notas,
       c.asaas_customer_id, c.responsavel_id, c.created_at)
    returning id into v_empresa_id;

    -- Pessoa de contato (se o nome nao for so o nome da empresa)
    if c.nome is not null and c.nome <> coalesce(c.empresa, '') then
      insert into public.pessoas (empresa_id, nome, email, telefone)
      values (v_empresa_id, c.nome, c.email, c.telefone);
    end if;

    -- Negocio com a etapa mapeada pro funil novo
    v_etapa := case c.etapa
      when 'novo' then 'novo'
      when 'contato_feito' then 'contato'
      when 'portfolio_enviado' then 'orcamento'
      when 'negociando' then 'negociacao'
      when 'fechado' then 'fechado'
      when 'perdido' then 'perdido'
      else 'novo' end;

    insert into public.negocios
      (empresa_id, titulo, etapa, valor_estimado, produto_id, proximo_contato,
       responsavel_id, fechado_em, created_at)
    values
      (v_empresa_id, 'Negócio — ' || coalesce(nullif(c.empresa, ''), c.nome),
       v_etapa, c.valor_estimado, c.produto_id, c.proximo_contato,
       c.responsavel_id,
       case when c.etapa = 'fechado' then c.updated_at end,
       c.created_at);

    -- Atividades antigas viram eventos da empresa
    insert into public.eventos (empresa_id, autor_id, tipo, descricao, created_at)
    select v_empresa_id, a.autor_id,
           case when a.tipo = 'etapa' then 'etapa' else a.tipo end,
           a.descricao, a.created_at
    from public.atividades a
    where a.contato_id = c.id;
  end loop;
end $$;
