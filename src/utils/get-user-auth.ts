import { supabase } from '@/lib/supabase'

export const getUserAuth = async () => {
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
  }
}
