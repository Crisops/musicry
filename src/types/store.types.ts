import type { Tables } from '@/types/database.types'

export type UserAuthStore = {
  user: User | null
  setUser: (user: User | null) => void
}

type Song = Omit<Tables<'songs'>, 'albumId' | 'created_at'> & {
  album: {
    id: Tables<'albums'>['id']
  }
}

export type PlaySongCurrent = {
  song: Song | null
  playlist: Song[]
}

export type PlaySongStore = {
  currentSong: PlaySongCurrent | null
  isPlaying: boolean
  volume: number
  repeat: 'all' | 'one' | 'none'
  setCurrentSong: (song: PlaySongCurrent | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  setRepeat: (repeat: 'all' | 'one' | 'none') => void
}
