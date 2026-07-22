-- CRM Fase 2.1: estoque no catalogo de produtos.
-- Rode DEPOIS da 0002_produtos_asaas.sql. Idempotente (pode rodar de novo).
--
-- quantidade: numeric pra aceitar fracao (ex: kg de material); pra
-- maquina/servico fica 0 mesmo, nao tem estoque fisico.
-- unidade: texto livre curto ("un", "kg", "m", "chapa", "tarugo"...).

alter table public.produtos
  add column if not exists quantidade numeric not null default 0,
  add column if not exists unidade text not null default 'un';
