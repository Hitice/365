"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { navItemsVisiveis } from "@/components/dashboard/nav";
import type { Role } from "@/lib/crm/types";

/*
  Pesquisa global + navegacao por teclado (Ctrl+K / Cmd+K), padrao
  Linear/Vercel. Por enquanto navega entre modulos e acoes rapidas;
  quando os modulos crescerem, passa a buscar registros (contatos,
  orcamentos...) via server.
*/
export default function CommandPalette({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const grupos = navItemsVisiveis(role);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const irPara = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-full max-w-64 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent"
      >
        <Search className="size-4 flex-none" />
        <span className="flex-1 text-left">Pesquisar...</span>
        <kbd className="pointer-events-none hidden rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium sm:inline-block">
          Ctrl K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Pesquisa" description="Pesquisar no sistema">
        <CommandInput placeholder="Ir para módulo ou executar ação..." />
        <CommandList>
          <CommandEmpty>Nada encontrado.</CommandEmpty>
          <CommandGroup heading="Ações rápidas">
            <CommandItem onSelect={() => irPara("/dashboard/clientes/novo")}>
              <Plus className="size-4" />
              Nova empresa
            </CommandItem>
            {role === "team_leader" && (
              <CommandItem onSelect={() => irPara("/dashboard/produtos/novo")}>
                <Plus className="size-4" />
                Novo produto
              </CommandItem>
            )}
          </CommandGroup>
          <CommandSeparator />
          {grupos.map((grupo) => (
            <CommandGroup key={grupo.label} heading={grupo.label}>
              {grupo.items.map((item) => (
                <CommandItem key={item.href} onSelect={() => irPara(item.href)}>
                  <item.icon className="size-4" />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
