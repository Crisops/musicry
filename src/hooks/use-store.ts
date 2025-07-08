import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PlaySongStore, UserAuthStore } from '@/types/store.types'

export const useAuth = create<UserAuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth',
    },
  ),
)

export const usePlaySong = create<PlaySongStore>((set) => ({
  currentSong: { song: null, playlist: [] },
  isPlaying: false,
  volume: 75,
  repeat: 'none',
  setCurrentSong: (currentSong) => set({ currentSong }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setRepeat: (repeat) => set({ repeat }),
}))
