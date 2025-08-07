import { createClient } from '@/lib/supabase/server'
import type { TablesInsert } from '@/types/database.types'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = await createClient(request, cookies)
  const formData: TablesInsert<'albums'> = await request.json()

  const { data, error } = await supabase
    .from('albums')
    .insert(formData)
    .select('id, title, artist, image_url, release_year, songs:songs!songs_albumId_fkey(id, title)')
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

  const { data, error } = await supabase.from('albums').delete().eq('id', id).select('id, title').single()

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
