import type { Tables } from '@/types/database.types'
import { createClient } from '@/lib/supabase/server'
import type { AstroCookies } from 'astro'
import type { TrackAlbumPageColumns } from '@/types/track'

export const getAllAlbums = async (
  request: Request,
  cookies: AstroCookies,
  limit?: number,
): Promise<Tables<'albums'>[]> => {
  try {
    const supabase = await createClient(request, cookies)

    let query = supabase.from('albums').select('*')

    if (limit) {
      query = query.limit(limit)
    }

    const { data: albums, error } = await query

    if (error) {
      throw new Error('Error al obtener los álbumes')
    }

    return albums
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getAlbumById = async (
  request: Request,
  cookies: AstroCookies,
  id: Tables<'albums'>['id'],
): Promise<TrackAlbumPageColumns | null> => {
  try {
    const supabase = await createClient(request, cookies)

    const { data: album, error } = await supabase
      .from('albums')
      .select(
        'id, title, artist, imageUrl, release_year:releaseYear, songs:songs!songs_albumId_fkey(id, title, artist, imageUrl, duration, release_year:created_at)',
      )
      .eq('id', id)
      .single()

    if (error) {
      throw new Error('Error al obtener el álbum')
    }

    return album
  } catch (error) {
    console.error(error)
    return null
  }
}
