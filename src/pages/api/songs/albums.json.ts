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

  const { data: songData, error: songError } = await supabase
    .from('songs')
    .select('id, title, artist, imageUrl, audioUrl, duration, album:albums!songs_albumId_fkey(id)')
    .eq('id', id)
    .single()

  if (songError || !songData?.album) {
    return new Response(JSON.stringify(null), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const { data: playlist, error: playlistError } = await supabase
    .from('songs')
    .select('id, title, artist, imageUrl, audioUrl, duration, album:albums!songs_albumId_fkey(id)')
    .eq('albumId', songData.album.id)

  if (playlistError) {
    return new Response(JSON.stringify(null), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return new Response(JSON.stringify({ song: songData, playlist }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
