import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import debounce from 'lodash-es/debounce'
import { v4 as uuidv4 } from 'uuid'
import type {
  DMBroadcastPayLoad,
  DMMessage,
  DMStore,
  PlaySongStore,
  Song,
  TypingEvent,
  UserAuthStore,
  UserPresenceStore,
  UserPresenceTrack,
} from '@/types/store.types'
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

export const useDMStore = create<DMStore>()(
  persist(
    (set, get) => ({
      activeChats: {},
      currentUserId: null,

      openDM: async (currentUserId, targetUserId) => {
        const { activeChats } = get()

        // Ya existe el chat
        if (activeChats[targetUserId]?.isSubscribed) {
          return
        }

        try {
          // Para verificar que el chat es igual tanto A con B como B con A
          const chatId = [currentUserId, targetUserId].sort().join('-')
          const channelName = `dm-${chatId}`

          const channel = supabase.channel(channelName)

          // Configurar los listeners
          channel
            .on('broadcast', { event: 'message' }, ({ payload }: { payload: DMBroadcastPayLoad }) => {
              const { activeChats } = get()
              const chat = activeChats[targetUserId]

              if (payload.message.user_sender_id === currentUserId) return

              if (!chat) return

              // Evitar duplicados y mensajes propios si ya están
              const messageExists = chat.messages.some(
                (m) => m.id === payload.message.id || (!!payload.temp_id && m.id === payload.temp_id),
              )

              if (messageExists) return

              const updatedMessages = [...chat.messages, payload.message].sort(
                (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
              )

              set({
                activeChats: {
                  ...get().activeChats,
                  [targetUserId]: {
                    ...chat,
                    messages: updatedMessages,
                    lastMessageAt: payload.message.created_at,
                  },
                },
              })
            })
            .on('broadcast', { event: 'typing' }, ({ payload }: { payload: TypingEvent }) => {
              if (payload.user_id === currentUserId) return

              const { activeChats } = get()
              const chat = activeChats[targetUserId]
              if (chat) {
                set({
                  activeChats: {
                    ...get().activeChats,
                    [targetUserId]: {
                      ...chat,
                      isTyping: payload.is_typing,
                    },
                  },
                })
              }
            })

          channel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
              set({
                activeChats: {
                  ...get().activeChats,
                  [targetUserId]: {
                    channel,
                    messages: [],
                    isSubscribed: true,
                    isTyping: false,
                    lastMessageAt: null,
                    hasLoadingHistory: false,
                  },
                },
                currentUserId,
              })
              await get().loadMessageHistory(targetUserId)
            }
          })
        } catch (error) {
          console.error('[DM] Error opening chat:', error)
        }
      },
      closeDM: async (targetUserId) => {
        const { activeChats } = get()
        const chat = activeChats[targetUserId]

        if (chat?.channel) {
          try {
            await chat.channel.unsubscribe()
          } catch (error) {
            console.error('[DM] Error closing chat:', error)
          }
        }

        const { [targetUserId]: removed, ...remainingChats } = activeChats

        set({ activeChats: remainingChats })
      },
      sendMessage: async (targetUserId, message) => {
        const { activeChats, currentUserId } = get()
        const chat = activeChats[targetUserId]

        if (!chat?.isSubscribed || !currentUserId) {
          console.warn('[DM] Cannot send message - chat not ready')
          return
        }

        try {
          const tempId = uuidv4()
          const tempMessage: DMMessage = {
            id: tempId,
            user_sender_id: currentUserId,
            user_recipient_id: targetUserId,
            content: message,
            created_at: new Date().toISOString(),
          }

          set({
            activeChats: {
              ...get().activeChats,
              [targetUserId]: {
                ...chat,
                messages: [...chat.messages, tempMessage],
                lastMessageAt: tempMessage.created_at,
              },
            },
          })

          const brodcatsPayload: DMBroadcastPayLoad = {
            message: tempMessage,
            sender: {
              id: currentUserId,
              full_name: '',
              avatar_url: null,
            },
            temp_id: tempId,
          }

          await chat.channel.send({
            type: 'broadcast',
            event: 'message',
            payload: brodcatsPayload,
          })

          const { error } = await supabase.from('messages').insert({
            id: tempId,
            user_sender_id: currentUserId,
            user_recipient_id: targetUserId,
            content: message,
            created_at: tempMessage.created_at,
          })

          if (error) {
            console.error('[DM] Error saving message to database:', error)
            const { activeChats } = get()
            const currentChat = activeChats[targetUserId]
            if (currentChat) {
              const updatedMessages = currentChat.messages.filter((m) => m.id !== tempId)
              set({
                activeChats: {
                  ...get().activeChats,
                  [targetUserId]: {
                    ...currentChat,
                    messages: updatedMessages,
                  },
                },
              })
            }
          }
        } catch (error) {
          console.error('[DM] Error sending message:', error)
        }
      },
      loadMessageHistory: async (targetUserId) => {
        const { activeChats, currentUserId } = get()
        const chat = activeChats[targetUserId]

        if (!chat || chat.hasLoadingHistory || !currentUserId) return

        try {
          const { data, error } = await supabase
            .from('messages')
            .select('*')
            .or(
              `and(user_sender_id.eq.${currentUserId},user_recipient_id.eq.${targetUserId}),and(user_sender_id.eq.${targetUserId},user_recipient_id.eq.${currentUserId})`,
            )
            .order('created_at', { ascending: true })
            .limit(50)

          if (error) {
            console.log('[DM] Error loading message history', error)
            return
          }

          set({
            activeChats: {
              ...get().activeChats,
              [targetUserId]: {
                ...chat,
                messages: data || [],
                hasLoadingHistory: true,
                lastMessageAt: data?.[data.length - 1]?.created_at || null,
              },
            },
          })
        } catch (error) {
          console.log('[DM] Error loading message history', error)
        }
      },
      setTyping: async (targetUserId, isTyping) => {
        const { activeChats, currentUserId } = get()
        const chat = activeChats[targetUserId]

        if (!chat.isSubscribed && !currentUserId) return

        const chatId = [currentUserId, targetUserId].sort().join('-')

        await chat.channel.send({
          type: 'broadcast',
          event: 'typing',
          payload: {
            user_id: currentUserId,
            is_typing: isTyping,
            chat_id: chatId,
          },
        })
      },
      getChatWithUser: (targetUserId) => {
        return get().activeChats[targetUserId] || null
      },
      cleanup: async () => {
        const { activeChats } = get()
        // Cerrar todos los canales
        await Promise.all(Object.keys(activeChats).map((userId) => get().closeDM(userId)))
        set({ activeChats: {}, currentUserId: null })
      },
    }),
    {
      name: 'messages',
      partialize: (state) => ({
        currentUserId: state.currentUserId,
      }),
    },
  ),
)
