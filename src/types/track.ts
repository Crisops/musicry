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
    key: 'id',
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
  duration: string
}

export const tracks: TrackAlbumPageColumns[] = [
  {
    id: '1',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Moscow Mule',
    artist: 'Bad Bunny',
    release_year: '2022-03-15',
    duration: '4:05',
  },
  {
    id: '2',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Después de la Playa',
    artist: 'Bad Bunny',
    release_year: '2023-07-22',
    duration: '3:50',
  },
  {
    id: '3',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Me Porto Bonito',
    artist: 'Bad Bunny, Chencho Corleone',
    release_year: '2021-11-08',
    duration: '2:58',
  },
  {
    id: '4',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Tití Me Preguntó',
    artist: 'Bad Bunny',
    release_year: '2022-05-30',
    duration: '4:03',
  },
  {
    id: '5',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Un Ratito',
    artist: 'Bad Bunny',
    release_year: '2023-01-17',
    duration: '2:56',
  },
  {
    id: '6',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Yo No Soy Celoso',
    artist: 'Bad Bunny',
    release_year: '2022-09-04',
    duration: '3:50',
  },
  {
    id: '7',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Tarot',
    artist: 'Bad Bunny, Jhayco',
    release_year: '2021-06-25',
    duration: '3:57',
  },
  {
    id: '8',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Neverita',
    artist: 'Bad Bunny',
    release_year: '2023-04-12',
    duration: '2:53',
  },
  {
    id: '9',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'La Corriente',
    artist: 'Bad Bunny, Tony Dize',
    release_year: '2022-12-19',
    duration: '3:18',
  },
  {
    id: '10',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Yonaguni',
    artist: 'Bad Bunny',
    release_year: '2021-04-10',
    duration: '2:53',
  },
  {
    id: '11',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Crippy',
    artist: 'Bad Bunny',
    release_year: '2020-09-01',
    duration: '3:18',
  },
]
