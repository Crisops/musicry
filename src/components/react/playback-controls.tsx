import { Play, Shuffle, SkipBack, SkipForward, Repeat } from 'lucide-react'
import PlaybackIconButton from './playback-icon-button'

const PlaybackControls = () => {
  return (
    <div className="flex w-full items-center justify-center gap-6">
      <PlaybackIconButton>
        <Shuffle size={16} />
      </PlaybackIconButton>
      <div className="flex items-center justify-center gap-3">
        <PlaybackIconButton>
          <SkipBack fill="currentColor" size={18} />
        </PlaybackIconButton>
        <PlaybackIconButton className="bg-platinum h-10 w-10 min-w-10 text-black">
          <Play fill="currentColor" size={16} color="currentColor" />
        </PlaybackIconButton>
        <PlaybackIconButton>
          <SkipForward fill="currentColor" size={18} />
        </PlaybackIconButton>
      </div>
      <PlaybackIconButton>
        <Repeat size={16} />
      </PlaybackIconButton>
    </div>
  )
}

export default PlaybackControls
