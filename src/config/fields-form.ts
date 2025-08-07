import type { AlbumFormData, SongFormData } from '@/utils/validate-rules-form'

export const initialFormSong: SongFormData = {
  title: '',
  artist: '',
  audio_url: null,
  duration: null,
  image_url: null,
  album_id: null,
}

export const initialFormAlbum: AlbumFormData = {
  title: '',
  artist: '',
  image_url: null,
  release_year: null,
}
