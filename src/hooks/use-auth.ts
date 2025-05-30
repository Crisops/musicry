import { AuthContext } from '@/context/auth-context'
import { use } from 'react'

export const useAuth = () => {
  const authContext = use(AuthContext)
  if (!authContext) {
    throw new Error('useAuth debe estar dentro de un AuthProvider')
  }
  return authContext
}
