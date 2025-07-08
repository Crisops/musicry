import { usePlaySong } from '@/hooks/use-store'
import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const usePlaybackControls = () => {
  const { isPlaying, repeat, setIsPlaying, setRepeat } = usePlaySong(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      repeat: state.repeat,
      setIsPlaying: state.setIsPlaying,
      setRepeat: state.setRepeat,
    })),
  )

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

  return { handlePlaying, handleRepeat }
}
