import { useAuth, usePresence } from '@/hooks/use-store'
import { formatLastSeen } from '@/utils/format-last-seen'

import OnlineUserItem from '@/components/react/online-user-item'

interface OnlineUserListProps {
  children?: React.ReactNode
}

const OnlineUserList = ({ children: componentLoginRequired }: OnlineUserListProps) => {
  const { allUsersInRoom } = usePresence()
  const loggedUser = useAuth((state) => state.user)

  if (!loggedUser) return componentLoginRequired

  return (
    <div className="grid-row-1 grid h-full">
      <div className="scrollbar scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-rich-dark-jungle overflow-y-auto">
        <div className="flex h-0 flex-col">
          <div className="flex h-full w-full flex-col gap-y-2">
            {Object.entries(allUsersInRoom ?? {}).map(([key, user]) => (
              <OnlineUserItem key={key} user={user} showSong>
                <p className="text-gray-davy text-tiny text-balance">
                  {user.isOnline && user.current_song ? (
                    <>
                      <span className="text-blue-silver animate-pulse">Escuchando</span>
                      {` ${user.current_song?.title} - ${user.current_song?.artist}`}
                    </>
                  ) : (
                    <>
                      {user.id !== loggedUser.id && !user.isOnline && (
                        <span>Ultima vez visto {formatLastSeen(user?.last_seen ?? '')}</span>
                      )}
                    </>
                  )}
                </p>
              </OnlineUserItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineUserList
