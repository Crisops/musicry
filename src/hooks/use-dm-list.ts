import { useEffect, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useAuth, useDMStore, usePresence } from './use-store'
import type { DMMessage, UserPresenceTrack } from '@/types/store.types'

export type EnrichedUser = {
  user: UserPresenceTrack & { isOnline: boolean }
  last_message: DMMessage
  last_message_at: string | null
}

export const useDMList = (): { userList: EnrichedUser[] } => {
  const { allUsersInRoom } = usePresence(
    useShallow((s) => ({
      allUsersInRoom: s.allUsersInRoom,
    })),
  )

  const loggedUser = useAuth((state) => state.user)

  const { activeChats, cleanup } = useDMStore(
    useShallow((s) => ({
      activeChats: s.activeChats,
      cleanup: s.cleanup,
    })),
  )

  const userList = useMemo(() => {
    return Object.entries(allUsersInRoom ?? {})
      .filter(([userId]) => userId !== loggedUser?.id)
      .map(([userId, user]) => {
        const chat = activeChats[userId]
        return {
          user: {
            ...user,
            isOnline: user.isOnline ?? false,
          },
          last_message: chat?.messages[chat?.messages.length - 1] || null,
          last_message_at: chat?.lastMessageAt,
        }
      })
      .sort((a, b) => {
        const aTime = a.last_message_at ? new Date(a.last_message_at).getTime() : 0
        const bTime = b.last_message_at ? new Date(b.last_message_at).getTime() : 0
        return bTime - aTime
      })
  }, [allUsersInRoom, activeChats, loggedUser?.id])

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [])

  return {
    userList,
  }
}
