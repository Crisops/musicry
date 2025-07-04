import { useEffect, useState } from 'react'
import axiosClient from '@/lib/axios/client'
import type { Tables } from '@/types/database.types'
import { useSongForm } from '@/hooks/use-song-form'
import Button from '@/components/shared/button'
import Input from '@/components/react/input'
import { FileUpload } from '@/components/ui/file-upload'
import { Select } from '@/components/react/select'

interface FormCreateSongProps {
  onCancel: (open: boolean) => void
}

const FormCreateSong = ({ onCancel }: FormCreateSongProps) => {
  const { registerField, handleSubmit, errors, handleAudioFileChange, durationValue, onSubmit, isSubmitting } =
    useSongForm()
  const [albums, setAlbums] = useState<Tables<'albums'>[]>([])

  const { onChange, ref, ...props } = registerField('imageUrl')
  const { onChange: onChangeAudio, ...audioRest } = registerField('audioUrl')

  useEffect(() => {
    const fetchAlbums = async () => {
      const result = await axiosClient.get<Tables<'albums'>[]>('/api/albums')
      if (!result.success) {
        console.error(result.error)
        return
      }

      if (result.status !== 200) {
        console.error(result.message)
        return
      }

      setAlbums(result.data)
    }

    fetchAlbums()
  }, [])

  return (
    <form id="form-create-song" className="p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <FileUpload
          type="file"
          maxSizeMB={5}
          acceptedTypes={['image/jpeg', 'image/jpg', 'image/webp']}
          onChange={onChange}
          {...props}
          ref={ref}
          errorMessage={errors.imageUrl?.message}
        />
      </div>
      <div className="flex w-full flex-col gap-5">
        <Input
          {...audioRest}
          type="file"
          isInvalid={!!errors.audioUrl}
          errorMessage={errors.audioUrl?.message}
          label="Archivo de audio"
          accept="audio/*"
          onChange={(e) => {
            onChangeAudio(e)
            handleAudioFileChange(e)
          }}
        />
        <Input
          {...registerField('title')}
          label="Título"
          isInvalid={!!errors.title}
          errorMessage={errors.title?.message}
        />
        <Input
          {...registerField('artist')}
          label="Artistas"
          isInvalid={!!errors.artist}
          errorMessage={errors.artist?.message}
          description="Escribe el nombre del artista o artistas. Si hay más de uno, sepáralos con comas (Ej: Karol G, Feid, Bizarrap, etc.)"
        />
        <Input
          className="pointer-events-none"
          isReadOnly
          {...registerField('duration')}
          value={durationValue?.toString() || ''}
          label="Duración"
          placeholder="Se calculará automáticamente (en segundos)"
          isInvalid={!!errors.duration}
          errorMessage={errors.duration?.message}
        />
        <Select
          {...registerField('albumId')}
          label="Álbum (opcional)"
          isInvalid={!!errors.albumId}
          errorMessage={errors.albumId?.message}
          items={albums}
        />
        <div className="flex justify-end gap-2">
          <Button
            radius="sm"
            variant="solid"
            className="bg-rich-dark-jungle text-sealsalt text-small px-2"
            onPress={() => onCancel(false)}
          >
            Cancelar
          </Button>
          <Button
            isLoading={isSubmitting}
            type="submit"
            radius="sm"
            className={`${Object.keys(errors).length > 0 ? 'bg-blue-silver/10 text-sealsalt/10 pointer-events-none' : 'bg-blue-silver text-sealsalt pointer-events-auto'} text-small px-2`}
          >
            {isSubmitting ? 'Añadiendo...' : 'Añadir canción'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default FormCreateSong
