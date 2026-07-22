import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import { formatarValor, labelStatusCobranca, type Cobranca } from "@/lib/crm/types";
import { gerarCobranca, sincronizarCobrancas } from "./actions";

export const metadata: Metadata = {
  title: "Financeiro",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "min-h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:border-accent-500";

type CobrancaLinha = Cobranca & { empresas: { id: string; nome_fantasia: string } | null };

const RECEBIDO = ["RECEIVED", "CONFIRMED", "RECEIVED_IN_CASH"];

export default async function FinanceiroPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const sp = await searchParams;
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const hoje = new Date().toISOString().slice(0, 10);
  const inicioMes = hoje.slice(0, 8) + "01";

  const [{ data: cobrancas }, { data: empresasAsaas }] = await Promise.all([
    supabase
      .from("cobrancas")
      .select("*, empresas ( id, nome_fantasia )")
      .order("vencimento", { ascending: false })
      .limit(100)
      .returns<CobrancaLinha[]>(),
    supabase
      .from("empresas")
      .select("id, nome_fantasia")
      .not("asaas_customer_id", "is", null)
      .is("deleted_at", null)
      .order("nome_fantasia")
      .returns<{ id: string; nome_fantasia: string }[]>(),
  ]);

  const lista = cobrancas ?? [];
  const recebidoMes = lista
    .filter((c) => RECEBIDO.includes(c.status) && (c.vencimento ?? "") >= inicioMes)
    .reduce((s, c) => s + c.valor, 0);
  const aReceber = lista
    .filter((c) => !RECEBIDO.includes(c.status) && c.status !== "REFUNDED")
    .reduce((s, c) => s + c.valor, 0);
  const vencidas = lista.filter((c) => c.status === "OVERDUE");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
            Gestão
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Financeiro</h1>
          <p className="mt-1 text-sm text-foreground-muted">Cobranças no Asaas — atualizadas por webhook.</p>
        </div>
        {profile.role === "team_leader" && (
          <form action={sincronizarCobrancas}>
            <Button type="submit" variant="secondary">
              Sincronizar cobranças
            </Button>
          </form>
        )}
      </div>

      {sp.error && (
        <p className="rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {sp.error}
        </p>
      )}
      {sp.ok && (
        <p className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground">{sp.ok}</p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recebido no mês</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{formatarValor(recebidoMes || null)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">A receber</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{formatarValor(aReceber || null)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vencidas</p>
            <p className={`mt-1 text-3xl font-bold tracking-tight ${vencidas.length > 0 ? "text-destructive" : ""}`}>
              {vencidas.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Nova cobrança</h2>
          <form action={gerarCobranca} className="mt-3 grid gap-3 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-end">
            <div>
              <label htmlFor="empresa_id" className="text-xs font-semibold text-foreground-subtle">
                Cliente (no Asaas) *
              </label>
              <select id="empresa_id" name="empresa_id" required defaultValue="" className={INPUT_CLASS}>
                <option value="" disabled>
                  Selecione
                </option>
                {(empresasAsaas ?? []).map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nome_fantasia}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="valor" className="text-xs font-semibold text-foreground-subtle">
                Valor *
              </label>
              <input id="valor" name="valor" required inputMode="decimal" placeholder="0,00" className={INPUT_CLASS} />
            </div>
            <div>
              <label htmlFor="vencimento" className="text-xs font-semibold text-foreground-subtle">
                Vencimento *
              </label>
              <input id="vencimento" name="vencimento" type="date" required className={INPUT_CLASS} />
            </div>
            <div>
              <label htmlFor="forma" className="text-xs font-semibold text-foreground-subtle">
                Forma
              </label>
              <select id="forma" name="forma" defaultValue="UNDEFINED" className={INPUT_CLASS}>
                <option value="UNDEFINED">Cliente escolhe</option>
                <option value="PIX">PIX</option>
                <option value="BOLETO">Boleto</option>
                <option value="CREDIT_CARD">Cartão</option>
              </select>
            </div>
            <Button type="submit" size="compact">
              Gerar
            </Button>
          </form>
          {(empresasAsaas ?? []).length === 0 && (
            <p className="mt-3 text-xs text-foreground-subtle">
              Nenhuma empresa cadastrada no Asaas ainda. Abra a ficha de um cliente e clique
              &quot;Cadastrar no Asaas&quot;.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-alt text-left text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Valor</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Vencimento</th>
              <th className="px-4 py-3">Fatura</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-b-0 hover:bg-surface-alt">
                <td className="px-4 py-3">
                  {c.empresas ? (
                    <Link href={`/dashboard/clientes/${c.empresas.id}`} className="text-accent-600 hover:underline">
                      {c.empresas.nome_fantasia}
                    </Link>
                  ) : (
                    <span className="text-foreground-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">{formatarValor(c.valor)}</td>
                <td className="px-4 py-3">
                  <Badge variant={RECEBIDO.includes(c.status) ? "default" : c.status === "OVERDUE" ? "destructive" : "secondary"}>
                    {labelStatusCobranca(c.status)}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-foreground-muted">
                  {c.vencimento ? new Date(`${c.vencimento}T12:00:00`).toLocaleDateString("pt-BR") : "—"}
                </td>
                <td className="px-4 py-3">
                  {c.url_fatura ? (
                    <a href={c.url_fatura} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-accent-600 hover:underline">
                      abrir
                    </a>
                  ) : (
                    <span className="text-xs text-foreground-subtle">—</span>
                  )}
                </td>
              </tr>
            ))}
            {lista.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-foreground-muted">
                  Nenhuma cobrança ainda. Gere uma acima ou sincronize com o Asaas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
