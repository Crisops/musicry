import {
  createContext,
  useCallback,
  useRef,
  type ReactNode,
  type ChangeEvent,
  useEffect,
} from 'react'
import { useForm } from '@/hooks/use-form'
import { type SongFormData } from '@/utils/validate-rules-form'
import { initialFormSong } from '@/config/fields-form'

interface SongFormContextType {
  registerField: ReturnType<typeof useForm<SongFormData>>['registerField']
  handleSubmit: ReturnType<typeof useForm<SongFormData>>['handleSubmit']
  errors: ReturnType<typeof useForm<SongFormData>>['errors']
  handleAudioFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>
  durationValue: string
}

export const SongFormContext = createContext<SongFormContextType | null>(null)

export const SongFormProvider = ({ children }: { children: ReactNode }) => {
  const { registerField, handleSubmit, errors, setValue, watch } =
    useForm<SongFormData>({
      initialForm: initialFormSong,
    })

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

  return (
    <SongFormContext.Provider
      value={{
        registerField,
        handleSubmit,
        errors,
        handleAudioFileChange,
        durationValue,
      }}
    >
      {children}
    </SongFormContext.Provider>
  )
}
