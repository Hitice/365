import "server-only";

/*
  Camada base de acesso ao Asaas. Nenhuma tela consome a API direto —
  tudo passa por aqui e pelos modulos irmaos (customers, payments...).

  Producao: https://api.asaas.com/v3
  Sandbox:  https://sandbox.asaas.com/api/v3
*/
export const ASAAS_BASE_URL = "https://api.asaas.com/v3";

export type Resultado<T> = { ok: true; data: T } | { ok: false; error: string };

function apiKey(): string | null {
  return process.env.ASAAS_API_KEY ?? null;
}

function mensagemErro(json: unknown, status: number): string {
  const erros = (json as { errors?: { description?: string }[] } | null)?.errors;
  if (erros?.length) return erros.map((e) => e.description).filter(Boolean).join(" ");
  return `Erro na API do Asaas (status ${status}).`;
}

// Wrapper unico de fetch: injeta a chave, trata erro no formato do Asaas
// e devolve sempre um Resultado tipado (nunca lanca).
export async function asaasFetch<T>(
  caminho: string,
  init?: RequestInit,
): Promise<Resultado<T>> {
  const key = apiKey();
  if (!key) return { ok: false, error: "ASAAS_API_KEY não configurada." };

  let res: Response;
  try {
    res = await fetch(`${ASAAS_BASE_URL}${caminho}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        access_token: key,
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch {
    return { ok: false, error: "Não foi possível conectar ao Asaas." };
  }

  const json = await res.json().catch(() => null);
  if (!res.ok) return { ok: false, error: mensagemErro(json, res.status) };
  return { ok: true, data: json as T };
}

// Coleta todas as paginas de um endpoint de listagem do Asaas.
export async function asaasListAll<T>(
  caminho: string,
  extraQuery = "",
): Promise<Resultado<T[]>> {
  const itens: T[] = [];
  let offset = 0;
  const limit = 100;

  for (let pagina = 0; pagina < 100; pagina++) {
    const sep = caminho.includes("?") ? "&" : "?";
    const r = await asaasFetch<{ data: T[]; hasMore: boolean }>(
      `${caminho}${sep}limit=${limit}&offset=${offset}${extraQuery}`,
    );
    if (!r.ok) return r;
    itens.push(...(r.data.data ?? []));
    if (!r.data.hasMore) break;
    offset += limit;
  }
  return { ok: true, data: itens };
}

export function somenteDigitos(v: string | null | undefined): string {
  return (v ?? "").replace(/\D/g, "");
}
