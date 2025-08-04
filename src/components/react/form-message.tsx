import { Send } from 'lucide-react'
import type { Tables } from '@/types/database.types'
import { useDMChat } from '@/hooks/use-dm-chat'
import Button from '@/components/shared/button'
import { Textarea } from '@heroui/input'

interface FormMessageProps {
  currentUserId: Tables<'users'>['id']
  targetUserId: Tables<'users'>['id']
}

const FormMessage = ({ currentUserId, targetUserId }: FormMessageProps) => {
  const { registerField, handleSubmit, handleInputChange, handleSendMessage } = useDMChat(currentUserId, targetUserId)

  const onSubmit = handleSubmit((data) => {
    if (!data.content) return
    handleSendMessage({ content: data.content })
  })

  return (
    <div className="w-full">
      <div className="flex px-4 py-1">
        <form onSubmit={onSubmit} className="flex w-full items-center gap-x-2">
          <Textarea
            {...registerField}
            onChange={(e) => handleInputChange(e, e.target.value)}
            radius="sm"
            minRows={1}
            disableAutosize
            variant="flat"
            classNames={{
              inputWrapper: [
                'bg-rich-dark-jungle data-[hover=true]:bg-rich-dark-jungle group-data-[focus=true]:bg-rich-dark-jungle py-1.5',
              ],
              input: ['h-8 group-data-[has-value=true]:text-sealsalt'],
            }}
          />
          <Button
            type="submit"
            isIconOnly
            radius="sm"
            variant="solid"
            className="bg-blue-argentinian data-[hover=true]:bg-blue-argentinian/95"
          >
            <Send
              size={20}
              className="stroke-sealsalt transition-colors-opacity group-data-[hover=true]:stroke-sealsalt/50"
            />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default FormMessage
