import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import type { Negocio, Chamado } from "@/lib/crm/types";

export const metadata: Metadata = {
  title: "Agenda",
  robots: { index: false, follow: false },
};

type NegocioAgenda = Pick<Negocio, "id" | "titulo" | "proximo_contato"> & {
  empresas: { id: string; nome_fantasia: string } | null;
};
type ChamadoAgenda = Pick<Chamado, "id" | "defeito" | "agendado_para" | "maquina"> & {
  empresas: { id: string; nome_fantasia: string } | null;
};

/*
  Agenda derivada: junta follow-ups do funil e atendimentos agendados da
  assistencia. Nada e cadastrado aqui — agendou no negocio/chamado,
  aparece aqui. (Compromissos avulsos entram numa proxima etapa.)
*/
export default async function AgendaPage() {
  await getCurrentProfile();
  const supabase = await createClient();

  const agora = new Date();
  const hoje = agora.toISOString().slice(0, 10);
  const seteDias = new Date(agora.getTime() + 7 * 86400000).toISOString().slice(0, 10);

  const [{ data: followups }, { data: chamados }] = await Promise.all([
    supabase
      .from("negocios")
      .select("id, titulo, proximo_contato, empresas ( id, nome_fantasia )")
      .not("proximo_contato", "is", null)
      .lte("proximo_contato", seteDias)
      .not("etapa", "in", "(fechado,perdido)")
      .is("deleted_at", null)
      .order("proximo_contato")
      .returns<NegocioAgenda[]>(),
    supabase
      .from("chamados")
      .select("id, defeito, maquina, agendado_para, empresas ( id, nome_fantasia )")
      .not("agendado_para", "is", null)
      .lte("agendado_para", seteDias)
      .neq("status", "fechado")
      .is("deleted_at", null)
      .order("agendado_para")
      .returns<ChamadoAgenda[]>(),
  ]);

  const dataBr = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("pt-BR");
  const rotulo = (d: string) => (d < hoje ? "atrasado" : d === hoje ? "hoje" : dataBr(d));

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
          Gestão
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">Agenda</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Follow-ups do funil e atendimentos agendados — próximos 7 dias.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Follow-ups comerciais
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(followups ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">Nada agendado. Agende próximos contatos nos negócios.</p>
            ) : (
              <ul className="divide-y divide-border">
                {(followups ?? []).map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{f.titulo}</p>
                      {f.empresas && (
                        <Link href={`/dashboard/clientes/${f.empresas.id}`} className="text-xs text-muted-foreground hover:text-primary">
                          {f.empresas.nome_fantasia}
                        </Link>
                      )}
                    </div>
                    <span
                      className={`flex-none text-xs font-semibold ${
                        f.proximo_contato! < hoje ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {rotulo(f.proximo_contato!)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Atendimentos técnicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(chamados ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum atendimento agendado.</p>
            ) : (
              <ul className="divide-y divide-border">
                {(chamados ?? []).map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {c.maquina ? `${c.maquina} · ` : ""}
                        {c.defeito}
                      </p>
                      {c.empresas && (
                        <Link href={`/dashboard/clientes/${c.empresas.id}`} className="text-xs text-muted-foreground hover:text-primary">
                          {c.empresas.nome_fantasia}
                        </Link>
                      )}
                    </div>
                    <span
                      className={`flex-none text-xs font-semibold ${
                        c.agendado_para! < hoje ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {rotulo(c.agendado_para!)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
