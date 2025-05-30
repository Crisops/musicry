import { createContext, useState } from 'react'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  handleGetUserAuth: (user: User | null) => void
  handleSignOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const handleGetUserAuth = (user: User | null): void => {
    setUser(user)
  }

  const handleSignOut = async () => {
    try {
      const { status } = await fetch('/api/auth/signout')
      if (status === 200) {
        setUser(null)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, handleGetUserAuth, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
