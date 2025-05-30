import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export const getUserAuth = async (): Promise<User | null> => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (!user || error) {
      throw new Error(
        'Error. Fallo el proceso de obtener la sesión del usuario',
      )
    }

    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
