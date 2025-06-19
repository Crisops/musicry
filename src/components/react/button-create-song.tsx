import { Plus } from 'lucide-react'
import { useModal } from '@/hooks/use-modal'
import { SongFormProvider } from '@/context/song-form-provider'
import Button from '@/components/shared/button'
import FormCreateSong from '@/components/react/form-create-song'
import Modal from '@/components/shared/modal'

interface ButtonCreateSongProps {
  user: User
}

const ButtonCreateSong = ({ user }: ButtonCreateSongProps) => {
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
          'Añadir canción'
        )}
      </Button>
      <Modal isOpen={isOpen} hideCloseButton onOpenChange={onOpenChange}>
        <SongFormProvider user={user}>
          <FormCreateSong onCancel={onOpenChange} />
        </SongFormProvider>
      </Modal>
    </>
  )
}

export default ButtonCreateSong
