import type { Tables } from '@/types/database.types'

export type UserAuthStore = {
  user: User | null
  setUser: (user: User | null) => void
}

export type Song = Omit<Tables<'songs'>, 'albumId' | 'created_at'> & {
  album: {
    id: Tables<'albums'>['id']
  }
}

export type PlaySongCurrent = {
  song: Song | null
  playlist: Song[]
} | null

export type PlaySongStore = {
  currentSong: PlaySongCurrent
  isPlaying: boolean
  volume: number
  repeat: 'all' | 'one' | 'none'
  shuffle: boolean
  shufflePlaylist: PlaySongCurrent
  originalPlaylist: Song[] | null
  setCurrentSong: (song: PlaySongCurrent) => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  setRepeat: (repeat: 'all' | 'one' | 'none') => void
  setShuffle: (shuffle: boolean) => void
  setShufflePlaylist: (shufflePlaylist: PlaySongCurrent) => void
  setOriginalPlaylist: (originalPlaylist: Song[] | null) => void
}
