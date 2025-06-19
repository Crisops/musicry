import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserAuthStore } from '@/types/store.types'

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
