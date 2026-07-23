import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { podeFinanceiro } from "@/lib/crm/roles";
import {
  ETAPAS_NEGOCIO,
  LABEL_EVENTO,
  formatarValor,
  type EtapaNegocio,
  type Negocio,
  type TipoEvento,
} from "@/lib/crm/types";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

type EventoRecente = {
  id: string;
  tipo: TipoEvento;
  descricao: string | null;
  created_at: string;
  empresas: { id: string; nome_fantasia: string } | null;
};

type NegocioResumo = Pick<
  Negocio,
  "id" | "titulo" | "etapa" | "valor_estimado" | "proximo_contato" | "created_at"
> & { empresas: { id: string; nome_fantasia: string } | null };

const TZ = "America/Sao_Paulo";

function saudacao(): string {
  const hora = Number(
    new Intl.DateTimeFormat("pt-BR", { hour: "numeric", hour12: false, timeZone: TZ }).format(
      new Date(),
    ),
  );
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

/*
  Dashboard operacional: o estado da empresa em 3 segundos. Resumo do
  dia em texto, KPIs grandes com contexto, pipeline visual, agenda e
  timeline. Cobrancas entram quando o modulo Financeiro (Asaas) chegar.
*/
export default async function PainelPage() {
  const profile = await getCurrentProfile();
  const verFinanceiro = podeFinanceiro(profile.role);
  const supabase = await createClient();

  const agora = new Date();
  const hoje = agora.toISOString().slice(0, 10);
  const seteDiasAtras = new Date(agora.getTime() - 7 * 86400000).toISOString();

  const [{ data: negocios }, { data: eventos }] = await Promise.all([
    supabase
      .from("negocios")
      .select("id, titulo, etapa, valor_estimado, proximo_contato, created_at, empresas ( id, nome_fantasia )")
      .is("deleted_at", null)
      .returns<NegocioResumo[]>(),
    supabase
      .from("eventos")
      .select("id, tipo, descricao, created_at, empresas ( id, nome_fantasia )")
      .order("created_at", { ascending: false })
      .limit(8)
      .returns<EventoRecente[]>(),
  ]);

  const todos = negocios ?? [];
  const abertos = todos.filter((n) => n.etapa !== "fechado" && n.etapa !== "perdido");

  const contagem = Object.fromEntries(ETAPAS_NEGOCIO.map((e) => [e.id, 0])) as Record<
    EtapaNegocio,
    number
  >;
  for (const n of todos) contagem[n.etapa] += 1;

  const followups = abertos
    .filter((n) => n.proximo_contato && n.proximo_contato <= hoje)
    .sort((a, b) => (a.proximo_contato! < b.proximo_contato! ? -1 : 1));
  const atrasados = followups.filter((n) => n.proximo_contato! < hoje).length;
  const novosSemana = todos.filter((n) => n.created_at >= seteDiasAtras).length;
  const pipeline = abertos.reduce((s, n) => s + (n.valor_estimado ?? 0), 0);
  const valorNegociacao = abertos
    .filter((n) => n.etapa === "negociacao")
    .reduce((s, n) => s + (n.valor_estimado ?? 0), 0);

  const dataLonga = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TZ,
  }).format(agora);

  const resumoDia: string[] = [];
  if (followups.length > 0) {
    resumoDia.push(
      `${followups.length} follow-up${followups.length > 1 ? "s" : ""} pra fazer${
        atrasados > 0 ? ` (${atrasados} atrasado${atrasados > 1 ? "s" : ""})` : ""
      }`,
    );
  }
  if (contagem.orcamento > 0) {
    resumoDia.push(
      `${contagem.orcamento} negócio${contagem.orcamento > 1 ? "s" : ""} na etapa orçamento`,
    );
  }
  if (contagem.negociacao > 0) {
    resumoDia.push(
      `${contagem.negociacao} em negociação${valorNegociacao > 0 ? ` (${formatarValor(valorNegociacao)})` : ""}`,
    );
  }
  if (resumoDia.length === 0) {
    resumoDia.push("nenhuma pendência no funil, bom momento pra prospectar");
  }

  const etapasFunil = ETAPAS_NEGOCIO.filter((e) => e.id !== "perdido");
  const maiorEtapa = Math.max(1, ...etapasFunil.map((e) => contagem[e.id]));

  const contextoFollowups =
    followups.length === 0
      ? "Agenda em dia"
      : atrasados > 0
        ? `${atrasados} atrasado${atrasados > 1 ? "s" : ""}`
        : "Todos pra hoje";
  const contextoNovos =
    novosSemana === 0 ? "Nenhum negócio novo esta semana" : `+${novosSemana} esta semana`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          {saudacao()}, {profile.nome.split(" ")[0]}
        </h1>
        <p className="mt-0.5 text-sm capitalize text-muted-foreground">{dataLonga}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Hoje: <span className="text-foreground">{resumoDia.join(" · ")}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="h-full">
          <CardContent className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Follow-ups
            </p>
            <p
              className={`mt-1 text-5xl font-bold tracking-tight ${
                followups.length > 0 ? "text-primary" : ""
              }`}
            >
              {followups.length}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">{contextoFollowups}</p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Leads novos
            </p>
            <p className="mt-1 text-5xl font-bold tracking-tight">{contagem.novo}</p>
            <p className="mt-1.5 text-xs text-muted-foreground">{contextoNovos}</p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Negociação
            </p>
            <p className="mt-1 text-5xl font-bold tracking-tight">{contagem.negociacao}</p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {valorNegociacao > 0 ? formatarValor(valorNegociacao) : "Sem valor estimado"}
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pipeline aberto
            </p>
            <p className="mt-1 text-4xl font-bold tracking-tight">
              {pipeline > 0 ? formatarValor(pipeline) : "R$ 0"}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {abertos.length} negócio{abertos.length === 1 ? "" : "s"} em aberto
            </p>
          </CardContent>
        </Card>
      </div>

      <div className={`grid gap-6 ${verFinanceiro ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {etapasFunil.map((etapa) => (
              <div key={etapa.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{etapa.label}</span>
                  <span className="font-semibold tabular-nums">{contagem[etapa.id]}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary/80 transition-all"
                    style={{ width: `${(contagem[etapa.id] / maiorEtapa) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Agenda de hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            {followups.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum follow-up agendado. Agende o próximo contato nos negócios
                pra nenhum esfriar.
              </p>
            ) : (
              <ul className="space-y-3">
                {followups.slice(0, 6).map((n) => (
                  <li key={n.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{n.titulo}</p>
                      {n.empresas && (
                        <Link
                          href={`/dashboard/clientes/${n.empresas.id}`}
                          className="text-xs text-muted-foreground hover:text-primary"
                        >
                          {n.empresas.nome_fantasia}
                        </Link>
                      )}
                    </div>
                    <span
                      className={`flex-none text-xs font-semibold ${
                        n.proximo_contato! < hoje ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {n.proximo_contato! < hoje ? "atrasado" : "hoje"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {verFinanceiro && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Cobranças
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start gap-3">
                <CircleDollarSign className="size-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Vencimentos, recebimentos do mês e cobranças atrasadas ficam no Financeiro.
                </p>
                <Link
                  href="/dashboard/financeiro"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Abrir Financeiro <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Últimas atividades
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!eventos || eventos.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma atividade registrada ainda. Abra uma empresa e registre uma
              ligação, visita ou envio de portfólio.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {eventos.map((ev) => (
                <li key={ev.id} className="flex items-center gap-4 py-2.5 first:pt-0 last:pb-0">
                  <span className="w-24 flex-none font-mono text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: TZ,
                    }).format(new Date(ev.created_at))}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">
                      <span className="font-medium">{LABEL_EVENTO[ev.tipo] ?? ev.tipo}</span>
                      {ev.empresas && (
                        <>
                          {" · "}
                          <Link
                            href={`/dashboard/clientes/${ev.empresas.id}`}
                            className="text-primary hover:underline"
                          >
                            {ev.empresas.nome_fantasia}
                          </Link>
                        </>
                      )}
                      {ev.descricao && (
                        <span className="text-muted-foreground"> · {ev.descricao}</span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
