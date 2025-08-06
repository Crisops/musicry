import type { HTMLProps } from 'react'
import { navigate } from 'astro:transitions/client'
import { Music } from 'lucide-react'
import { Avatar, Badge } from '@heroui/react'
import type { UserPresenceTrack } from '@/types/store.types'
import { cn } from '@/lib/utils'

interface OnlineUserProps {
  user: UserPresenceTrack & { isOnline: boolean }
  showIconSong: boolean
  children: React.ReactNode
  className?: Partial<Record<'root' | 'wrapperInfoUser', HTMLProps<HTMLDivElement>['className']>>
  avatarSize?: 'sm' | 'md' | 'lg'
  onUserClick?: () => void
}

const OnlineUserItem = ({
  user,
  showIconSong,
  children,
  className,
  avatarSize = 'lg',
  onUserClick,
}: OnlineUserProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (window.location.pathname.startsWith('/messages')) {
      onUserClick?.()
      return
    }
    navigate(`/messages/${user.id}`)
  }

  return (
    <a onClick={handleClick}>
      <article className={cn(`flex h-16 w-full cursor-pointer items-center gap-x-2 px-2 py-3`, className?.root)}>
        <Badge
          content=""
          className={`${user.isOnline ? 'bg-blue-argentinian' : 'bg-gray-jet'} border-2 border-[#0d1117]`}
          placement="bottom-right"
          shape="circle"
        >
          <Avatar
            isDisabled={!user.isOnline}
            radius="full"
            size={avatarSize}
            src={user.avatar ?? ''}
            alt={user.full_name ?? ''}
          />
        </Badge>
        <div className={cn('w-full flex-col', className?.wrapperInfoUser)}>
          <div className="flex items-center gap-x-1.5">
            <span className={`${user.isOnline ? 'text-sealsalt' : 'text-gray-davy'} text-small font-semibold`}>
              {user.full_name}
            </span>
            {user.current_song && user.isOnline && showIconSong && (
              <Music className="text-blue-argentinian" size={14} strokeWidth={2} />
            )}
          </div>
          <div className="flex flex-wrap">{children}</div>
        </div>
      </article>
    </a>
  )
}

export default OnlineUserItem
