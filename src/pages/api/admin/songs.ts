import { createClient } from '@/lib/supabase/server'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = await createClient(request, cookies)
  const formData = await request.json()

  const { data, error } = await supabase
    .from('songs')
    .insert({ ...formData })
    .select('id, title, artist, image_url, release_year:created_at')
    .single()

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

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const supabase = await createClient(request, cookies)
  const { id } = await request.json()

  const { data, error } = await supabase.from('songs').delete().eq('id', id).select('id, title').single()

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
