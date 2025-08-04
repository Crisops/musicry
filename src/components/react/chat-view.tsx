import type { UserPresenceTrack } from '@/types/store.types'
import type { Tables } from '@/types/database.types'
import ChatHeader from '@/components/react/chat-header'
import FormMessage from '@/components/react/form-message'
import MessageList from '@/components/react/message-list'

interface ChatViewProps {
  user: UserPresenceTrack & { isOnline: boolean }
  currentUserId: Tables<'users'>['id']
  targetUserId: Tables<'users'>['id']
  onExit: () => void
}

const ChatView = ({ user, currentUserId, targetUserId, onExit }: ChatViewProps) => {
  return (
    <section className="flex h-[calc(100vh_-_56px)] w-full flex-col lg:max-h-[calc(100vh_-_185px)]">
      <ChatHeader user={user} currentUserId={currentUserId} targetUserId={targetUserId} onExit={onExit} />
      <MessageList user={user} currentUserId={currentUserId} targetUserId={targetUserId} />
      <FormMessage currentUserId={currentUserId} targetUserId={targetUserId} />
    </section>
  )
}

export default ChatView
