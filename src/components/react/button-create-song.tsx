import { Plus } from 'lucide-react'
import type { BaseTrackRow } from '@/types/track'
import { useModal } from '@/hooks/use-modal'
import { SongFormProvider } from '@/context/song-form-provider'
import Button from '@/components/shared/button'
import FormCreateSong from '@/components/react/form-create-song'
import Modal from '@/components/shared/modal'

interface ButtonCreateSongProps {
  onAddItem: (item: BaseTrackRow) => void
}
const ButtonCreateSong = ({ onAddItem }: ButtonCreateSongProps) => {
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
        <SongFormProvider onAddItem={onAddItem}>
          <FormCreateSong onCancel={onOpenChange} />
        </SongFormProvider>
      </Modal>
    </>
  )
}

export default ButtonCreateSong
