import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import EtapaSelect from "@/components/dashboard/EtapaSelect";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/session";
import {
  FUNCOES_PESSOA,
  LABEL_EVENTO,
  NICHOS,
  TIPOS_EVENTO_MANUAIS,
  formatarValor,
  type Empresa,
  type Evento,
  type Negocio,
  type Pessoa,
  type Produto,
} from "@/lib/crm/types";
import {
  adicionarPessoa,
  arquivarEmpresa,
  atualizarEmpresa,
  cadastrarEmpresaAsaas,
  criarNegocio,
  registrarEvento,
  removerPessoa,
} from "../actions";

export const metadata: Metadata = {
  title: "Cliente",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle";

type EventoComAutor = Evento & { profiles: { nome: string } | null };

/*
  Ficha do cliente: o hub do sistema. Dados, pessoas, negocios e
  timeline num lugar so; orcamentos/arquivos/cobrancas plugam aqui
  quando os modulos chegarem.
*/
export default async function ClienteFichaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const { data: empresa } = await supabase
    .from("empresas")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single<Empresa>();
  if (!empresa) notFound();

  const [{ data: pessoas }, { data: negocios }, { data: eventos }, { data: produtos }] =
    await Promise.all([
      supabase.from("pessoas").select("*").eq("empresa_id", id).is("deleted_at", null).order("created_at").returns<Pessoa[]>(),
      supabase.from("negocios").select("*").eq("empresa_id", id).is("deleted_at", null).order("created_at", { ascending: false }).returns<Negocio[]>(),
      supabase.from("eventos").select("*, profiles ( nome )").eq("empresa_id", id).order("created_at", { ascending: false }).limit(30).returns<EventoComAutor[]>(),
      supabase.from("produtos").select("id, nome, tipo").eq("ativo", true).order("nome").returns<Pick<Produto, "id" | "nome" | "tipo">[]>(),
    ]);

  const atualizarComId = atualizarEmpresa.bind(null, id);
  const criarNegocioComId = criarNegocio.bind(null, id);
  const registrarEventoComId = registrarEvento.bind(null, id);
  const adicionarPessoaComId = adicionarPessoa.bind(null, id);

  return (
    <div>
      <Link href="/dashboard/clientes" className="text-sm text-foreground-muted hover:text-accent-600">
        ← Clientes
      </Link>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{empresa.nome_fantasia}</h1>
            <Badge variant={empresa.status === "cliente" ? "default" : "secondary"}>
              {empresa.status === "cliente" ? "Cliente" : "Lead"}
            </Badge>
          </div>
          {empresa.razao_social && empresa.razao_social !== empresa.nome_fantasia && (
            <p className="mt-1 text-sm text-foreground-muted">{empresa.razao_social}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {empresa.asaas_customer_id ? (
            <a
              href={`https://www.asaas.com/customer/show?customer=${empresa.asaas_customer_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center rounded-md border border-border-strong bg-border px-3 text-xs font-semibold text-foreground hover:bg-border-strong"
            >
              Abrir no Asaas
            </a>
          ) : (
            <form action={cadastrarEmpresaAsaas.bind(null, id)}>
              <Button type="submit" size="compact" variant="secondary">
                Cadastrar no Asaas
              </Button>
            </form>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Coluna 1: dados + pessoas */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">Dados cadastrais</h2>
            <form action={atualizarComId} className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome_fantasia" className={LABEL_CLASS}>Nome fantasia *</label>
                  <input id="nome_fantasia" name="nome_fantasia" required defaultValue={empresa.nome_fantasia} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="razao_social" className={LABEL_CLASS}>Razão social</label>
                  <input id="razao_social" name="razao_social" defaultValue={empresa.razao_social ?? ""} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="cnpj" className={LABEL_CLASS}>CNPJ / CPF</label>
                  <input id="cnpj" name="cnpj" defaultValue={empresa.cnpj ?? ""} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="inscricao_estadual" className={LABEL_CLASS}>Inscrição estadual</label>
                  <input id="inscricao_estadual" name="inscricao_estadual" defaultValue={empresa.inscricao_estadual ?? ""} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="email" className={LABEL_CLASS}>E-mail</label>
                  <input id="email" name="email" type="email" defaultValue={empresa.email ?? ""} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="telefone" className={LABEL_CLASS}>Telefone</label>
                  <input id="telefone" name="telefone" defaultValue={empresa.telefone ?? ""} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="nicho" className={LABEL_CLASS}>Nicho</label>
                  <select id="nicho" name="nicho" defaultValue={empresa.nicho ?? ""} className={INPUT_CLASS}>
                    <option value="">Não definido</option>
                    {NICHOS.map((n) => (
                      <option key={n.id} value={n.id}>{n.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="origem" className={LABEL_CLASS}>Origem</label>
                  <input id="origem" name="origem" defaultValue={empresa.origem ?? ""} className={INPUT_CLASS} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
                <div>
                  <label htmlFor="endereco" className={LABEL_CLASS}>Endereço</label>
                  <input id="endereco" name="endereco" defaultValue={empresa.endereco ?? ""} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="numero" className={LABEL_CLASS}>Número</label>
                  <input id="numero" name="numero" defaultValue={empresa.numero ?? ""} className={INPUT_CLASS} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <label htmlFor="bairro" className={LABEL_CLASS}>Bairro</label>
                  <input id="bairro" name="bairro" defaultValue={empresa.bairro ?? ""} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="cidade" className={LABEL_CLASS}>Cidade</label>
                  <input id="cidade" name="cidade" defaultValue={empresa.cidade ?? ""} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="estado" className={LABEL_CLASS}>UF</label>
                  <input id="estado" name="estado" maxLength={2} defaultValue={empresa.estado ?? ""} className={INPUT_CLASS} />
                </div>
                <div>
                  <label htmlFor="cep" className={LABEL_CLASS}>CEP</label>
                  <input id="cep" name="cep" defaultValue={empresa.cep ?? ""} className={INPUT_CLASS} />
                </div>
              </div>
              <div>
                <label htmlFor="observacoes" className={LABEL_CLASS}>Observações</label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  rows={3}
                  defaultValue={empresa.observacoes ?? ""}
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus-visible:border-accent-500"
                />
              </div>
              <Button type="submit" size="compact">Salvar</Button>
            </form>

            {profile.role === "team_leader" && (
              <form action={arquivarEmpresa} className="mt-4 border-t border-border pt-3">
                <input type="hidden" name="empresa_id" value={empresa.id} />
                <button type="submit" className="text-sm font-medium text-accent-600 hover:underline">
                  Arquivar empresa
                </button>
              </form>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">Pessoas</h2>
            {(pessoas ?? []).length > 0 && (
              <ul className="mt-3 divide-y divide-border">
                {(pessoas ?? []).map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {p.nome}
                        {p.cargo && <span className="font-normal text-foreground-muted"> · {p.cargo}</span>}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {FUNCOES_PESSOA.find((f) => f.id === p.funcao)?.label}
                        {p.telefone ? ` · ${p.telefone}` : ""}
                        {p.email ? ` · ${p.email}` : ""}
                      </p>
                    </div>
                    <form action={removerPessoa}>
                      <input type="hidden" name="pessoa_id" value={p.id} />
                      <input type="hidden" name="empresa_id" value={empresa.id} />
                      <button type="submit" className="text-xs text-foreground-subtle hover:text-accent-600">
                        remover
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <form action={adicionarPessoaComId} className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <input name="nome" placeholder="Nome *" required className={INPUT_CLASS.replace("mt-1.5 ", "")} />
              <input name="cargo" placeholder="Cargo" className={INPUT_CLASS.replace("mt-1.5 ", "")} />
              <select name="funcao" defaultValue="comercial" className={INPUT_CLASS.replace("mt-1.5 ", "")}>
                {FUNCOES_PESSOA.map((f) => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
              <input name="telefone" placeholder="Telefone" className={INPUT_CLASS.replace("mt-1.5 ", "")} />
              <input name="email" type="email" placeholder="E-mail" className={INPUT_CLASS.replace("mt-1.5 ", "")} />
              <Button type="submit" size="compact">Adicionar pessoa</Button>
            </form>
          </div>
        </div>

        {/* Coluna 2: negocios + timeline */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">Negócios</h2>
            {(negocios ?? []).length > 0 ? (
              <ul className="mt-3 divide-y divide-border">
                {(negocios ?? []).map((n) => (
                  <li key={n.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{n.titulo}</p>
                      <p className="text-xs text-foreground-muted">
                        {formatarValor(n.valor_estimado)}
                        {n.proximo_contato
                          ? ` · próx: ${new Date(`${n.proximo_contato}T12:00:00`).toLocaleDateString("pt-BR")}`
                          : ""}
                      </p>
                    </div>
                    <EtapaSelect negocioId={n.id} etapaAtual={n.etapa} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-foreground-muted">Nenhum negócio ainda.</p>
            )}
            <form action={criarNegocioComId} className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <input name="titulo" placeholder="Título do negócio *" required className={`${INPUT_CLASS.replace("mt-1.5 ", "")} sm:col-span-2`} />
              <input name="valor_estimado" inputMode="decimal" placeholder="Valor (R$)" className={INPUT_CLASS.replace("mt-1.5 ", "")} />
              <input name="proximo_contato" type="date" className={INPUT_CLASS.replace("mt-1.5 ", "")} />
              <select name="produto_id" defaultValue="" className={`${INPUT_CLASS.replace("mt-1.5 ", "")} sm:col-span-2`}>
                <option value="">Produto de interesse (opcional)</option>
                {(produtos ?? []).map((p) => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
              <Button type="submit" size="compact">Novo negócio</Button>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">Registrar contato</h2>
            <form action={registrarEventoComId} className="mt-3 space-y-3">
              <select name="tipo" defaultValue="ligacao" className={INPUT_CLASS.replace("mt-1.5 ", "")}>
                {TIPOS_EVENTO_MANUAIS.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
              <textarea
                name="descricao"
                rows={2}
                placeholder="Ex: Ligou pedindo prazo do molde"
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus-visible:border-accent-500"
              />
              <Button type="submit" size="compact">Registrar</Button>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">Timeline</h2>
            {(eventos ?? []).length === 0 ? (
              <p className="mt-2 text-sm text-foreground-muted">Nenhum evento ainda.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border">
                {(eventos ?? []).map((ev) => (
                  <li key={ev.id} className="py-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground">
                        {LABEL_EVENTO[ev.tipo] ?? ev.tipo}
                      </p>
                      <span className="flex-none text-xs text-foreground-subtle">
                        {new Date(ev.created_at).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    {ev.descricao && <p className="mt-0.5 text-sm text-foreground-muted">{ev.descricao}</p>}
                    {ev.profiles && <p className="mt-0.5 text-xs text-foreground-subtle">por {ev.profiles.nome}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-dashed border-border bg-surface p-6">
            <p className="text-sm text-foreground-muted">
              <span className="font-semibold text-foreground">Orçamentos, arquivos e cobranças</span>{" "}
              desta empresa aparecem aqui quando os módulos chegarem — tudo já foi
              modelado pra plugar nesta ficha.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
