import { ChevronDown } from 'lucide-react'
import type { Song } from '@/types/store.types'
import type { useAudioSeek } from '@/hooks/use-audio-seek'
import { useCurrentSong } from '@/hooks/use-current-song'
import Button from '@/components/shared/button'
import PlaybackControls from '@/components/react/playback-controls'
import ProgressSlider from '@/components/react/progress-slider'

interface PlayerCurrentSongMovileProps {
  onExpand: () => void
  currentSong?: Song | null
  audioSeekState: ReturnType<typeof useAudioSeek>
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const PlayerCurrentSongMovile = ({ onExpand, currentSong, audioSeekState, audioRef }: PlayerCurrentSongMovileProps) => {
  const { playNext, playPrevious } = useCurrentSong({ audioRef })

  return (
    <>
      <div className="absolute -z-[1] h-full w-full bg-black/70" />
      <Button onPress={onExpand} isIconOnly disableAnimation className="absolute top-80 left-5 z-50 bg-transparent">
        <ChevronDown color="white" size={28} />
      </Button>
      <section
        data-expanded-song
        className="flex h-screen w-full translate-y-70 flex-col items-center justify-center gap-3 px-7"
      >
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-2">
            {currentSong && currentSong.imageUrl && (
              <img
                className="pointer-events-none aspect-square h-auto w-96 object-cover md:w-104"
                src={currentSong.imageUrl}
                alt={`${currentSong.title} - ${currentSong.artist}`}
              />
            )}
            <div className="flex w-full items-center">
              <div className="flex flex-col items-start">
                <h4 className="text-medium sm:text-large font-bold text-white">{currentSong?.title}</h4>
                <p className="sm:text-medium pb-2 text-xs text-white/70">{currentSong?.artist}</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <ProgressSlider
              classNames={{
                base: ['opacity-100'],
                filler: ['bg-blue-argentinian'],
                thumb: [
                  'transition-opacity opacity-0 duration-200 group-hover:opacity-100 w-2 h-2 cursor-default after:w-2 after:h-2 data-[pressed=true]:cursor-default data-[dragging=true]:cursor-default',
                ],
                track: [
                  'group bg-blue-oxford data-[fill-start=true]:border-s-blue-argentinian data-[fill-end=true]:border-e-blue-argentinian border-x-[calc(theme(spacing.0)/2)] my-0',
                ],
                startContent: ['text-platinum text-xs'],
                endContent: ['text-platinum text-xs'],
              }}
              audioRef={audioRef}
              audioSeekState={audioSeekState}
            />
            <PlaybackControls
              playNext={playNext}
              playPrevious={playPrevious}
              sizeIcon={{ shuffle: 22, 'play-previous': 22, 'play-next': 22, repeat: 22, 'play-pause': 22 }}
              className="mt-5 justify-around gap-8 sm:justify-center sm:gap-15"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default PlayerCurrentSongMovile
