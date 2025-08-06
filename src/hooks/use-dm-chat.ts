import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { debounce } from 'lodash-es'
import type { Tables } from '@/types/database.types'
import type { MessageFormData } from '@/utils/validate-rules-form'
import { useDMStore, usePresence } from '@/hooks/use-store'
import { useForm } from '@/hooks/use-form'
import type { DMMessage, UserPresenceTrack } from '@/types/store.types'

export type EnrichedMessage = DMMessage & {
  senderInfo: UserPresenceTrack | null
  recipientInfo: UserPresenceTrack | null
}

export const useDMChat = (currentUserId: Tables<'users'>['id'], targetUserId: Tables<'users'>['id']) => {
  const { openDM, closeDM, sendMessage, setTyping, getChatWithUser } = useDMStore(
    useShallow((s) => ({
      openDM: s.openDM,
      closeDM: s.closeDM,
      sendMessage: s.sendMessage,
      setTyping: s.setTyping,
      getChatWithUser: s.getChatWithUser,
    })),
  )

  const { allUsersInRoom } = usePresence(
    useShallow((s) => ({
      allUsersInRoom: s.allUsersInRoom,
    })),
  )

  const chat = getChatWithUser(targetUserId)

  const { registerField, handleSubmit, errors, isSubmitting, reset } = useForm<MessageFormData>({
    initialForm: {
      content: '',
    },
  })

  const [isTypingLocal, setIsTypingLocal] = useState(false)
  const debouncedStopTypingRef = useRef<ReturnType<typeof debounce>>(null)
  const { onChange, ...rest } = registerField('content')

  useEffect(() => {
    debouncedStopTypingRef.current = debounce(() => {
      setTyping(targetUserId, false)
      setIsTypingLocal(false)
    }, 1000)

    return () => {
      debouncedStopTypingRef.current?.cancel()
    }
  }, [targetUserId, setTyping])

  const enrichedMessages = useMemo((): EnrichedMessage[] => {
    if (!chat?.messages || !allUsersInRoom) {
      return []
    }
    return chat.messages.map((message) => ({
      ...message,
      senderInfo: allUsersInRoom[message.user_sender_id!] || null,
      recipientInfo: allUsersInRoom[message.user_recipient_id!] || null,
    }))
  }, [chat?.messages, allUsersInRoom])

  useEffect(() => {
    if (!currentUserId || !targetUserId) return
    openDM(currentUserId, targetUserId)

    return () => {
      closeDM(targetUserId)
    }
  }, [currentUserId, targetUserId])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
      onChange(e)

      if (value.length > 0 && !isTypingLocal) {
        setTyping(targetUserId, true)
        setIsTypingLocal(true)
      }

      if (value.length === 0) {
        setTyping(targetUserId, false)
        setIsTypingLocal(false)
        debouncedStopTypingRef.current?.cancel()
      } else {
        debouncedStopTypingRef.current?.()
      }
    },
    [onChange, isTypingLocal, targetUserId, setTyping],
  )

  const handleSendMessage = useCallback(
    async ({ content }: { content: Tables<'messages'>['content'] }) => {
      if (!content?.trim()) return

      try {
        reset()
        await sendMessage(targetUserId, content.trim())
        setTyping(targetUserId, false)
        setIsTypingLocal(false)
        debouncedStopTypingRef.current?.cancel()
      } catch (error) {
        console.error('Error sending message:', error)
      }
    },
    [reset, sendMessage, targetUserId, setTyping],
  )

  return {
    messages: enrichedMessages,
    isConnected: !!chat?.isSubscribed || false,
    isOtherTyping: chat?.isTyping || false,
    handleInputChange,
    handleSendMessage,
    registerField: rest,
    handleSubmit,
    errors,
    isSubmitting,
  }
}
