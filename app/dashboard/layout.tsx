import ThemeToggle from "@/components/ThemeToggle";
import AppSidebar from "@/components/dashboard/AppSidebar";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import CommandPalette from "@/components/dashboard/CommandPalette";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentProfile } from "@/lib/crm/session";
import { createClient } from "@/lib/supabase/server";

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
  const supabase = await createClient();

  // Follow-ups pendentes (hoje ou atrasados) viram badge em Negocios.
  const hoje = new Date().toISOString().slice(0, 10);
  const { count: followupsPendentes } = await supabase
    .from("negocios")
    .select("id", { count: "exact", head: true })
    .lte("proximo_contato", hoje)
    .not("etapa", "in", "(fechado,perdido)")
    .is("deleted_at", null);

  return (
    <SidebarProvider>
      <AppSidebar
        perfil={{ nome: profile.nome, email: profile.email, role: profile.role }}
        badges={{ "/dashboard/negocios": followupsPendentes ?? 0 }}
      />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 flex-none items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <Breadcrumbs />
          <div className="ml-auto flex items-center gap-2">
            <CommandPalette role={profile.role} />
            <ThemeToggle className="h-9 w-9" />
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
