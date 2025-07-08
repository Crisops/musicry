import { memo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Pause, Play } from 'lucide-react'
import axiosClient from '@/lib/axios/client'
import { usePlaySong } from '@/hooks/use-store'
import type { PlaySongCurrent } from '@/types/store.types'
import type { Tables } from '@/types/database.types'
import { Toast } from '@/utils/toast'
import type { ButtonProps } from '@heroui/button'
import Button from '@/components/shared/button'

interface ButtonPropsPlay extends ButtonProps {
  id: Tables<'songs'>['id'] | Tables<'albums'>['id']
  sizeIcon?: number
}

const ButtonPlay = ({ id, sizeIcon = 16, ...props }: ButtonPropsPlay) => {
  const { isCurrentSong, isPlayingPlayList, setCurrentSong, setIsPlaying } = usePlaySong(
    useShallow((s) => {
      const isCurrentSong = s.currentSong?.song?.id === id || s.currentSong?.song?.album?.id === id
      return {
        isCurrentSong,
        isPlayingPlayList: s.isPlaying && isCurrentSong,
        setCurrentSong: s.setCurrentSong,
        setIsPlaying: s.setIsPlaying,
      }
    }),
  )

  const handlePlaySong = async () => {
    if (isCurrentSong) return setIsPlaying(!isPlayingPlayList)
    const result = await axiosClient.get<PlaySongCurrent>('/api/songs', { params: { id } })
    if (!result.success) {
      console.error(result.error)
      Toast().error({
        title: '¡Ups!',
        description: result.error.message,
      })
      return
    }
    setIsPlaying(true)
    setCurrentSong(result.data)
  }

  return (
    <Button onPress={handlePlaySong} {...props} isIconOnly variant="solid">
      {isPlayingPlayList ? (
        <Pause fill="currentColor" size={sizeIcon} color="currentColor" />
      ) : (
        <Play fill="currentColor" size={sizeIcon} color="currentColor" />
      )}
    </Button>
  )
}

export default memo(ButtonPlay)
