import { createClient } from '@/lib/supabase/server'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = await createClient(request, cookies)
  const formData = await request.json()

  const { error } = await supabase.from('songs').insert({ ...formData })

  if (error) {
    return new Response(
      JSON.stringify({ status: 400, message: 'Error al crear la canción' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  return new Response(
    JSON.stringify({ status: 200, message: 'Canción creada correctamente' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
