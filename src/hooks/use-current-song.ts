import { useEffect, useCallback, useState, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { usePlaySong } from '@/hooks/use-store'
import type { Song } from '@/types/store.types'

interface useCurrentSongProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
}

export const useCurrentSong = ({ audioRef }: useCurrentSongProps) => {
  const {
    isPlaying,
    currentSong,
    shuffle,
    shufflePlaylist,
    volume,
    repeat,
    setIsPlaying,
    setCurrentSong,
    setShufflePlaylist,
  } = usePlaySong(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      currentSong: state.currentSong,
      shuffle: state.shuffle,
      shufflePlaylist: state.shufflePlaylist,
      volume: state.volume,
      repeat: state.repeat,
      setIsPlaying: state.setIsPlaying,
      setCurrentSong: state.setCurrentSong,
      setShufflePlaylist: state.setShufflePlaylist,
    })),
  )
  const [repeatCount, setRepeatCount] = useState<number>(0)

  const currentIndex = useMemo(() => {
    const currentSongList = shuffle ? shufflePlaylist : currentSong
    if (!currentSongList?.song || !currentSongList?.playlist?.length) return -1
    return currentSongList.playlist.findIndex((song) => song.id === currentSongList.song?.id)
  }, [currentSong?.song?.id, currentSong?.playlist, shuffle, shufflePlaylist])

  const getNextSong = useCallback((): Song | null => {
    const currentSongList = shuffle ? shufflePlaylist : currentSong
    if (!currentSongList?.playlist?.length || currentIndex === -1) return null
    const isLast = currentIndex === currentSongList.playlist.length - 1
    return isLast ? currentSongList.playlist[0] : currentSongList.playlist[currentIndex + 1]
  }, [currentSong?.playlist, currentIndex, shuffle, shufflePlaylist])

  const getPreviousSong = useCallback((): Song | null => {
    const currentSongList = shuffle ? shufflePlaylist : currentSong
    if (!currentSongList?.playlist?.length || currentIndex === -1) return null
    const isFirst = currentIndex === 0
    return isFirst
      ? currentSongList.playlist[currentSongList.playlist.length - 1]
      : currentSongList.playlist[currentIndex - 1]
  }, [currentSong?.playlist, currentIndex, shuffle, shufflePlaylist])

  const playNext = useCallback(() => {
    const next = getNextSong()
    if (next) {
      if (shuffle && shufflePlaylist?.playlist) {
        setShufflePlaylist({ song: next, playlist: shufflePlaylist.playlist })
      } else if (currentSong?.playlist) {
        setCurrentSong({ song: next, playlist: currentSong.playlist })
      }
    }
  }, [getNextSong, shuffle, shufflePlaylist, currentSong, setCurrentSong, setShufflePlaylist])

  const playPrevious = useCallback(() => {
    const prev = getPreviousSong()
    if (prev) {
      if (shuffle && shufflePlaylist?.playlist) {
        setShufflePlaylist({ song: prev, playlist: shufflePlaylist.playlist })
      } else if (currentSong?.playlist) {
        setCurrentSong({ song: prev, playlist: currentSong.playlist })
      }
    }
  }, [getPreviousSong, shuffle, shufflePlaylist, currentSong, setCurrentSong, setShufflePlaylist])

  useEffect(() => {
    if (!audioRef.current) return

    const song = shuffle ? shufflePlaylist?.song : currentSong?.song
    if (!song?.audioUrl) return

    if (audioRef.current.src !== song.audioUrl) {
      audioRef.current.src = song.audioUrl
      audioRef.current.load()
      audioRef.current.volume = volume / 100
    }
  }, [currentSong?.song?.id, shufflePlaylist?.song?.id])

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error('Error al reproducir:', err)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentSong?.song?.id, shufflePlaylist?.song?.id, setIsPlaying])

  useEffect(() => {
    if (!audioRef.current || !currentSong?.song) return

    const handleAudioEnded = () => {
      switch (repeat) {
        case 'none':
          playNext()
          break
        case 'one':
          if (repeatCount < 1) {
            audioRef.current!.currentTime = 0
            audioRef.current!.play()
            setRepeatCount((prev) => prev + 1)
          } else {
            setRepeatCount(0)
            playNext()
          }
          break
        case 'all':
          audioRef.current!.currentTime = 0
          audioRef.current!.play()
          break
      }
    }

    audioRef.current.addEventListener('ended', handleAudioEnded)

    return () => {
      audioRef.current?.removeEventListener('ended', handleAudioEnded)
    }
  }, [currentSong?.song?.id, playNext, repeat, repeatCount])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume / 100
  }, [volume])

  return {
    playNext,
    playPrevious,
  }
}
