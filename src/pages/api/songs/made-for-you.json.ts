import { createClient } from '@/lib/supabase/server'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request, cookies }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify(null), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const supabase = await createClient(request, cookies)

  const { data: playlist, error } = await supabase
    .from('songs')
    .select('id, title, artist, image_url, audio_url, duration, album:albums!songs_albumId_fkey(id)')
    .eq('albumId', id)

  if (error) {
    return new Response(JSON.stringify(null), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const song = playlist?.[0]

  return new Response(JSON.stringify({ song, playlist }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
