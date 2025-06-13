import Button from '@/components/shared/button'
import Input from '@/components/react/input'
import { FileUpload } from '@/components/ui/file-upload'
import { Select } from '@/components/react/select'
import { Form } from '@heroui/form'
import { useSongForm } from '@/hooks/use-song-form'

interface FormCreateSongProps {
  onCancel: (open: boolean) => void
}

const FormCreateSong = ({ onCancel }: FormCreateSongProps) => {
  const {
    registerField,
    handleSubmit,
    errors,
    handleAudioFileChange,
    durationValue,
  } = useSongForm()

  const { onChange, ref, ...props } = registerField('imageUrl')
  const { onChange: onChangeAudio, ...audioRest } = registerField('audioUrl')

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  return (
    <Form id="form-create-song" className="p-4" onSubmit={onSubmit}>
      <div className="mb-8">
        <FileUpload
          type="file"
          acceptedTypes={['image/jpeg', 'image/jpg']}
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
          isInvalid={!!errors.duration}
          errorMessage={errors.duration?.message}
        />
        <Select
          {...registerField('albumId')}
          label="Álbum (opcional)"
          isInvalid={!!errors.albumId}
          errorMessage={errors.albumId?.message}
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
            type="submit"
            radius="sm"
            className={`${Object.keys(errors).length > 0 ? 'bg-blue-silver/10 text-sealsalt/10 pointer-events-none' : 'bg-blue-silver text-sealsalt pointer-events-auto'} text-small px-2`}
          >
            Añadir canción
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default FormCreateSong
