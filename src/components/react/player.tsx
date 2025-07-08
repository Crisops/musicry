import { useRef } from 'react'
import { useCurrentSong } from '@/hooks/use-current-song'
import CurrentSong from '@/components/react/current-song'
import ProgressSlider from '@/components/react/progress-slider'
import PlaybackControls from '@/components/react/playback-controls'
import VolumenControl from '@/components/react/volumen-control'

const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { playNext, playPrevious } = useCurrentSong({ audioRef })

  return (
    <section className="relative hidden h-full w-full items-center justify-between lg:flex">
      <audio ref={audioRef} />
      <CurrentSong />
      <div className="flex flex-grow basis-0 items-center justify-center">
        <div className="flex w-full max-w-2xl flex-col items-center justify-center">
          <PlaybackControls playNext={playNext} playPrevious={playPrevious} />
          <ProgressSlider audioRef={audioRef} />
        </div>
      </div>
      <div className="hidden w-80 pr-3 2xl:block">
        <VolumenControl audioRef={audioRef} />
      </div>
    </section>
  )
}

export default Player
