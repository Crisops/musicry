import type { Tables } from '@/types/database.types'
import axiosClient from '@/lib/axios/client'
import { Toast } from '@/utils/toast'
import Button from '@/components/shared/button'
import { useCallback, useState } from 'react'

interface ConfirmRemoveItemProps {
  id: Tables<'songs'>['id'] | Tables<'albums'>['id']
  tap: 'song' | 'album'
  title: string
  onCancel: () => void
  onDelete: (id: string) => void
}

const ConfirmRemoveItem = ({ id, tap, title, onCancel: closeModal, onDelete }: ConfirmRemoveItemProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const isSong = tap === 'song'
  const urlApi = isSong ? '/api/admin/songs' : '/api/admin/albums'
  const titleItem = isSong ? 'Canción eliminada' : 'Álbum eliminado'
  const descriptionItem = isSong ? 'La canción' : 'El álbum'

  const handleDeleteItem = useCallback(async (): Promise<void> => {
    setIsLoading(true)

    const result = await axiosClient.delete<Tables<'songs'> | Tables<'albums'>>(urlApi, { data: { id } })

    if (!result.success) {
      Toast().error({
        title: '¡Ups! Algo salió mal',
        description: result.error.message,
      })
      return
    }

    if (result.status !== 200) {
      Toast().error({
        title: '¡Ups! Algo salió mal',
        description: result.message || 'Error al eliminar el item',
      })
      return
    }
    onDelete(result.data.id)
    Toast().success({
      title: `${titleItem}`,
      description: `${descriptionItem} "${result.data.title}" ha sido eliminada correctamente`,
    })
    closeModal()
    setIsLoading(false)
  }, [id, tap, closeModal, title, onDelete])

  return (
    <div className="h-full w-full p-7">
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="flex-1">
          <div>
            <h3 className="text-2xl font-semibold text-balance text-gray-50">
              {tap === 'song' ? `¿Deseas eliminar la canción "${title}"?` : `¿Deseas eliminar el álbum "${title}"?`}
            </h3>
          </div>
          <div>
            <p className="text-zinc-500">
              Esta acción no se puede revertir, y se eliminará de la
              {isSong ? ' biblioteca de canciones' : ' biblioteca de álbumes'}.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button
            isLoading={isLoading}
            onPress={handleDeleteItem}
            radius="sm"
            variant="solid"
            className="bg-danger h-11 w-full font-medium text-white"
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
          <Button
            onPress={closeModal}
            radius="sm"
            variant="bordered"
            className="text-gray-dim border-gray-dim h-11 w-full border-1 bg-transparent font-medium"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRemoveItem
