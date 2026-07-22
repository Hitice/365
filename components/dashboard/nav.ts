import {
  Building2,
  CalendarDays,
  CircleDollarSign,
  Factory,
  FileText,
  FolderKanban,
  FolderOpen,
  LayoutDashboard,
  Package,
  Settings,
  UserCog,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/crm/types";

/*
  Registro unico dos modulos do sistema. Sidebar, command palette e
  breadcrumb leem daqui — adicionar um modulo novo e mexer num lugar so.
  `ready: false` = modulo planejado (aparece na sidebar como "em breve"
  e leva a uma pagina de placeholder que explica o que vira).
*/
export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  ready: boolean;
  somenteRole?: Role;
};

export type NavGroup = { label: string; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Visão geral",
    items: [{ title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, ready: true }],
  },
  {
    label: "Comercial",
    items: [
      { title: "Clientes", href: "/dashboard/clientes", icon: Building2, ready: true },
      { title: "Orçamentos", href: "/dashboard/orcamentos", icon: FileText, ready: true },
    ],
  },
  {
    label: "Operações",
    items: [
      { title: "Projetos", href: "/dashboard/projetos", icon: FolderKanban, ready: true },
      { title: "Produção", href: "/dashboard/producao", icon: Factory, ready: false },
      { title: "Assistência", href: "/dashboard/assistencia", icon: Wrench, ready: true },
      { title: "Catálogo", href: "/dashboard/produtos", icon: Package, ready: true },
      { title: "Arquivos", href: "/dashboard/arquivos", icon: FolderOpen, ready: false },
    ],
  },
  {
    label: "Gestão",
    items: [
      { title: "Financeiro", href: "/dashboard/financeiro", icon: CircleDollarSign, ready: true },
      { title: "Agenda", href: "/dashboard/agenda", icon: CalendarDays, ready: true },
    ],
  },
  {
    label: "Administração",
    items: [
      {
        title: "Usuários",
        href: "/dashboard/usuarios",
        icon: UserCog,
        ready: true,
        somenteRole: "team_leader",
      },
      {
        title: "Configurações",
        href: "/dashboard/configuracoes",
        icon: Settings,
        ready: false,
        somenteRole: "team_leader",
      },
    ],
  },
];

// Labels de segmentos de rota pro breadcrumb (segmentos dinamicos como
// ids de contato viram "Detalhe").
export const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  negocios: "Negócios",
  clientes: "Clientes",
  orcamentos: "Orçamentos",
  projetos: "Projetos",
  producao: "Produção",
  assistencia: "Assistência",
  arquivos: "Arquivos",
  financeiro: "Financeiro",
  agenda: "Agenda",
  produtos: "Catálogo",
  usuarios: "Usuários",
  configuracoes: "Configurações",
  novo: "Novo",
  editar: "Editar",
};

export function navItemsVisiveis(role: Role): NavGroup[] {
  return NAV_GROUPS.map((grupo) => ({
    ...grupo,
    items: grupo.items.filter((item) => !item.somenteRole || item.somenteRole === role),
  })).filter((grupo) => grupo.items.length > 0);
}
