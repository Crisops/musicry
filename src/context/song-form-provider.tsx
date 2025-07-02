import { createContext, useCallback, useRef, type ReactNode, type ChangeEvent, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { BaseTrackRow } from '@/types/track'
import type { TablesInsert } from '@/types/database.types'
import axiosClient from '@/lib/axios/client'
import { useAuth } from '@/hooks/use-store'
import { useForm } from '@/hooks/use-form'
import { useModal } from '@/hooks/use-modal'
import { type SongFormData } from '@/utils/validate-rules-form'
import { Toast } from '@/utils/toast'
import { uploadFile } from '@/utils/upload-files'
import { initialFormSong } from '@/config/fields-form'

interface SongFormContextType {
  registerField: ReturnType<typeof useForm<SongFormData>>['registerField']
  handleSubmit: ReturnType<typeof useForm<SongFormData>>['handleSubmit']
  errors: ReturnType<typeof useForm<SongFormData>>['errors']
  handleAudioFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  durationValue: string
  onSubmit: (data: SongFormData) => Promise<void>
  isSubmitting: boolean
}

export const SongFormContext = createContext<SongFormContextType | null>(null)

interface SongFormProviderProps {
  children: ReactNode
  onAddItem: (item: BaseTrackRow) => void
}

export const SongFormProvider = ({ children, onAddItem }: SongFormProviderProps) => {
  const user = useAuth((state) => state.user)
  const { registerField, handleSubmit, errors, setValue, watch, isSubmitting } = useForm<SongFormData>({
    initialForm: initialFormSong,
  })
  const { onOpenChange: closeModal } = useModal()

  const durationValue = watch('duration')?.toString() || ''

  const audioElementRef = useRef<HTMLAudioElement | null>(null)

  const getAudioDuration = useCallback(async (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (audioElementRef.current) {
        audioElementRef.current.remove()
      }

      const audio = document.createElement('audio')
      audioElementRef.current = audio

      const handleLoadedMetadata = () => {
        const duration = audio.duration
        cleanup()
        resolve(duration)
      }

      const handleError = () => {
        cleanup()
        reject(new Error('Error al cargar el archivo de audio'))
      }

      const cleanup = () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('error', handleError)
        URL.revokeObjectURL(audio.src)
        audioElementRef.current = null
      }

      const objectURL = URL.createObjectURL(file)
      audio.src = objectURL
      audio.load()

      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('error', handleError)
    })
  }, [])

  const handleAudioFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) return

      if (file.type.startsWith('audio/')) {
        try {
          const duration = await getAudioDuration(file)
          const durationInSeconds = Math.round(duration)
          setValue('duration', durationInSeconds, { shouldValidate: true })
        } catch (e) {
          console.error(e)
          setValue('duration', null)
        }
      } else {
        setValue('duration', null)
      }
    },
    [getAudioDuration, setValue],
  )

  const cleanup = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.remove()
      audioElementRef.current = null
    }
  }, [])

  useEffect(() => cleanup, [cleanup])

  const onSubmit = useCallback(
    async (data: SongFormData) => {
      const { imageUrl, audioUrl, ...rest } = data

      if (!user || !imageUrl || !audioUrl) return
      const idSong = uuidv4()
      const folder = `${user.id}/${idSong}`
      const [image, audio] = await Promise.all([
        uploadFile({ bucket: 'songs', file: imageUrl[0], folder }),
        uploadFile({ bucket: 'songs', file: audioUrl[0], folder }),
      ])
      if (image.error || audio.error) {
        Toast().error({
          title: '¡Ups! Algo salió mal',
          description: 'Error inesperado al subir archivos',
        })
      }

      const newSong: TablesInsert<'songs'> = {
        id: idSong,
        imageUrl: image.url,
        audioUrl: audio.url,
        ...rest,
      }

      const result = await axiosClient.post<BaseTrackRow>('/api/admin/songs', newSong)

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
          description: result.message || 'Error al crear la canción',
        })
      }
      onAddItem(result.data)
      Toast().success({
        title: '¡Listo!',
        description: `La canción "${newSong.title}" ha sido creada correctamente`,
      })
      closeModal(false)
    },
    [user, onAddItem, closeModal],
  )

  return (
    <SongFormContext.Provider
      value={{
        registerField,
        handleSubmit,
        errors,
        handleAudioFileChange,
        durationValue,
        onSubmit,
        isSubmitting,
      }}
    >
      {children}
    </SongFormContext.Provider>
  )
}
