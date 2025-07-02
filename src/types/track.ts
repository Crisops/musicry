import type { Tables } from '@/types/database.types'

export interface BaseTrackRow {
  id: Tables<'songs'>['id'] | Tables<'albums'>['id']
  title: Tables<'songs'>['title'] | Tables<'albums'>['title']
  artist: Tables<'songs'>['artist'] | Tables<'albums'>['artist']
  imageUrl: Tables<'songs'>['imageUrl'] | Tables<'albums'>['imageUrl']
  release_year: Tables<'songs'>['created_at'] | Tables<'albums'>['releaseYear']
}

export type Column = {
  key: string
  label: string
}

export const trackAlbumPageColumns: Column[] = [
  {
    key: 'index',
    label: '#',
  },
  {
    key: 'title',
    label: 'Titulo',
  },
  {
    key: 'release_year',
    label: 'Fecha de publicación',
  },
  {
    key: 'duration',
    label: 'Duración',
  },
]

export const trackAlbumPanelColumns: Column[] = [
  {
    key: 'title',
    label: 'Titulo',
  },
  {
    key: 'artist',
    label: 'Artistas',
  },
  {
    key: 'release_year',
    label: 'Fecha de publicación',
  },
  {
    key: 'songs',
    label: 'Canciones',
  },
  {
    key: 'action',
    label: 'Acción',
  },
]

export const trackSongsPanelColumns: Column[] = [
  {
    key: 'title',
    label: 'Titulo',
  },
  {
    key: 'artist',
    label: 'Artistas',
  },
  {
    key: 'release_year',
    label: 'Fecha de publicación',
  },
  {
    key: 'action',
    label: 'Acción',
  },
]

export type TrackSongsListPanelRows = BaseTrackRow

export type TrackAlbumListPanelRows = BaseTrackRow & {
  songs: TrackSongsListPanelRows[]
}

export type TrackAlbumPageColumns = BaseTrackRow & {
  songs: (TrackSongsListPanelRows & {
    duration: Tables<'songs'>['duration']
  })[]
}
