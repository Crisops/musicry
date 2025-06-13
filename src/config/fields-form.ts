import type { SongFormData } from '@/utils/validate-rules-form'

export const initialFormSong: SongFormData = {
  title: '',
  artist: '',
  audioUrl: null,
  duration: null,
  imageUrl: null,
  albumId: null,
}
