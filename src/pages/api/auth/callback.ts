import type { APIRoute } from 'astro'
import { createClient } from '@/lib/supabase/server'

export const GET: APIRoute = async ({ url, cookies, redirect, request }) => {
  const authCode = url.searchParams.get('code')

  if (!authCode) {
    return new Response('No se proporcionó ningún código', { status: 400 })
  }

  const supabase = await createClient(request, cookies)
  const { error } = await supabase.auth.exchangeCodeForSession(authCode)

  if (error) {
    return new Response(error.message, { status: 500 })
  }

  return redirect('/')
}
