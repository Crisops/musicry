import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import debounce from 'lodash-es/debounce'
import type { PlaySongStore, Song, UserAuthStore, UserPresenceStore, UserPresenceTrack } from '@/types/store.types'
import { supabase } from '@/lib/supabase/client'

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

export const usePlaySong = create<PlaySongStore>()(
  persist(
    (set) => ({
      currentSong: { song: null, playlist: [] },
      isPlaying: false,
      volume: 75,
      repeat: 'none',
      shuffle: false,
      shufflePlaylist: null,
      originalPlaylist: null,
      setCurrentSong: (currentSong) => set({ currentSong }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setVolume: (volume) => set({ volume }),
      setRepeat: (repeat) => set({ repeat }),
      setShuffle: (shuffle) => set({ shuffle }),
      setShufflePlaylist: (shufflePlaylist) => set({ shufflePlaylist }),
      setOriginalPlaylist: (originalPlaylist) => set({ originalPlaylist }),
    }),
    {
      name: 'player-volume',
      partialize: (state) => ({ volume: state.volume }),
    },
  ),
)

export const usePresence = create<UserPresenceStore>()(
  persist(
    (set, get) => ({
      onlineUsers: null,
      allUsersInRoom: {},
      channel: null,
      isConnected: false,
      currentSong: null,
      currenUserId: null,
      hasLoadedUsers: false,
      setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
      loadInitialUsers: async () => {
        const { hasLoadedUsers } = get()
        if (hasLoadedUsers) return

        const { data, error } = await supabase
          .from('users')
          .select('id, full_name, avatar_url, last_seen')
          .order('last_seen', { ascending: false })
          .limit(20)

        if (error) {
          console.error('[Presence] Error loading users:', error)
          return
        }

        const allUsersMap = Object.fromEntries(
          data.map((user) => [
            user.id,
            {
              id: user.id,
              full_name: user.full_name,
              avatar: user.avatar_url,
              current_song: null,
              last_seen: user.last_seen,
              isOnline: false,
            },
          ]),
        )

        set({
          allUsersInRoom: allUsersMap,
          hasLoadedUsers: true,
        })
      },
      initPresence: async (user) => {
        if (!user) return

        try {
          const { isConnected, channel } = get()
          if (isConnected && channel) return

          const { hasLoadedUsers, loadInitialUsers } = get()
          if (!hasLoadedUsers) {
            await loadInitialUsers()
          }

          const presenceChannel = supabase.channel('musicry-users', {
            config: {
              presence: {
                key: user.id,
              },
            },
          })

          set({ channel: presenceChannel, currenUserId: user.id })

          const baseUserData = {
            id: user.id,
            full_name: user.full_name,
            avatar: user.avatar_url,
          }

          presenceChannel.on('presence', { event: 'sync' }, () => {
            const state = presenceChannel.presenceState<UserPresenceTrack>()
            const newAllUsers = { ...get().allUsersInRoom }

            // Marcar como online los presentes
            Object.entries(state).forEach(([userId, [presence]]) => {
              newAllUsers[userId] = {
                ...presence,
                isOnline: true,
              }
            })

            // Marcar como offline los ausentes
            Object.keys(newAllUsers).forEach((userId) => {
              if (!state[userId]) {
                newAllUsers[userId].isOnline = false
              }
            })

            set({
              onlineUsers: state,
              allUsersInRoom: newAllUsers,
            })
          })

          presenceChannel.subscribe(async (status) => {
            switch (status) {
              case 'SUBSCRIBED':
                {
                  console.log('[Presence] Connected successfully')
                  const currentSong = get().currentSong
                  await presenceChannel.track({
                    ...baseUserData,
                    current_song: currentSong,
                    last_seen: new Date().toISOString(),
                  })
                  set({ isConnected: true })
                }
                break
              case 'CHANNEL_ERROR':
                console.error('[Presence] Connection error')
                set({ isConnected: false })
                break
              case 'CLOSED':
                set({ isConnected: false })
                console.log('[Presence] Connection closed')
                break
              default:
                console.log('[Presence] Unknown status:', status)
                break
            }
          })
        } catch (error) {
          console.error('[Presence] Error initializing:', error)
          set({ isConnected: false })
        }
      },
      updateCurrentSong: debounce((song: Song, user: User) => {
        const { channel, isConnected } = get()
        if (!channel || !user || !isConnected) {
          console.warn('[Presence] Cannot update song - channel not ready')
          return
        }

        try {
          set({ currentSong: song })
          channel.track({
            id: user.id,
            full_name: user.full_name,
            avatar: user.avatar_url,
            current_song: song,
            last_seen: new Date().toISOString(),
          })
        } catch (error) {
          console.error('[Presence] Error updating current song:', error)
        }
      }, 1000),
      disconnect: async () => {
        const { channel, currenUserId } = get()

        if (currenUserId) {
          await supabase.from('users').update({ last_seen: new Date().toISOString() }).eq('id', currenUserId)
        }

        if (channel) {
          try {
            channel.unsubscribe()
            console.log('[Presence] Disconnected successfully')
          } catch (error) {
            console.error('[Presence] Error disconnecting:', error)
          }
        }
        set({
          channel: null,
          onlineUsers: null,
          isConnected: false,
        })
      },
    }),
    {
      name: 'play-listening',
      partialize: (state) => ({
        currenUserId: state.currenUserId,
      }),
    },
  ),
)
