import { useEffect, useRef, useState, type HTMLProps } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Tables } from '@/types/database.types'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-store'
import { useDMList, type EnrichedUser } from '@/hooks/use-dm-list'
import AnimatedChatView from '@/components/react/animated-chat-view'
import EmptyMessages from '@/components/react/empty-messages'
import OnlineUserItemDescription from '@/components/react/online-user-item-description'
import OnlineUserItem from '@/components/react/online-user-item'

interface OnlineUserListProps {
  children?: React.ReactNode
  className?: Partial<Record<'scrollbar', HTMLProps<HTMLDivElement>['className']>>
  type: 'messages' | 'room'
  selectedUserId?: Tables<'users'>['id']
}

const OnlineUserList = ({ children: componentLoginRequired, className, type, selectedUserId }: OnlineUserListProps) => {
  const { userList } = useDMList()

  const loggedUser = useAuth((state) => state.user)
  const [selectedUser, setSelectedUser] = useState<EnrichedUser | null>(null)
  const userClosedChatRef = useRef<boolean>(false)

  useEffect(() => {
    if (!selectedUser && userClosedChatRef.current) return
    if (selectedUserId && !selectedUser) {
      const foundUser = userList.find((user) => user.user.id === selectedUserId)
      if (foundUser) {
        setSelectedUser(foundUser)
      }
    }
  }, [selectedUser, userList])

  const handleUserClick = (item: EnrichedUser) => {
    setSelectedUser(item)
    userClosedChatRef.current = false
    window.history.pushState({}, '', `/messages/${item.user.id}`)
  }

  const handleExitChat = () => {
    setSelectedUser(null)
    userClosedChatRef.current = true
    window.history.pushState({}, '', '/messages')
  }

  if (!loggedUser) return componentLoginRequired

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className={`grid-row-1 flex h-full`}
      >
        <motion.div
          initial={false}
          animate={{
            width: type === 'messages' && selectedUser ? 0 : 'auto',
          }}
          transition={{
            duration: 0.3,
            ease: [0.32, 0.72, 0, 1],
          }}
          className={cn(
            'h-[calc(100vh-56px-env(safe-area-inset-bottom))] overflow-hidden lg:h-[calc(100vh-190px)]',
            type === 'messages' && selectedUser ? 'w-0' : 'w-[80px] lg:max-xl:w-[70px] xl:w-[320px]',
          )}
        >
          <div
            className={cn(
              'w-20 lg:max-xl:w-18 xl:w-80',
              `scrollbar scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-rich-dark-jungle h-full overflow-y-auto`,
              className?.scrollbar,
            )}
          >
            <div className="flex min-h-full flex-col gap-y-2">
              {userList.map((item) => (
                <OnlineUserItem
                  className={{
                    root: `${selectedUser?.user.id === item.user.id ? 'bg-night' : 'transition-background hover:bg-night-alpha'} `,
                    wrapperInfoUser: 'hidden xl:flex',
                  }}
                  key={item.user.id}
                  user={item.user}
                  showIconSong={false}
                  onUserClick={type === 'messages' ? () => handleUserClick(item) : undefined}
                >
                  <OnlineUserItemDescription
                    user={item.user}
                    loggedUserId={loggedUser?.id!}
                    type={type}
                    enrichedUser={item}
                  />
                </OnlineUserItem>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait" propagate>
            {type === 'messages' && selectedUser ? (
              <AnimatedChatView selectedUser={selectedUser} loggedUser={loggedUser} onExitChat={handleExitChat} />
            ) : type === 'messages' ? (
              <EmptyMessages />
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnlineUserList
