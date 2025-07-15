import { useAuth, usePlaySong } from '@/hooks/use-store'
import { useCurrentSong } from '@/hooks/use-current-song'
import CurrentSong from '@/components/react/current-song'
import ProgressSlider from '@/components/react/progress-slider'
import PlaybackControls from '@/components/react/playback-controls'
import VolumenControl from '@/components/react/volumen-control'
import { useAudioContext } from '@/hooks/use-audio-context'

const Player = () => {
  const user = useAuth((state) => state.user)
  const { audioRef } = useAudioContext()
  const { playNext, playPrevious } = useCurrentSong({ audioRef })
  const currentSong = usePlaySong((state) => state.currentSong)

  return (
    <>
      {currentSong?.song && user && (
        <section className="relative hidden h-full w-full items-center justify-between lg:flex">
          <audio ref={audioRef} />
          <CurrentSong className="[&_h4]:text-sealsalt [&_p]:text-gray-dim w-80 items-center gap-1.5 py-1.5" />
          <div className="flex flex-grow basis-0 items-center justify-center">
            <div className="flex w-full max-w-2xl flex-col items-center justify-center">
              <PlaybackControls playNext={playNext} playPrevious={playPrevious} className="gap-6" />
              <ProgressSlider
                audioRef={audioRef}
                classNames={{
                  filler: ['bg-blue-argentinian'],
                  thumb: [
                    'transition-opacity opacity-0 duration-200 group-hover:opacity-100 w-2 h-2 cursor-default after:w-2 after:h-2 data-[pressed=true]:cursor-default data-[dragging=true]:cursor-default',
                  ],
                  track: [
                    'group bg-blue-oxford data-[fill-start=true]:border-s-blue-argentinian data-[fill-end=true]:border-e-blue-argentinian border-x-[calc(theme(spacing.0)/2)] ',
                  ],
                  startContent: ['text-platinum text-xs'],
                  endContent: ['text-platinum text-xs'],
                }}
              />
            </div>
          </div>
          <div className="hidden w-80 pr-3 2xl:block">
            <VolumenControl audioRef={audioRef} />
          </div>
        </section>
      )}
    </>
  )
}

export default Player
