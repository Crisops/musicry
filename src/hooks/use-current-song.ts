import { useEffect, useCallback, useState, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { usePlaySong } from '@/hooks/use-store'
import type { PlaySongCurrent } from '@/types/store.types'

interface useCurrentSongProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
}

export const useCurrentSong = ({ audioRef }: useCurrentSongProps) => {
  const { isPlaying, currentSong, setIsPlaying, setCurrentSong, volume, repeat } = usePlaySong(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      currentSong: state.currentSong,
      setIsPlaying: state.setIsPlaying,
      setCurrentSong: state.setCurrentSong,
      volume: state.volume,
      repeat: state.repeat,
    })),
  )
  const [repeatCount, setRepeatCount] = useState<number>(0)

  const currentIndex = useMemo(() => {
    if (!currentSong?.song || !currentSong?.playlist?.length) return -1
    return currentSong.playlist.findIndex((song) => song.id === currentSong.song?.id)
  }, [currentSong?.song?.id, currentSong?.playlist])

  const getNextSong = useCallback((): PlaySongCurrent['song'] | null => {
    if (!currentSong?.playlist?.length || currentIndex === -1) return null
    const isLast = currentIndex === currentSong.playlist.length - 1
    return isLast ? currentSong.playlist[0] : currentSong.playlist[currentIndex + 1]
  }, [currentSong?.playlist, currentIndex])

  const getPreviousSong = useCallback((): PlaySongCurrent['song'] | null => {
    if (!currentSong?.playlist?.length || currentIndex === -1) return null
    const isFirst = currentIndex === 0
    return isFirst ? currentSong.playlist[currentSong.playlist.length - 1] : currentSong.playlist[currentIndex - 1]
  }, [currentSong?.playlist, currentIndex])

  const playNext = useCallback(() => {
    const next = getNextSong()
    if (next && currentSong) {
      setCurrentSong({ song: next, playlist: currentSong.playlist })
    }
  }, [getNextSong, currentSong?.playlist, setCurrentSong])

  const playPrevious = useCallback(() => {
    const prev = getPreviousSong()
    if (prev && currentSong) {
      setCurrentSong({ song: prev, playlist: currentSong.playlist })
    }
  }, [getPreviousSong, currentSong?.playlist, setCurrentSong])

  useEffect(() => {
    if (!audioRef.current || !currentSong?.song?.audioUrl) return

    audioRef.current.src = currentSong.song.audioUrl
    audioRef.current.load()
  }, [currentSong?.song?.audioUrl])

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
  }, [isPlaying, currentSong?.song?.id, setIsPlaying])

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
