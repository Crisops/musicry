import { AnimatePresence, motion } from 'framer-motion'
import type { EnrichedUser } from '@/hooks/use-dm-list'
import ChatView from '@/components/react/chat-view'

interface AnimatedChatViewProps {
  selectedUser: EnrichedUser
  loggedUser: User
  onExitChat: () => void
}

const AnimatedChatView = ({ selectedUser, loggedUser, onExitChat }: AnimatedChatViewProps) => {
  return (
    <AnimatePresence mode="wait" propagate>
      <motion.div
        key={selectedUser.user.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className="h-full w-full"
      >
        <ChatView
          onExit={onExitChat}
          user={selectedUser.user}
          currentUserId={loggedUser?.id!}
          targetUserId={selectedUser.user.id}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatedChatView
