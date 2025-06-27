import { getLocalTimeZone, today } from '@internationalized/date'
import { v4 as uuidv4 } from 'uuid'
import { Controller } from 'react-hook-form'
import { DateInput } from '@heroui/date-input'
import { useAuth } from '@/hooks/use-store'
import { useForm } from '@/hooks/use-form'
import { useModal } from '@/hooks/use-modal'
import type { TablesInsert } from '@/types/database.types'
import type { AlbumFormData } from '@/utils/validate-rules-form'
import { albumValidationRules } from '@/utils/validate-rules-form'
import { uploadFile } from '@/utils/upload-files'
import { Toast } from '@/utils/toast'
import { initialFormAlbum } from '@/config/fields-form'
import Button from '@/components/shared/button'
import { FileUpload } from '@/components/ui/file-upload'
import Input from '@/components/react/input'

interface FormCreateAlbumProps {
  onCancel: (open: boolean) => void
}

const FormCreateAlbum = ({ onCancel }: FormCreateAlbumProps) => {
  const user = useAuth((state) => state.user)
  const { registerField, handleSubmit, errors, isSubmitting, control } =
    useForm<AlbumFormData>({ initialForm: initialFormAlbum })
  const { onOpenChange: closeModal } = useModal()

  const { onChange, ref, ...props } = registerField('imageUrl')

  const onSubmit = handleSubmit(async (data) => {
    const { imageUrl, releaseYear, ...formData } = data

    if (!user || !imageUrl || !releaseYear) return

    try {
      const idAlbum = uuidv4()
      const folder = `${user.id}/${idAlbum}`
      const { url, error } = await uploadFile({
        bucket: 'albums',
        file: imageUrl[0],
        folder,
      })
      if (error) throw new Error(error)

      const newAlbum: TablesInsert<'albums'> = {
        id: idAlbum,
        ...formData,
        imageUrl: url,
        releaseYear: releaseYear.toDate(getLocalTimeZone()).toISOString(),
      }

      const response = await fetch('/api/admin/albums', {
        method: 'POST',
        body: JSON.stringify(newAlbum),
      })
      if (!response.ok) throw new Error('Fallo al crear el albúm')
      const { status, message } = await response.json()
      if (status !== 200) throw new Error(message)

      Toast().success({
        title: 'Albúm creado correctamente',
        description: `El albúm ${newAlbum.title} ha sido creado correctamente`,
      })
      closeModal(false)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No pudimos crear tu albúm. Intenta nuevamente.'
      Toast().error({
        title: '¡Ups! Algo salió mal',
        description: message,
      })
    }
  })

  return (
    <form id="form-create-album" className="p-4" onSubmit={onSubmit}>
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
        <Controller
          control={control}
          name="releaseYear"
          rules={{
            validate: albumValidationRules.releaseYear.validate,
          }}
          render={({ field: { value, ...field }, fieldState }) => (
            <DateInput
              {...field}
              maxValue={today(getLocalTimeZone())}
              classNames={{
                inputWrapper: [
                  'bg-night focus-within:hover:bg-night hover:bg-night/90 group-data-[invalid=true]:!bg-red-500/10 group-data-[invalid=true]:data-[hover=true]:!bg-red-500/15',
                ],
                label: ['text-gray-dim'],
                input: ['text-sealsalt'],
                helperWrapper: ['max-w-md'],
                segment: [
                  'focus:bg-gray-jet/20 data-[editable=true]:text-sealsalt data-[editable=true]:focus:text-gray-davy data-[editable=true]:data-[placeholder=true]:text-gray-dim data-[invalid=true]:data-[editable=true]:data-[placeholder=true]:text-danger',
                ],
              }}
              label={'Año de lanzamiento'}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          )}
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
            {isSubmitting ? 'Añadiendo...' : 'Añadir álbum'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default FormCreateAlbum
