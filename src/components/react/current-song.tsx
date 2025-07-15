import type { HTMLProps } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { cn } from '@/lib/utils'
import { usePlaySong } from '@/hooks/use-store'

interface CurrentSongProps {
  className?: HTMLProps<HTMLElement>['className']
}

const CurrentSong = ({ className }: CurrentSongProps) => {
  const { song } = usePlaySong(
    useShallow((s) => ({
      song: s.shuffle ? s.shufflePlaylist?.song : s.currentSong?.song,
    })),
  )

  return (
    <article className={cn('flex', className)}>
      <div className="relative aspect-square h-auto w-11">
        {song?.imageUrl && (
          <img
            className="absolute h-full w-full rounded-md object-cover"
            src={song.imageUrl}
            alt={`${song.title} - ${song.artist}`}
            width={44}
            height={44}
          />
        )}
      </div>
      <div className="flex-initial flex-col items-start justify-center">
        <h4 className="text-small font-semibold text-current">{song?.title}</h4>
        <p className="text-xs text-current">{song?.artist}</p>
      </div>
    </article>
  )
}

export default CurrentSong
