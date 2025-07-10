import { useCallback, useEffect } from 'react'
import type { Song } from '@/types/store.types'
import { usePlaySong } from '@/hooks/use-store'
import { shuffleMix } from '@/utils/shuffle-mix'

export const usePlaybackControls = () => {
  const {
    currentSong,
    isPlaying,
    repeat,
    shuffle,
    shufflePlaylist,
    originalPlaylist,
    setCurrentSong,
    setIsPlaying,
    setRepeat,
    setShuffle,
    setShufflePlaylist,
    setOriginalPlaylist,
  } = usePlaySong((state) => state)

  useEffect(() => {
    if (!shuffle || !currentSong?.playlist || shufflePlaylist?.playlist) return

    const shuffled = shuffleMix<Song>(currentSong.playlist)
    setShufflePlaylist({ song: currentSong.song, playlist: shuffled })
  }, [shuffle])

  const handlePlaying = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying, setIsPlaying])

  const handleRepeat = useCallback(() => {
    if (repeat === 'none') {
      setRepeat('one')
    } else if (repeat === 'one') {
      setRepeat('all')
    } else if (repeat === 'all') {
      setRepeat('none')
    }
  }, [repeat, setRepeat])

  const handleShuffle = useCallback(() => {
    const newShuffleState = !shuffle
    setShuffle(newShuffleState)
    if (newShuffleState) {
      if (!originalPlaylist && currentSong?.playlist) {
        setOriginalPlaylist(currentSong.playlist)
      }
    } else {
      if (originalPlaylist && shufflePlaylist?.song) {
        setCurrentSong({
          song: shufflePlaylist.song,
          playlist: originalPlaylist,
        })
      }
      setShufflePlaylist(null)
      setOriginalPlaylist(null)
    }
  }, [
    shuffle,
    setShuffle,
    setShufflePlaylist,
    currentSong,
    originalPlaylist,
    shufflePlaylist,
    setCurrentSong,
    setOriginalPlaylist,
  ])

  return { handlePlaying, handleRepeat, handleShuffle }
}
