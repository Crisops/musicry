import type { Tables } from '@/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

export type UserAuthStore = {
  user: User
  setUser: (user: User) => void
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

export type UserPresenceTrack = {
  id: Tables<'users'>['id']
  full_name: Tables<'users'>['full_name']
  avatar: Tables<'users'>['avatar_url']
  current_song: Omit<Song, 'audioUrl' | 'imageUrl' | 'album'> | null
  last_seen: Tables<'users'>['last_seen']
}

export type UserPresence = Record<string, UserPresenceTrack[]> | null

export type UserPresenceStore = {
  onlineUsers: UserPresence
  allUsersInRoom: Record<string, UserPresenceTrack & { isOnline: boolean }>
  channel: RealtimeChannel | null
  isConnected: boolean
  currentSong: Song | null
  currenUserId: Tables<'users'>['id'] | null
  hasLoadedUsers: boolean
  loadInitialUsers: () => Promise<void>
  initPresence: (user: User) => void
  updateCurrentSong: (song: Song, user: User) => void
  setOnlineUsers: (onlineUsers: UserPresence) => void
  disconnect: () => void
}

export type DMMessage = {
  id: Tables<'messages'>['id']
  user_sender_id: Tables<'messages'>['user_sender_id']
  user_recipient_id: Tables<'messages'>['user_recipient_id']
  content: Tables<'messages'>['content']
  created_at: Tables<'messages'>['created_at']
}

export type DMBroadcastPayLoad = {
  message: DMMessage
  sender: Pick<Tables<'users'>, 'id' | 'full_name' | 'avatar_url'>
  temp_id?: string
}

export type DMChatState = {
  channel: RealtimeChannel
  messages: DMMessage[]
  isSubscribed: boolean
  isTyping: boolean
  lastMessageAt: string | null
  hasLoadingHistory: boolean
}

export type TypingEvent = {
  user_id: string
  is_typing: boolean
  chat_id: string
}

export type DMStore = {
  activeChats: Record<Tables<'users'>['id'], DMChatState>
  currentUserId: Tables<'users'>['id'] | null
  openDM: (currentUserId: Tables<'users'>['id'], targetUserId: Tables<'users'>['id']) => Promise<void>
  sendMessage: (targetUserId: Tables<'users'>['id'], message: Tables<'messages'>['content']) => Promise<void>
  closeDM: (targetUserId: Tables<'users'>['id']) => Promise<void>
  setTyping: (targetUserId: Tables<'users'>['id'], isTyping: boolean) => void
  loadMessageHistory: (targetUserId: Tables<'users'>['id']) => Promise<void>
  getChatWithUser: (targetUserId: Tables<'users'>['id']) => DMChatState | null
  cleanup: () => void
}
