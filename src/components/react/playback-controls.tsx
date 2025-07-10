import { Play, Shuffle, SkipBack, SkipForward, Repeat, Pause, Repeat1 } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { usePlaySong } from '@/hooks/use-store'
import { usePlaybackControls } from '@/hooks/use-playback-controls'
import PlaybackIconButton from '@/components/react/playback-icon-button'

interface PlaybackControlsProps {
  playNext: () => void
  playPrevious: () => void
}

const PlaybackControls = ({ playNext, playPrevious }: PlaybackControlsProps) => {
  const { isPlaying, repeat, shuffle } = usePlaySong(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      repeat: state.repeat,
      shuffle: state.shuffle,
    })),
  )
  const { handlePlaying, handleRepeat, handleShuffle } = usePlaybackControls()
  return (
    <div className="flex w-full items-center justify-center gap-6">
      <PlaybackIconButton onPress={handleShuffle} className={`${shuffle ? 'text-blue-argentinian' : 'text-white'}`}>
        <Shuffle size={16} color="currentColor" />
      </PlaybackIconButton>
      <div className="flex items-center justify-center gap-3">
        <PlaybackIconButton onPress={playPrevious} aria-label="Reproducir canción anterior">
          <SkipBack fill="currentColor" size={18} />
        </PlaybackIconButton>
        <PlaybackIconButton className="bg-platinum h-10 w-10 min-w-10 text-black" onPress={handlePlaying}>
          {isPlaying ? (
            <Pause fill="currentColor" size={16} color="currentColor" />
          ) : (
            <Play fill="currentColor" size={16} color="currentColor" />
          )}
        </PlaybackIconButton>
        <PlaybackIconButton onPress={playNext} aria-label="Reproducir canción siguiente">
          <SkipForward fill="currentColor" size={18} />
        </PlaybackIconButton>
      </div>
      <PlaybackIconButton
        className={`${repeat !== 'none' ? 'text-blue-argentinian' : 'text-white'}`}
        onPress={handleRepeat}
      >
        {repeat !== 'all' ? <Repeat color="currentColor" size={16} /> : <Repeat1 color="currentColor" size={16} />}
      </PlaybackIconButton>
    </div>
  )
}

export default PlaybackControls
