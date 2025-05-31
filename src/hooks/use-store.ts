import { create } from 'zustand'
import type { UserAuthStore } from '@/types/store.types'

export const useAuth = create<UserAuthStore>((set) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}))
