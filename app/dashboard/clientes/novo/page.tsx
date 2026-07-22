import type { Metadata } from "next";
import Button from "@/components/Button";
import { getCurrentProfile } from "@/lib/crm/session";
import { NICHOS } from "@/lib/crm/types";
import { criarEmpresa } from "../actions";

export const metadata: Metadata = {
  title: "Nova empresa",
  robots: { index: false, follow: false },
};

const INPUT_CLASS =
  "mt-1.5 min-h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-accent-500";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.15em] text-foreground-subtle";

export default async function NovaEmpresaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  await getCurrentProfile();

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-600">
        Comercial
      </p>
      <h1 className="mt-1 text-2xl font-bold text-foreground">Nova empresa</h1>

      {error && (
        <p className="mt-4 rounded-md border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm text-accent-600">
          {error}
        </p>
      )}

      <form action={criarEmpresa} className="mt-6 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nome_fantasia" className={LABEL_CLASS}>
              Nome fantasia *
            </label>
            <input id="nome_fantasia" name="nome_fantasia" type="text" required className={INPUT_CLASS} />
          </div>
          <div>
            <label htmlFor="razao_social" className={LABEL_CLASS}>
              Razão social
            </label>
            <input id="razao_social" name="razao_social" type="text" className={INPUT_CLASS} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cnpj" className={LABEL_CLASS}>
              CNPJ / CPF
            </label>
            <input id="cnpj" name="cnpj" type="text" className={INPUT_CLASS} />
          </div>
          <div>
            <label htmlFor="inscricao_estadual" className={LABEL_CLASS}>
              Inscrição estadual
            </label>
            <input id="inscricao_estadual" name="inscricao_estadual" type="text" className={INPUT_CLASS} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={LABEL_CLASS}>
              E-mail
            </label>
            <input id="email" name="email" type="email" className={INPUT_CLASS} />
          </div>
          <div>
            <label htmlFor="telefone" className={LABEL_CLASS}>
              Telefone
            </label>
            <input id="telefone" name="telefone" type="tel" className={INPUT_CLASS} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nicho" className={LABEL_CLASS}>
              Nicho
            </label>
            <select id="nicho" name="nicho" defaultValue="" className={INPUT_CLASS}>
              <option value="">Não definido</option>
              {NICHOS.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="origem" className={LABEL_CLASS}>
              Origem
            </label>
            <input id="origem" name="origem" type="text" placeholder="Indicação, prospecção..." className={INPUT_CLASS} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <div>
            <label htmlFor="endereco" className={LABEL_CLASS}>
              Endereço
            </label>
            <input id="endereco" name="endereco" type="text" className={INPUT_CLASS} />
          </div>
          <div>
            <label htmlFor="numero" className={LABEL_CLASS}>
              Número
            </label>
            <input id="numero" name="numero" type="text" className={INPUT_CLASS} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label htmlFor="bairro" className={LABEL_CLASS}>
              Bairro
            </label>
            <input id="bairro" name="bairro" type="text" className={INPUT_CLASS} />
          </div>
          <div>
            <label htmlFor="cidade" className={LABEL_CLASS}>
              Cidade
            </label>
            <input id="cidade" name="cidade" type="text" className={INPUT_CLASS} />
          </div>
          <div>
            <label htmlFor="estado" className={LABEL_CLASS}>
              UF
            </label>
            <input id="estado" name="estado" type="text" maxLength={2} className={INPUT_CLASS} />
          </div>
          <div>
            <label htmlFor="cep" className={LABEL_CLASS}>
              CEP
            </label>
            <input id="cep" name="cep" type="text" className={INPUT_CLASS} />
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-sm font-semibold text-foreground">Pessoa de contato (opcional)</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pessoa_nome" className={LABEL_CLASS}>
                Nome
              </label>
              <input id="pessoa_nome" name="pessoa_nome" type="text" className={INPUT_CLASS} />
            </div>
            <div>
              <label htmlFor="pessoa_cargo" className={LABEL_CLASS}>
                Cargo
              </label>
              <input id="pessoa_cargo" name="pessoa_cargo" type="text" className={INPUT_CLASS} />
            </div>
            <div>
              <label htmlFor="pessoa_email" className={LABEL_CLASS}>
                E-mail
              </label>
              <input id="pessoa_email" name="pessoa_email" type="email" className={INPUT_CLASS} />
            </div>
            <div>
              <label htmlFor="pessoa_telefone" className={LABEL_CLASS}>
                Telefone
              </label>
              <input id="pessoa_telefone" name="pessoa_telefone" type="tel" className={INPUT_CLASS} />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="observacoes" className={LABEL_CLASS}>
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            rows={3}
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus-visible:border-accent-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Criar empresa</Button>
          <Button href="/dashboard/clientes" variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
