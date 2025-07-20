import { Avatar, Badge } from '@heroui/react'
import { Music } from 'lucide-react'
import type { UserPresenceTrack } from '@/types/store.types'

interface OnlineUserProps {
  user: UserPresenceTrack & { isOnline: boolean }
  showSong: boolean
  children: React.ReactNode
}

const OnlineUserItem = ({ user, showSong, children }: OnlineUserProps) => {
  return (
    <article className="transition-background flex h-16 w-full items-center gap-x-2 px-2">
      <Badge
        content=""
        className={`${user.isOnline ? 'bg-blue-argentinian' : 'bg-gray-jet'} border-2 border-[#0d1117]`}
        placement="bottom-right"
        shape="circle"
      >
        <Avatar
          isDisabled={!user.isOnline}
          radius="full"
          size="lg"
          src={user.avatar ?? ''}
          alt={user.full_name ?? ''}
        />
      </Badge>
      <div className="flex flex-col">
        <div className="flex items-center gap-x-1.5">
          <span className={`${user.isOnline ? 'text-sealsalt' : 'text-gray-davy'} text-small font-semibold`}>
            {user.full_name}
          </span>
          {user.current_song && user.isOnline && showSong && (
            <Music className="text-blue-argentinian" size={14} strokeWidth={2} />
          )}
        </div>
        <div className="flex flex-wrap">{children}</div>
      </div>
    </article>
  )
}

export default OnlineUserItem
