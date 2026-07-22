"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export type ComboboxOption = { value: string; label: string };

/*
  Select pesquisavel padrao do dashboard: o popup sempre nasce com a largura
  do proprio campo (--radix-popover-trigger-width) e traz um filtro de busca
  no topo. Serve tanto controlado (value/onChange) quanto dentro de forms de
  server action (name/defaultValue -> escreve um input hidden). Substitui os
  <select> nativos, cujo popup nao acompanha o tema nem tem busca.
*/
export function Combobox({
  options,
  value: valueProp,
  defaultValue = "",
  onChange,
  name,
  id,
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  emptyText = "Nada encontrado.",
  className,
  disabled,
}: {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue);
  const value = valueProp !== undefined ? valueProp : internal;
  const selected = options.find((o) => o.value === value);

  const escolher = (v: string) => {
    if (valueProp === undefined) setInternal(v);
    onChange?.(v);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          disabled={disabled}
          className={cn(
            "flex min-h-10 w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-3 text-sm text-foreground transition-colors hover:border-border-strong focus-visible:border-accent-500 focus-visible:outline-none data-[state=open]:border-accent-500 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className="size-4 flex-none opacity-60" />
        </button>
      </PopoverTrigger>
      {name && <input type="hidden" name={name} value={value} />}
      <PopoverContent
        align="start"
        sideOffset={6}
        className="dashboard-theme w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem key={o.value} value={o.label} onSelect={() => escolher(o.value)}>
                  <span className="flex-1 truncate">{o.label}</span>
                  <Check
                    className={cn(
                      "size-4 flex-none text-accent-600",
                      o.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
