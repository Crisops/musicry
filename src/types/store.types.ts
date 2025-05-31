import type { User } from '@supabase/supabase-js'

export type UserAuthStore = {
  user: User | null
  isAdmin: boolean
  setUser: (user: User | null) => void
  setIsAdmin: (isAdmin: boolean) => void
}
