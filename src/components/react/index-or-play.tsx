import type { Tables } from '@/types/database.types'
import { usePlaySong } from '@/hooks/use-store'
import { useShallow } from 'zustand/react/shallow'
import ButtonPlay from '@/components/react/button-play'

interface IndexOrPlayProps {
  trackId: Tables<'songs'>['id']
  index: string
}

export const IndexOrPlay = ({ trackId, index }: IndexOrPlayProps) => {
  const { isCurrentSong } = usePlaySong(
    useShallow((s) => {
      const activePlaylist = s.shuffle ? s.shufflePlaylist : s.currentSong
      const isCurrentSong = activePlaylist?.song?.id === trackId
      return {
        isCurrentSong,
      }
    }),
  )
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {!isCurrentSong && (
        <span className="transition-opacity group-aria-[selected=false]/tr:group-data-[hover=true]/tr:opacity-0">
          {index}
        </span>
      )}

      {!isCurrentSong && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-aria-[selected=false]/tr:group-data-[hover=true]/tr:opacity-100">
          <ButtonPlay
            id={trackId}
            source={isCurrentSong ? 'playlist' : 'albums'}
            sizeIcon={14}
            className="text-blue-argentinian bg-transparent"
          />
        </div>
      )}

      {isCurrentSong && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ButtonPlay
            id={trackId}
            source={isCurrentSong ? 'playlist' : 'albums'}
            sizeIcon={14}
            className="text-blue-argentinian bg-transparent group-aria-[selected=true]/tr:group-data-[hover=true]/tr:inline-flex"
          />
        </div>
      )}
    </div>
  )
}
