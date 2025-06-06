import { useModal } from '@/hooks/useModal'
import { Trash2 } from 'lucide-react'
import Button from '@/components/shared/button'
import Modal from '@/components/shared/modal'

const DeleteSong = () => {
  const { isOpen, onOpen, onOpenChange } = useModal()

  return (
    <>
      <Button
        className="bg-transparent text-current data-[hover=true]:text-red-600"
        onPress={onOpen}
        isIconOnly
        radius="none"
      >
        <Trash2 size={20} />
      </Button>
      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <div>Modal para eliminar una cancion</div>
      </Modal>
    </>
  )
}

export default DeleteSong
