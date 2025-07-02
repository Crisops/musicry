import { useModal } from '@/hooks/use-modal'
import { Trash2 } from 'lucide-react'
import type { Tables } from '@/types/database.types'
import Button from '@/components/shared/button'
import ConfirmRemoveItem from '@/components/react/confirm-remove-item'
import Modal from '@/components/shared/modal'

interface DeleteSongProps {
  tap: 'song' | 'album'
  title: string
  id: Tables<'songs'>['id'] | Tables<'albums'>['id']
  onDelete: (id: string) => void
}

const DeleteItem = ({ id, title, tap, onDelete }: DeleteSongProps) => {
  const { isOpen, onOpen, onOpenChange } = useModal()

  return (
    <>
      <Button
        className="data-[hover=true]:bg-danger/10 data-[hover=true]:text-danger text-current"
        onPress={onOpen}
        isIconOnly
        radius="sm"
        variant="light"
      >
        <Trash2 size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton size="md">
        <ConfirmRemoveItem id={id} tap={tap} title={title} onCancel={() => onOpenChange(false)} onDelete={onDelete} />
      </Modal>
    </>
  )
}

export default DeleteItem
