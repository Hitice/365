-- CRM interno da Catech 360: profiles, contatos, atividades + RLS.
-- Rode este arquivo inteiro de uma vez no SQL Editor do Supabase
-- (Dashboard > SQL Editor > New query > colar tudo > Run).
-- Idempotente: pode rodar de novo sem quebrar nada (usa "if not exists"
-- e "or replace" onde possivel).

-- =========================================================
-- 1. profiles — estende auth.users com nome/role/status
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null,
  role text not null default 'vendedor' check (role in ('team_leader', 'vendedor')),
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

-- Cria a linha em profiles automaticamente quando um usuario novo eh
-- criado (seja pelo CRUD de usuarios, seja manualmente no dashboard).
-- Le nome/role de raw_user_meta_data, que a Server Action de criacao
-- de usuario preenche.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nome, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', new.email),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'vendedor')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- 2. contatos — a carteira / mailing (leads e clientes)
-- =========================================================
create table if not exists public.contatos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  empresa text,
  email text,
  telefone text,
  origem text,
  etapa text not null default 'novo'
    check (etapa in ('novo', 'contato_feito', 'portfolio_enviado', 'negociando', 'fechado', 'perdido')),
  responsavel_id uuid references public.profiles(id),
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contatos_responsavel_idx on public.contatos(responsavel_id);
create index if not exists contatos_etapa_idx on public.contatos(etapa);

-- =========================================================
-- 3. atividades — historico de interacao por contato
-- =========================================================
create table if not exists public.atividades (
  id uuid primary key default gen_random_uuid(),
  contato_id uuid not null references public.contatos(id) on delete cascade,
  autor_id uuid references public.profiles(id),
  tipo text not null check (tipo in ('ligacao', 'email', 'portfolio_enviado', 'reuniao', 'nota')),
  descricao text,
  created_at timestamptz not null default now()
);

create index if not exists atividades_contato_idx on public.atividades(contato_id);

-- =========================================================
-- 4. Row Level Security
-- =========================================================
alter table public.profiles enable row level security;
alter table public.contatos enable row level security;
alter table public.atividades enable row level security;

-- Funcao helper (security definer) pra checar se o usuario logado eh
-- team_leader sem cair em recursao de RLS (profiles consultando profiles).
create or replace function public.is_team_leader()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'team_leader'
  );
$$;

-- profiles
drop policy if exists "Usuario ve o proprio perfil" on public.profiles;
create policy "Usuario ve o proprio perfil" on public.profiles
  for select using (auth.uid() = id or public.is_team_leader());

drop policy if exists "Team leader gerencia perfis" on public.profiles;
create policy "Team leader gerencia perfis" on public.profiles
  for all using (public.is_team_leader());

-- contatos
drop policy if exists "Ve contatos proprios ou todos se team_leader" on public.contatos;
create policy "Ve contatos proprios ou todos se team_leader" on public.contatos
  for select using (responsavel_id = auth.uid() or public.is_team_leader());

drop policy if exists "Autenticado cria contato" on public.contatos;
create policy "Autenticado cria contato" on public.contatos
  for insert with check (auth.uid() is not null);

drop policy if exists "Edita contatos proprios ou todos se team_leader" on public.contatos;
create policy "Edita contatos proprios ou todos se team_leader" on public.contatos
  for update using (responsavel_id = auth.uid() or public.is_team_leader());

drop policy if exists "Team leader apaga contatos" on public.contatos;
create policy "Team leader apaga contatos" on public.contatos
  for delete using (public.is_team_leader());

-- atividades (visibilidade espelha o contato pai)
drop policy if exists "Ve atividades de contatos visiveis" on public.atividades;
create policy "Ve atividades de contatos visiveis" on public.atividades
  for select using (
    exists (
      select 1 from public.contatos c
      where c.id = contato_id
        and (c.responsavel_id = auth.uid() or public.is_team_leader())
    )
  );

drop policy if exists "Cria atividade em contato visivel" on public.atividades;
create policy "Cria atividade em contato visivel" on public.atividades
  for insert with check (
    exists (
      select 1 from public.contatos c
      where c.id = contato_id
        and (c.responsavel_id = auth.uid() or public.is_team_leader())
    )
  );

-- =========================================================
-- 4b. Backfill: cria profile pra qualquer usuario que ja existia
-- antes desta migracao (ex: a conta que voce ja usa pra logar).
-- O trigger acima so pega usuarios criados DAQUI PRA FRENTE.
-- =========================================================
insert into public.profiles (id, nome, email, role)
select id, coalesce(raw_user_meta_data->>'nome', email), email, 'vendedor'
from auth.users
on conflict (id) do nothing;

-- =========================================================
-- 5. Bootstrap: torna o usuario existente (Pedro) team_leader.
-- Troque o e-mail abaixo pelo e-mail com que voce ja fez login,
-- depois rode so este UPDATE (o resto do arquivo pode rodar de novo
-- sem problema, mas isso aqui so precisa uma vez).
-- =========================================================
-- update public.profiles set role = 'team_leader' where email = 'SEU_EMAIL_AQUI';
