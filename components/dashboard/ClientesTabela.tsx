"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NICHOS } from "@/lib/crm/types";
import { listarEmpresas } from "@/app/dashboard/clientes/actions";
import {
  BATCH_EMPRESAS,
  type EmpresaLinha,
  type FiltrosEmpresas,
} from "@/app/dashboard/clientes/lista";

/*
  Tabela de clientes com ROLAGEM INFINITA: recebe o primeiro lote do server
  e carrega os proximos conforme a sentinela entra na area de rolagem
  (IntersectionObserver com root na propria caixa). O cabecalho fica fixo no
  topo. Quando os filtros mudam, o server troca a `key` e este componente
  remonta com o lote inicial novo — zerando o scroll.
*/
export default function ClientesTabela({
  inicial,
  filtros,
}: {
  inicial: EmpresaLinha[];
  filtros: FiltrosEmpresas;
}) {
  const [rows, setRows] = useState<EmpresaLinha[]>(inicial);
  const [carregando, setCarregando] = useState(false);
  const [fim, setFim] = useState(inicial.length < BATCH_EMPRESAS);
  const caixaRef = useRef<HTMLDivElement>(null);
  const sentinelaRef = useRef<HTMLDivElement>(null);
  const carregandoRef = useRef(false);

  const nichoLabel = (id: string | null) => NICHOS.find((n) => n.id === id)?.label ?? "—";

  const carregarMais = useCallback(async () => {
    if (carregandoRef.current || fim) return;
    carregandoRef.current = true;
    setCarregando(true);
    const novos = await listarEmpresas(filtros, rows.length, BATCH_EMPRESAS);
    setRows((r) => [...r, ...novos]);
    if (novos.length < BATCH_EMPRESAS) setFim(true);
    setCarregando(false);
    carregandoRef.current = false;
  }, [fim, filtros, rows.length]);

  useEffect(() => {
    const alvo = sentinelaRef.current;
    if (!alvo || fim) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) carregarMais();
      },
      { root: caixaRef.current, rootMargin: "240px" },
    );
    obs.observe(alvo);
    return () => obs.disconnect();
  }, [carregarMais, fim]);

  return (
    <div ref={caixaRef} className="mt-6 max-h-[70vh] overflow-auto rounded-2xl bg-surface shadow-sm">
      <table className="w-full min-w-[940px] border-collapse text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-foreground-subtle [&>th]:sticky [&>th]:top-0 [&>th]:z-10 [&>th]:bg-surface-alt [&>th]:px-4 [&>th]:py-3 [&>th]:shadow-[inset_0_-1px_0_var(--border)]">
            <th>Empresa</th>
            <th>Status</th>
            <th>Contato</th>
            <th>Nicho</th>
            <th>Cidade</th>
            <th>Asaas</th>
            <th className="text-right">Abrir</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => {
            const pessoa = e.pessoas.find((p) => !p.deleted_at);
            return (
              <tr key={e.id} className="border-b border-border last:border-b-0 hover:bg-surface-alt">
                <td className="px-4 py-3">
                  <Link
                    href={`/dashboard/clientes/${e.id}`}
                    className="font-semibold text-foreground hover:text-accent-600"
                  >
                    {e.nome_fantasia}
                  </Link>
                  {e.razao_social && e.razao_social !== e.nome_fantasia && (
                    <p className="text-xs text-foreground-muted">{e.razao_social}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={e.status === "cliente" ? "default" : "secondary"}>
                    {e.status === "cliente" ? "Cliente" : "Lead"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col text-xs">
                    {pessoa && <span className="font-medium text-foreground">{pessoa.nome}</span>}
                    {e.telefone && <span className="text-foreground-muted">{e.telefone}</span>}
                    {e.email && <span className="text-foreground-muted">{e.email}</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground-muted">{nichoLabel(e.nicho)}</td>
                <td className="px-4 py-3 text-foreground-muted">{e.cidade ?? "—"}</td>
                <td className="px-4 py-3">
                  {e.asaas_customer_id ? (
                    <span className="text-xs font-semibold text-accent-600">✓</span>
                  ) : (
                    <span className="text-xs text-foreground-subtle">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/dashboard/clientes/${e.id}`}
                    aria-label={`Abrir ${e.nome_fantasia}`}
                    title="Abrir / editar"
                    className="inline-flex size-8 items-center justify-center rounded-md text-foreground-subtle transition-colors hover:bg-surface-alt hover:text-accent-600"
                  >
                    <SquarePen className="size-4" />
                  </Link>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-sm text-foreground-muted">
                Nenhuma empresa encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!fim && (
        <div
          ref={sentinelaRef}
          className="flex items-center justify-center py-4 text-xs text-foreground-subtle"
        >
          {carregando ? "Carregando…" : ""}
        </div>
      )}
    </div>
  );
}
