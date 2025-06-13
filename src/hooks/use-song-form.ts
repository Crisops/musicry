import { SongFormContext } from '@/context/song-form-provider'
import { use } from 'react'

export const useSongForm = () => {
  const context = use(SongFormContext)
  if (!context) {
    throw new Error('useSongForm debe ser usado dentro de SongFormProvider')
  }
  return context
}
