import { Plus } from 'lucide-react'
import { useModal } from '@/hooks/use-modal'
import Button from '@/components/shared/button'
import Modal from '@/components/shared/modal'

const ButtonCreateAlbum = () => {
  const { sizeViewPort, isOpen, onOpen, onOpenChange } = useModal()
  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly={sizeViewPort < 500}
        className="bg-blue-silver text-sealsalt"
        radius="sm"
        startContent={
          sizeViewPort < 500 ? null : <Plus fill="currentColor" size={16} />
        }
      >
        {sizeViewPort < 500 ? (
          <Plus fill="currentColor" size={16} />
        ) : (
          'Añadir albúm'
        )}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <h1>Modal Para crear un Albúm</h1>
      </Modal>
    </>
  )
}

export default ButtonCreateAlbum
