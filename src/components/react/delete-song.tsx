import { useModal } from '@/hooks/use-modal'
import { Trash2 } from 'lucide-react'
import Button from '@/components/shared/button'
import Modal from '@/components/shared/modal'

const DeleteSong = () => {
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div>Modal para eliminar una cancion</div>
      </Modal>
    </>
  )
}

export default DeleteSong
