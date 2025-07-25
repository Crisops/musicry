import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import type { Database } from '@/types/database.types'
import type { AstroCookies } from 'astro'
import type { SupabaseClient } from '@supabase/supabase-js'

export async function createClient(
  request: Request,
  cookies: AstroCookies,
): Promise<SupabaseClient<Database, 'public'>> {
  return createServerClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '')
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookies.set(name, value, options)
          } catch (error) {
            // Silenciar errores de ResponseSentError
            if (
              error instanceof Error &&
              (error.message.includes('response has already been sent') || error.name === 'ResponseSentError')
            ) {
              return
            }
            throw error
          }
        })
      },
    },
  })
}
