import { createClient } from '@/lib/supabase/server'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ cookies, request }) => {
  const supabase = await createClient(request, cookies)
  await supabase.auth.signOut()
  return new Response('Exited', { status: 200 })
}
