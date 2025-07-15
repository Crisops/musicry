import { createClient } from '@/lib/supabase/server'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ cookies, request, redirect }) => {
  try {
    const supabase = await createClient(request, cookies)

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error al hacer logout:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return redirect('/')
  } catch (error) {
    console.error('Error en logout:', error)
    return redirect('/')
  }
}
