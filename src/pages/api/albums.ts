import { createClient } from '@/lib/supabase/server'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request, cookies }) => {
  const supabase = await createClient(request, cookies)
  const { data, error } = await supabase.from('albums').select('*')

  if (error) {
    return new Response(JSON.stringify(null), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
