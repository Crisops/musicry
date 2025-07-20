import { useEffect } from 'react'
import { usePresence, useAuth } from '@/hooks/use-store'

export default function PresenceProvider() {
  const user = useAuth((state) => state.user)
  const { initPresence, disconnect } = usePresence()

  useEffect(() => {
    if (!user) return

    initPresence(user)

    return () => {
      disconnect()
    }
  }, [user])

  return null
}
