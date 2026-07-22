-- CRM v2: campos de gestao comercial que faltavam pro fluxo real de
-- venda B2B (padrao Agendor/Pipedrive, adaptado pra equipe pequena).
-- Rode DEPOIS da 0003_estoque.sql. Idempotente (pode rodar de novo).
--
-- valor_estimado: valor do negocio em R$ (pipeline). Numeric puro,
--   formatado so na tela.
-- proximo_contato: data do proximo follow-up. E o campo mais importante
--   de um CRM de vendas: lead sem proximo passo agendado esfria.

alter table public.contatos
  add column if not exists valor_estimado numeric,
  add column if not exists proximo_contato date;

create index if not exists contatos_proximo_contato_idx
  on public.contatos(proximo_contato);

-- updated_at automatico em todo update (antes o codigo tinha que
-- lembrar de setar na mao — boa pratica e o banco garantir).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contatos_set_updated_at on public.contatos;
create trigger contatos_set_updated_at
  before update on public.contatos
  for each row execute function public.set_updated_at();

-- Mudanca de etapa vira atividade no historico (auditoria do funil:
-- quem moveu o que e quando, sem depender do codigo lembrar de logar).
do $$ begin
  if not exists (
    select 1 from information_schema.check_constraints
    where constraint_name = 'atividades_tipo_check'
      and check_clause like '%etapa%'
  ) then
    alter table public.atividades drop constraint if exists atividades_tipo_check;
    alter table public.atividades add constraint atividades_tipo_check
      check (tipo in ('ligacao', 'email', 'portfolio_enviado', 'reuniao', 'nota', 'etapa'));
  end if;
end $$;

create or replace function public.log_mudanca_etapa()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.etapa is distinct from old.etapa then
    insert into public.atividades (contato_id, autor_id, tipo, descricao)
    values (
      new.id,
      auth.uid(),
      'etapa',
      'Etapa: ' || old.etapa || ' → ' || new.etapa
    );
  end if;
  return new;
end;
$$;

drop trigger if exists contatos_log_etapa on public.contatos;
create trigger contatos_log_etapa
  after update on public.contatos
  for each row execute function public.log_mudanca_etapa();
