import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/*
  Cliente Supabase com a service_role key — ignora RLS e pode gerenciar
  usuarios de autenticacao (auth.admin.*). So pode ser usado dentro de
  Server Actions/rotas de servidor, NUNCA importado por um componente
  client. O import "server-only" faz o build falhar se isso acontecer
  por engano.
*/
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY nao configurada. Adicione no .env.local e nas env vars da Vercel.",
    );
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
