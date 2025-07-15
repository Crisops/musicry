import type { HTMLProps } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'
import { Play, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAudioContext } from '@/hooks/use-audio-context'
import { usePlaySong } from '@/hooks/use-store'
import { usePlaybackControls } from '@/hooks/use-playback-controls'
import CurrentSong from '@/components/react/current-song'
import ProgressSlider from '@/components/react/progress-slider'
import PlaybackIconButton from '@/components/react/playback-icon-button'

const PlayerMovilePanel = ({
  className,
  onExpand,
}: {
  className?: HTMLProps<HTMLDivElement>['className']
  onExpand: () => void
}) => {
  const { isPlaying, currentSong } = usePlaySong(
    useShallow((state) => ({
      isPlaying: state.isPlaying,
      currentSong: state.currentSong,
    })),
  )
  const { handlePlaying } = usePlaybackControls()
  const { audioRef } = useAudioContext()
  return (
    <AnimatePresence mode="wait">
      {currentSong?.song && (
        <motion.div
          key={currentSong.song.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={onExpand}
          className={cn('flex items-center justify-between', className)}
        >
          <div className="text-current">
            <CurrentSong className="items-center gap-1.5 px-2 py-1.5" />
            <ProgressSlider
              isDisabled
              classNames={{
                base: ['absolute bottom-0 opacity-100'],
                filler: ['bg-blue-argentinian'],
                track: [
                  'group bg-blue-oxford data-[fill-start=true]:border-s-blue-argentinian data-[fill-end=true]:border-e-blue-argentinian border-x-[calc(theme(spacing.0)/2)] my-0',
                ],
              }}
              hideThumb
              audioRef={audioRef}
              disabledContent
            />
          </div>
          <div className="pr-4">
            <PlaybackIconButton className="h-12 w-12 min-w-12 text-current" onPress={handlePlaying}>
              {isPlaying ? (
                <Pause fill="currentColor" size={18} color="currentColor" />
              ) : (
                <Play fill="currentColor" size={18} color="currentColor" />
              )}
            </PlaybackIconButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PlayerMovilePanel
