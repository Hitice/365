"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { navItemsVisiveis } from "@/components/dashboard/nav";
import { logout } from "@/app/dashboard/actions";
import type { Role } from "@/lib/crm/types";

type PerfilProps = { nome: string; email: string; role: Role };

function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  return ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase() || "?";
}

export default function AppSidebar({
  perfil,
  badges = {},
}: {
  perfil: PerfilProps;
  // Contagens por rota (ex: { "/dashboard/contatos": 3 } = 3 follow-ups
  // pendentes no funil). Aumenta a percepcao de utilidade da sidebar.
  badges?: Record<string, number>;
}) {
  const pathname = usePathname();
  const grupos = navItemsVisiveis(perfil.role);

  const isAtivo = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
          <Link
            href="/dashboard"
            className="flex items-center px-2 py-1 group-data-[collapsible=icon]:hidden"
          >
            <Logo className="h-[34px]" />
          </Link>
          <SidebarTrigger className="text-sidebar-foreground" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {grupos.map((grupo) => (
          <SidebarGroup key={grupo.label}>
            <SidebarGroupLabel>{grupo.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {grupo.items.map((item) => {
                  const contagem = badges[item.href];
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isAtivo(item.href)}
                        tooltip={item.title}
                        className="[&>svg]:size-[18px]"
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {contagem != null && contagem > 0 ? (
                        <SidebarMenuBadge className="rounded-full bg-primary/15 px-1.5 font-semibold text-primary">
                          {contagem}
                        </SidebarMenuBadge>
                      ) : !item.ready ? (
                        <SidebarMenuBadge className="text-[10px] text-muted-foreground">
                          breve
                        </SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="size-8 rounded-md">
                    <AvatarFallback className="rounded-md bg-secondary text-xs font-semibold">
                      {iniciais(perfil.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate text-sm font-semibold">{perfil.nome}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {perfil.role === "team_leader" ? "Team leader" : "Vendedor"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-sm font-semibold">{perfil.nome}</p>
                  <p className="text-xs text-muted-foreground">{perfil.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    void logout();
                  }}
                >
                  <LogOut className="size-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
