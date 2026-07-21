import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/*
  Cliente Supabase para Server Components, Server Actions e Route Handlers.
  Le/escreve a sessao via cookies do Next.js. Precisa ser criado a cada
  request (nao reaproveitar entre requisicoes).
*/
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Chamado de um Server Component sem permissao de escrita;
            // o proxy.ts ja cuida de manter a sessao atualizada nesse caso.
          }
        },
      },
    },
  );
}
