import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { UserPresenceTrack } from '@/types/store.types'
import type { Tables } from '@/types/database.types'
import { useDMChat } from '@/hooks/use-dm-chat'
import { Avatar } from '@heroui/avatar'
import Message from '@/components/react/message'

interface MessageListProps {
  user: UserPresenceTrack & { isOnline: boolean }
  currentUserId: Tables<'users'>['id']
  targetUserId: Tables<'users'>['id']
}

const MessageList = ({ user, currentUserId, targetUserId }: MessageListProps) => {
  const { messages, isOtherTyping } = useDMChat(currentUserId, targetUserId)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isFirstLoadRef = useRef(true)

  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      if (isFirstLoadRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'instant', block: 'end' })
        isFirstLoadRef.current = false
      } else {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }
  }, [messages])

  return (
    <div className="grid-row-1 grid h-full">
      <div className="scrollbar scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-rich-dark-jungle overflow-y-auto">
        <div className="flex h-0 flex-col">
          <header className="flex min-h-56 w-full items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="mb-1">
                <Avatar className="size-24" src={user.avatar ?? ''} />
              </div>
              <h5 className="text-sealsalt text-small font-semibold">{user.full_name}</h5>
              <span className="text-tiny text-gray-davy">Musicry</span>
            </div>
          </header>
          <div className="flex w-full flex-col px-4">
            {messages.map((message) => (
              <Message key={message.id} message={message} currentUserId={currentUserId} />
            ))}
            <div ref={messagesEndRef} />
            <AnimatePresence propagate>
              {isOtherTyping && (
                <motion.div
                  className="flex h-10 w-full items-start justify-start"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  <motion.div
                    className="bg-rich-dark-jungle rounded-small relative h-8 w-full max-w-8"
                    initial={{ width: 0 }}
                    animate={{ width: '2rem' }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <div className="border-b-rich-dark-jungle border-l-rich-dark-jungle rounded-bl-small absolute bottom-0 -left-1 rounded-tl-xs border-t-5 border-r-5 border-b-5 border-l-5 border-t-transparent border-r-transparent" />
                    <div className="flex h-full w-full items-center justify-center gap-x-1">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <motion.span
                          key={index}
                          className="bg-sealsalt size-1 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageList
