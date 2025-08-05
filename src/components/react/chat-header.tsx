import { useShallow } from 'zustand/react/shallow'
import type { UserPresenceTrack } from '@/types/store.types'
import type { Tables } from '@/types/database.types'
import { X } from 'lucide-react'
import { useDMStore } from '@/hooks/use-store'
import Button from '@/components/shared/button'
import OnlineUserItemDescription from '@/components/react/online-user-item-description'
import OnlineUserItem from '@/components/react/online-user-item'

interface ChatHeaderProps {
  user: UserPresenceTrack & { isOnline: boolean }
  currentUserId: Tables<'users'>['id']
  targetUserId: Tables<'users'>['id']
  onExit: () => void
}

const ChatHeader = ({ user, currentUserId, targetUserId, onExit }: ChatHeaderProps) => {
  const { closeDM } = useDMStore(
    useShallow((state) => ({
      closeDM: state.closeDM,
    })),
  )

  const handleCloseDM = async () => {
    await closeDM(targetUserId)
    onExit()
  }

  return (
    <header className="border-gray-dim flex h-16 w-full items-center justify-between gap-x-2 border-b">
      <OnlineUserItem className={{ root: 'cursor-default' }} user={user} showIconSong={false} avatarSize="md">
        <OnlineUserItemDescription user={user} loggedUserId={currentUserId} type="messages" />
      </OnlineUserItem>
      <div className="flex h-full w-16 items-center justify-center">
        <Button onPress={handleCloseDM} isIconOnly variant="light" className="data-[hover=true]:bg-rich-dark-jungle/80">
          <X
            size={20}
            className="stroke-sealsalt transition-colors-opacity group-data-[hover=true]:stroke-sealsalt/50"
          />
        </Button>
      </div>
    </header>
  )
}

export default ChatHeader
