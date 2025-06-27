import { useModal } from '@/hooks/use-modal'
import { Trash2 } from 'lucide-react'
import type { Tables } from '@/types/database.types'
import Button from '@/components/shared/button'
import Modal from '@/components/shared/modal'

interface DeleteSongProps {
  id: Tables<'songs'>['id'] | Tables<'albums'>['id']
}

const DeleteSong = ({ id }: DeleteSongProps) => {
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <div>Modal para eliminar una cancion {id}</div>
      </Modal>
    </>
  )
}

export default DeleteSong
