import ThemeToggle from "@/components/ThemeToggle";
import AppSidebar from "@/components/dashboard/AppSidebar";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import CommandPalette from "@/components/dashboard/CommandPalette";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentProfile } from "@/lib/crm/session";

/*
  Shell do sistema interno: sidebar de modulos (colapsavel), topbar com
  breadcrumb + pesquisa global (Ctrl+K) + tema. O profile e buscado uma
  vez aqui e distribuido; cada pagina cuida so do proprio conteudo.
*/
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  return (
    <SidebarProvider className="dashboard-theme">
      <AppSidebar perfil={{ nome: profile.nome, email: profile.email, role: profile.role }} />
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-10 flex h-14 flex-none items-center gap-3 px-4">
          <Breadcrumbs />
          <div className="ml-auto flex items-center gap-2">
            <CommandPalette />
            <ThemeToggle className="h-9 w-9" />
          </div>
        </header>
        <main className="flex-1 px-4 pb-10 pt-2 sm:px-6 lg:px-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
