import type { HTMLProps } from 'react'
import { Play, Shuffle, SkipBack, SkipForward, Repeat, Pause, Repeat1 } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { cn } from '@/lib/utils'
import { usePlaySong } from '@/hooks/use-store'
import { usePlaybackControls } from '@/hooks/use-playback-controls'
import PlaybackIconButton from '@/components/react/playback-icon-button'

interface PlaybackControlsProps {
  playNext: () => void
  playPrevious: () => void
  sizeIcon?: Partial<Record<'shuffle' | 'play-previous' | 'play-next' | 'repeat' | 'play-pause', number>>
  className?: HTMLProps<HTMLDivElement>['className']
}

const PlaybackControls = ({ playNext, playPrevious, sizeIcon, className }: PlaybackControlsProps) => {
  const { isPlaying, repeat, shuffle } = usePlaySong(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      repeat: state.repeat,
      shuffle: state.shuffle,
    })),
  )
  const { handlePlaying, handleRepeat, handleShuffle } = usePlaybackControls()
  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      <PlaybackIconButton
        isIconOnly
        onPress={handleShuffle}
        className={`${shuffle ? 'text-blue-argentinian' : 'text-white'}`}
      >
        <Shuffle size={sizeIcon?.['shuffle'] ?? 16} color="currentColor" />
      </PlaybackIconButton>
      <div className="flex items-center justify-center gap-6 lg:gap-4">
        <PlaybackIconButton isIconOnly onPress={playPrevious} aria-label="Reproducir canción anterior">
          <SkipBack fill="currentColor" size={sizeIcon?.['play-previous'] ?? 18} />
        </PlaybackIconButton>
        <PlaybackIconButton
          isIconOnly
          className="bg-platinum h-14 w-14 min-w-14 text-black lg:h-10 lg:w-10 lg:min-w-10"
          onPress={handlePlaying}
        >
          {isPlaying ? (
            <Pause fill="currentColor" size={sizeIcon?.['play-pause'] ?? 16} color="currentColor" />
          ) : (
            <Play fill="currentColor" size={sizeIcon?.['play-pause'] ?? 16} color="currentColor" />
          )}
        </PlaybackIconButton>
        <PlaybackIconButton isIconOnly onPress={playNext} aria-label="Reproducir canción siguiente">
          <SkipForward fill="currentColor" size={sizeIcon?.['play-next'] ?? 18} />
        </PlaybackIconButton>
      </div>
      <PlaybackIconButton
        isIconOnly
        className={`${repeat !== 'none' ? 'text-blue-argentinian' : 'text-white'}`}
        onPress={handleRepeat}
      >
        {repeat !== 'all' ? (
          <Repeat color="currentColor" size={sizeIcon?.['repeat'] ?? 16} />
        ) : (
          <Repeat1 color="currentColor" size={sizeIcon?.['repeat'] ?? 16} />
        )}
      </PlaybackIconButton>
    </div>
  )
}

export default PlaybackControls
