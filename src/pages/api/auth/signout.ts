import { supabase } from '@/lib/supabase'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ cookies }) => {
  cookies.delete('sb-access-token', { path: '/' })
  cookies.delete('sb-refresh-token', { path: '/' })

  await supabase.auth.signOut()
  return new Response('Exited', { status: 200 })
}
