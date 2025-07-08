import { Slider } from '@heroui/slider'
import { useAudioSeek } from '@/hooks/use-audio-seek'
import { formatDuration } from '@/utils/format-duration'

interface ProgressSliderProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const ProgressSlider = ({ audioRef }: ProgressSliderProps) => {
  const { displayTime, duration, handleSeekChange, handleSeekEnd } = useAudioSeek({ audioRef })

  return (
    <Slider
      aria-label="Control de reproducción"
      defaultValue={[0]}
      value={[displayTime]}
      startContent={formatDuration(displayTime)}
      endContent={formatDuration(duration)}
      minValue={0}
      maxValue={duration}
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
      disableThumbScale
      size="sm"
      onChange={handleSeekChange}
      onChangeEnd={handleSeekEnd}
    />
  )
}

export default ProgressSlider
