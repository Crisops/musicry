import { useForm } from '@/hooks/use-form'
import type { DateValue } from '@internationalized/date'
import type { AlbumFormData } from '@/utils/validate-rules-form'
import { initialFormAlbum } from '@/config/fields-form'
import Button from '@/components/shared/button'
import Input from '@/components/react/input'
import { FileUpload } from '@/components/ui/file-upload'
import { DateInput } from '@heroui/date-input'
import { useState } from 'react'

interface FormCreateAlbumProps {
  onCancel: (open: boolean) => void
}

const FormCreateAlbum = ({ onCancel }: FormCreateAlbumProps) => {
  const { registerField, handleSubmit, errors, isSubmitting } =
    useForm<AlbumFormData>({ initialForm: initialFormAlbum })

  const { onChange, ref, ...props } = registerField('imageUrl')

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
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
        <DateInput
          isInvalid={!!errors.releaseYear}
          errorMessage={errors.releaseYear?.message}
          classNames={{
            inputWrapper: [
              'bg-night focus-within:hover:bg-night hover:bg-night/90 group-data-[invalid=true]:!bg-red-500/10 group-data-[invalid=true]:data-[hover=true]:!bg-red-500/15',
            ],
            label: ['text-gray-dim'],
            input: ['text-sealsalt'],
            helperWrapper: ['max-w-md'],
            segment: [
              'focus:bg-gray-jet/20  data-[editable=true]:text-gray-dim data-[editable=true]:focus:text-gray-davy',
            ],
          }}
          label={'Año de lanzamiento'}
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
