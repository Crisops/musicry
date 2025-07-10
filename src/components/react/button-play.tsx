import { memo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Pause, Play } from 'lucide-react'
import type { Tables } from '@/types/database.types'
import type { PlaySongCurrent, Song } from '@/types/store.types'
import axiosClient from '@/lib/axios/client'
import { usePlaySong } from '@/hooks/use-store'
import { shuffleMix } from '@/utils/shuffle-mix'
import { Toast } from '@/utils/toast'
import type { ButtonProps } from '@heroui/button'
import Button from '@/components/shared/button'

interface ButtonPropsPlay extends ButtonProps {
  id: Tables<'songs'>['id'] | Tables<'albums'>['id']
  sizeIcon?: number
  source: 'featured' | 'made-for-you' | 'playlist' | 'albums'
}

const ButtonPlay = ({ id, sizeIcon = 16, source, ...props }: ButtonPropsPlay) => {
  const {
    currentSong,
    isCurrentSong,
    isPlayingPlayList,
    shuffle,
    shufflePlaylist,
    setCurrentSong,
    setIsPlaying,
    setShufflePlaylist,
  } = usePlaySong(
    useShallow((s) => {
      const isCurrentSong =
        s.currentSong?.song?.id === id || s.currentSong?.song?.album?.id === id || s.shufflePlaylist?.song?.id === id
      return {
        currentSong: s.currentSong,
        isCurrentSong,
        isPlayingPlayList: s.isPlaying && isCurrentSong,
        shuffle: s.shuffle,
        shufflePlaylist: s.shufflePlaylist,
        setCurrentSong: s.setCurrentSong,
        setIsPlaying: s.setIsPlaying,
        setShufflePlaylist: s.setShufflePlaylist,
      }
    }),
  )

  const handlePlaySong = async () => {
    if (isCurrentSong) return setIsPlaying(!isPlayingPlayList)
    if (source === 'playlist') {
      const list = shuffle ? shufflePlaylist?.playlist : currentSong?.playlist
      const selectedSong = list?.find((song) => song.id === id)
      console.log('list', list)
      if (selectedSong && list) {
        if (shuffle) {
          setShufflePlaylist({ song: selectedSong, playlist: list })
        } else {
          setCurrentSong({ song: selectedSong, playlist: list })
        }
        setIsPlaying(true)
        return
      }
    }
    const result = await axiosClient.get<PlaySongCurrent>(`/api/songs/${source}`, { params: { id } })
    if (!result.success) {
      console.error(result.error)
      Toast().error({
        title: '¡Ups!',
        description: result.error.message,
      })
      return
    }
    setCurrentSong(result.data)
    if (shuffle && result.data) {
      console.log('result.data', result.data)
      const shuffled = shuffleMix<Song>(result.data.playlist)
      setShufflePlaylist({ song: result.data.song, playlist: shuffled })
    }
    setIsPlaying(true)
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
