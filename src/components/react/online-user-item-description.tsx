import type { Tables } from '@/types/database.types'
import type { UserPresenceTrack } from '@/types/store.types'
import { formatLastSeen } from '@/utils/format-last-seen'
import type { EnrichedUser } from '@/hooks/use-dm-list'

interface OnlineUserItemDescriptionProps {
  user: UserPresenceTrack & { isOnline: boolean }
  loggedUserId: Tables<'users'>['id']
  type: 'messages' | 'room'
  enrichedUser?: EnrichedUser
}

const OnlineUserItemDescription = ({ user, loggedUserId, type, enrichedUser }: OnlineUserItemDescriptionProps) => {
  const isListening = type === 'room' && user.current_song && user.isOnline
  const isLastMessage = type === 'messages' && user.isOnline && enrichedUser?.last_message
  const isOnline = type === 'messages' && user.isOnline
  const showLastSeen = !user.isOnline

  let description: React.ReactNode = null

  if (isListening) {
    description = (
      <div className="flex">
        <p className="text-tiny">
          <span className="text-blue-silver animate-pulse">Escuchando</span>
          <span className="text-gray-davy">{` ${user.current_song?.title} - ${user.current_song?.artist}`}</span>
        </p>
      </div>
    )
  } else if (isLastMessage) {
    description = (
      <div className="flex w-full justify-between gap-x-1 pr-4">
        <span className="text-tiny text-gray-dim block max-w-48 truncate">
          {enrichedUser?.last_message.user_sender_id === loggedUserId
            ? `Tú: ${enrichedUser?.last_message.content}`
            : enrichedUser?.last_message.content}
        </span>
      </div>
    )
  } else if (isOnline) {
    description = <span className="text-tiny text-blue-argentinian">Online</span>
  } else if (showLastSeen) {
    description = (
      <span className="text-tiny text-gray-davy">Ultima vez visto {formatLastSeen(user?.last_seen ?? '')}</span>
    )
  }

  return description
}

export default OnlineUserItemDescription
