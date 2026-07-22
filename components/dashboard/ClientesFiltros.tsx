"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { NICHOS } from "@/lib/crm/types";

/*
  Filtros da lista de clientes em tempo real: o texto atualiza a URL (?q=)
  enquanto se digita, com debounce, e some ao apagar — trazendo tudo de
  volta. Status e nicho aplicam na hora (onChange). Qualquer mudanca zera
  a pagina. Como a busca vive na URL, a paginacao no servidor continua
  valendo junto.
*/
const INPUT_CLASS =
  "min-h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:border-accent-500";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.1em] text-foreground-subtle";

export default function ClientesFiltros() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [, startTransition] = useTransition();
  const montado = useRef(false);

  const aplicar = (mut: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mut(params);
    params.delete("page"); // volta pra primeira pagina ao filtrar
    startTransition(() => router.replace(params.toString() ? `${pathname}?${params}` : pathname));
  };

  // Debounce da busca por texto.
  useEffect(() => {
    if (!montado.current) {
      montado.current = true;
      return;
    }
    const t = setTimeout(() => {
      aplicar((p) => {
        const termo = q.trim();
        if (termo) p.set("q", termo);
        else p.delete("q");
      });
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl bg-surface p-4 shadow-sm">
      <div className="flex flex-1 flex-col gap-1 sm:min-w-[200px]">
        <label htmlFor="q" className={LABEL_CLASS}>
          Buscar
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle" />
          <input
            id="q"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nome ou razão social..."
            className={`${INPUT_CLASS} pl-9`}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="status" className={LABEL_CLASS}>
          Status
        </label>
        <Combobox
          id="status"
          className="sm:w-44"
          value={searchParams.get("status") ?? ""}
          onChange={(v) => aplicar((p) => (v ? p.set("status", v) : p.delete("status")))}
          options={[
            { value: "", label: "Todos" },
            { value: "lead", label: "Lead" },
            { value: "cliente", label: "Cliente" },
          ]}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="nicho" className={LABEL_CLASS}>
          Nicho
        </label>
        <Combobox
          id="nicho"
          className="sm:w-56"
          value={searchParams.get("nicho") ?? ""}
          onChange={(v) => aplicar((p) => (v ? p.set("nicho", v) : p.delete("nicho")))}
          options={[{ value: "", label: "Todos" }, ...NICHOS.map((n) => ({ value: n.id, label: n.label }))]}
        />
      </div>
    </div>
  );
}
