import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/types/database.types'
import type { AstroCookies } from 'astro'

export const getAllSongsRandom = async (
  request: Request,
  cookies: AstroCookies,
  limit?: number,
): Promise<Tables<'songs'>[]> => {
  try {
    const supabase = await createClient(request, cookies)

    const { data: songs, error } = await supabase.rpc('get_random_songs_with_album', { song_limit: limit })

    if (error) {
      throw new Error('Error al obtener las canciones')
    }

    return songs
  } catch (error) {
    console.error(error)
    return []
  }
}
