import type { Tables } from '@/types/database.types'
import type { EnrichedMessage } from '@/hooks/use-dm-chat'
import { formatMessageTime } from '@/utils/format-message-time'
import { Avatar } from '@heroui/avatar'

interface MessageProps {
  message: EnrichedMessage
  currentUserId: Tables<'users'>['id']
}

const Message = ({ message, currentUserId }: MessageProps) => {
  const isSender = message.user_sender_id === currentUserId
  const bgColor = isSender
    ? 'bg-blue-silver'
    : 'bg-rich-dark-jungle before:border-rich-dark-jungle before:rounded-tl-px before:rounded-bl-small before:absolute before:bottom-0 before:-left-1 before:-rotate-10 before:border-r-10 before:border-b-10 before:border-r-transparent'
  const justify = isSender ? 'justify-start' : 'justify-end'
  return (
    <div key={message.id} className={`group w-fit max-w-fit ${isSender ? 'ml-auto' : 'mr-auto'}`}>
      <div className="w-full max-w-96">
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start gap-x-2'}`}>
          {!isSender && <Avatar size="sm" src={message.senderInfo?.avatar ?? ''} className="shrink-0 self-end" />}
          <div className={`rounded-small relative px-2 py-3 ${bgColor}`}>
            <p className="text-small text-sealsalt">{message.content}</p>
          </div>
        </div>
        <div className={`flex ${justify} py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
          <span className="text-tiny text-gray-davy">{formatMessageTime(message.created_at)}</span>
        </div>
      </div>
    </div>
  )
}

export default Message
