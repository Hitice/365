"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command as CommandPrimitive } from "cmdk";
import { Building2, Search } from "lucide-react";
import { CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { buscarEmpresas, type ResultadoBusca } from "@/app/dashboard/actions";

/*
  Busca global da topbar (Ctrl+K / Cmd+K): pesquisa EMPRESAS de verdade
  por nome, com debounce, e o resultado abre num dropdown ancorado logo
  abaixo da caixa — na largura da barra, sem modal no meio da tela. Cada
  item leva pra ficha da empresa. Navegacao entre modulos e papel da
  sidebar, nao da busca.
*/
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<ResultadoBusca[]>([]);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K foca a caixa inline em vez de abrir um modal.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Clique fora fecha o dropdown.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Busca com debounce: so dispara a partir de 2 letras. Abaixo disso o
  // proprio render mostra a dica, entao nao ha estado a limpar aqui.
  useEffect(() => {
    const termo = query.trim();
    if (termo.length < 2) return;
    const t = setTimeout(async () => {
      setCarregando(true);
      const r = await buscarEmpresas(termo);
      setResultados(r);
      setCarregando(false);
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  const irPara = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      setResultados([]);
      inputRef.current?.blur();
      router.push(href);
    },
    [router],
  );

  const termo = query.trim();

  return (
    <div ref={containerRef} className="relative w-full max-w-[21rem]">
      <CommandPrimitive shouldFilter={false} className="overflow-visible bg-transparent">
        <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm transition-colors focus-within:border-accent-500">
          <Search className="size-4 flex-none text-muted-foreground" />
          <CommandPrimitive.Input
            ref={inputRef}
            value={query}
            onValueChange={setQuery}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                inputRef.current?.blur();
              }
            }}
            placeholder="Pesquisar empresas..."
            className="flex-1 bg-transparent py-2 text-foreground outline-hidden placeholder:text-muted-foreground"
          />
          <kbd className="pointer-events-none hidden rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-block">
            Ctrl K
          </kbd>
        </div>

        {open && (
          <div className="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg">
            <CommandList className="max-h-[320px]">
              {termo.length < 2 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Digite ao menos 2 letras para buscar empresas.
                </p>
              ) : carregando ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">Buscando…</p>
              ) : resultados.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Nenhuma empresa encontrada.
                </p>
              ) : (
                <CommandGroup heading="Empresas">
                  {resultados.map((e) => (
                    <CommandItem
                      key={e.id}
                      value={e.id}
                      onSelect={() => irPara(`/dashboard/clientes/${e.id}`)}
                    >
                      <Building2 className="size-4" />
                      <span className="flex-1 truncate">
                        {e.nome_fantasia}
                        {e.razao_social && e.razao_social !== e.nome_fantasia ? (
                          <span className="text-muted-foreground"> · {e.razao_social}</span>
                        ) : null}
                      </span>
                      <span className="ml-2 flex-none text-xs capitalize text-muted-foreground">
                        {e.status}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </div>
        )}
      </CommandPrimitive>
    </div>
  );
}
