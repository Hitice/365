-- =====================================================================
-- Ajuste de RLS: equipe pequena e de confianca edita a carteira toda.
-- Antes so o responsavel (ou team_leader) editava empresa/negocio, o que
-- travava o vendedor sempre que um registro estava em outro nome. Como a
-- Catech tem poucos usuarios e o audit_log registra toda alteracao (quem,
-- quando, antes/depois), liberamos edicao pra qualquer autenticado ativo.
-- Exclusao continua so com team_leader.
-- Rode DEPOIS da 0006_operacoes.sql. Idempotente.
-- =====================================================================

drop policy if exists "empresas update" on public.empresas;
create policy "empresas update" on public.empresas
  for update using (auth.uid() is not null);

drop policy if exists "negocios update" on public.negocios;
create policy "negocios update" on public.negocios
  for update using (auth.uid() is not null);
