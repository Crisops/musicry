import { createClient } from '@/lib/supabase/server'
import type { AstroCookies } from 'astro'

type Song = {
  id: string
  title: string
  artist: string
  imageurl: string
  audiourl: string
  duration: number
  created_at: string
  albumid: string
}

export const getAllSongsRandom = async (request: Request, cookies: AstroCookies, limit?: number): Promise<Song[]> => {
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
