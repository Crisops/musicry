import { useEffect, useState, type HTMLProps } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Tables } from '@/types/database.types'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-store'
import { useDMList, type EnrichedUser } from '@/hooks/use-dm-list'
import AnimatedChatView from '@/components/react/animated-chat-view'
import OnlineUserItemDescription from '@/components/react/online-user-item-description'
import OnlineUserItem from '@/components/react/online-user-item'

interface OnlineUserListProps {
  children?: React.ReactNode
  className?: Partial<Record<'base' | 'scrollbar', HTMLProps<HTMLDivElement>['className']>>
  type: 'messages' | 'room'
  selectedUserId?: Tables<'users'>['id']
}

const OnlineUserList = ({ children: componentLoginRequired, className, type, selectedUserId }: OnlineUserListProps) => {
  const { userList } = useDMList()

  const loggedUser = useAuth((state) => state.user)
  const [selectedUser, setSelectedUser] = useState<EnrichedUser | null>(null)

  useEffect(() => {
    if (!selectedUserId || userList.length === 0 || !selectedUser) return

    const foundUser = userList.find((user) => user.user.id === selectedUserId)
    if (foundUser) setSelectedUser(foundUser)
  }, [selectedUserId, userList])

  const handleUserClick = (item: EnrichedUser) => {
    setSelectedUser(item)
  }

  const handleExitChat = () => {
    setSelectedUser(null)
  }

  if (!loggedUser) return componentLoginRequired

  return (
    <div className={cn(`grid-row-1 grid h-full`, className?.base)}>
      <div
        className={cn(
          'scrollbar scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-rich-dark-jungle overflow-y-auto',
          className?.scrollbar,
        )}
      >
        <div className="flex h-0 flex-col">
          <div className="flex h-full w-full flex-col gap-y-2">
            {userList.map((item) => (
              <OnlineUserItem
                className={{
                  root: `${selectedUser?.user.id === item.user.id ? 'bg-night' : 'transition-background hover:bg-night-alpha'} `,
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
      </div>
      <AnimatePresence mode="wait">
        {type === 'messages' && (
          <AnimatedChatView selectedUser={selectedUser} loggedUser={loggedUser} onExitChat={handleExitChat} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default OnlineUserList
