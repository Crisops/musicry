import type { Tables } from './database.types'

export type TrackListAlbumColumns = {
  key: string
  label: string
}

export type TrackListAlbumRows = {
  id: Tables<'songs'>['id']
  title: Tables<'songs'>['title']
  artist: Tables<'songs'>['artist']
  duration: Tables<'songs'>['duration']
  created_at: Tables<'songs'>['created_at']
}

export const trackListAlbumColumns: TrackListAlbumColumns[] = [
  {
    key: 'id',
    label: '#',
  },
  {
    key: 'title',
    label: 'Titulo',
  },
  {
    key: 'created_at',
    label: 'Fecha de publicación',
  },
  {
    key: 'duration',
    label: 'Duración',
  },
]

export const trackListAlbumColumnsDashboard: TrackListAlbumColumns[] = [
  {
    key: 'title',
    label: 'Titulo',
  },
  {
    key: 'artist',
    label: 'Artistas',
  },
  {
    key: 'created_at',
    label: 'Fecha de publicación',
  },
  {
    key: 'action',
    label: 'Acción',
  },
]

export type Track = {
  id: Tables<'songs'>['id']
  image: Tables<'songs'>['imageUrl']
  title: Tables<'songs'>['title']
  artist: Tables<'songs'>['artist']
  created_at: Tables<'songs'>['created_at']
  duration: string
}

export const tracks: Track[] = [
  {
    id: '1',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Moscow Mule',
    artist: 'Bad Bunny',
    created_at: '2022-03-15',
    duration: '4:05',
  },
  {
    id: '2',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Después de la Playa',
    artist: 'Bad Bunny',
    created_at: '2023-07-22',
    duration: '3:50',
  },
  {
    id: '3',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Me Porto Bonito',
    artist: 'Bad Bunny, Chencho Corleone',
    created_at: '2021-11-08',
    duration: '2:58',
  },
  {
    id: '4',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Tití Me Preguntó',
    artist: 'Bad Bunny',
    created_at: '2022-05-30',
    duration: '4:03',
  },
  {
    id: '5',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Un Ratito',
    artist: 'Bad Bunny',
    created_at: '2023-01-17',
    duration: '2:56',
  },
  {
    id: '6',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Yo No Soy Celoso',
    artist: 'Bad Bunny',
    created_at: '2022-09-04',
    duration: '3:50',
  },
  {
    id: '7',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Tarot',
    artist: 'Bad Bunny, Jhayco',
    created_at: '2021-06-25',
    duration: '3:57',
  },
  {
    id: '8',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Neverita',
    artist: 'Bad Bunny',
    created_at: '2023-04-12',
    duration: '2:53',
  },
  {
    id: '9',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'La Corriente',
    artist: 'Bad Bunny, Tony Dize',
    created_at: '2022-12-19',
    duration: '3:18',
  },
  {
    id: '10',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Yonaguni',
    artist: 'Bad Bunny',
    created_at: '2021-04-10',
    duration: '2:53',
  },
  {
    id: '11',
    image: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    title: 'Crippy',
    artist: 'Bad Bunny',
    created_at: '2020-09-01',
    duration: '3:18',
  },
]
