import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { usePlaySong } from '@/hooks/use-store'

interface useAudioSeekProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
}

export const useAudioSeek = ({ audioRef }: useAudioSeekProps) => {
  const { song } = usePlaySong(
    useShallow((s) => {
      return {
        song: s.shuffle ? s.shufflePlaylist?.song : s.currentSong?.song,
      }
    }),
  )
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragTime, setDragTime] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)

  const handleSeekChange = (value: number | number[]) => {
    if (!isDragging) {
      setIsDragging(true)
    }
    const currentTime = Array.isArray(value) ? value[0] : value
    setDragTime(currentTime)
  }

  const handleSeekEnd = (value: number | number[]) => {
    if (!audioRef.current) return
    const currentTime = Array.isArray(value) ? value[0] : value
    setCurrentTime(currentTime)
    setIsDragging(false)
    setDragTime(0)
    audioRef.current.currentTime = currentTime
  }

  useEffect(() => {
    if (!audioRef.current) return

    const audioElement = audioRef.current

    const updateCurrentTime = () => {
      if (!isDragging) {
        setCurrentTime(audioElement.currentTime)
      }
    }

    audioElement.addEventListener('timeupdate', updateCurrentTime)

    return () => {
      audioElement.removeEventListener('timeupdate', updateCurrentTime)
    }
  }, [isDragging, song?.id])

  return {
    currentTime,
    duration: song?.duration ?? 0,
    displayTime: isDragging ? dragTime : currentTime,
    isDragging,
    handleSeekChange,
    handleSeekEnd,
  }
}
