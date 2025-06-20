import type { AlbumFormData, SongFormData } from '@/utils/validate-rules-form'

export const initialFormSong: SongFormData = {
  title: '',
  artist: '',
  audioUrl: null,
  duration: null,
  imageUrl: null,
  albumId: null,
}

export const initialFormAlbum: AlbumFormData = {
  title: '',
  artist: '',
  imageUrl: null,
  releaseYear: null,
}
