import type { Tables } from '@/types/database.types'
import { createClient } from '@/lib/supabase/server'
import type { AstroCookies } from 'astro'

export const getAllSongs = async (request: Request, cookies: AstroCookies): Promise<Tables<'songs'>[]> => {
  try {
    const supabase = await createClient(request, cookies)

    const { data: songs, error } = await supabase.from('songs').select('*')

    if (error) {
      throw new Error('Error al obtener las canciones')
    }

    return songs
  } catch (error) {
    console.error(error)
    return []
  }
}
