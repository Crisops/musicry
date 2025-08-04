import { useEffect } from 'react'
import { usePresence, useAuth } from '@/hooks/use-store'

interface PresenceProviderProps {
  user: User
}

export default function PresenceProvider({ user }: PresenceProviderProps) {
  const { user: userFromStore, setUser } = useAuth((state) => state)
  const { initPresence, disconnect } = usePresence()

  // Inicializa el usuario primero
  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  useEffect(() => {
    if (!userFromStore) return

    initPresence(userFromStore)

    return () => {
      disconnect()
    }
  }, [userFromStore])

  return null
}
