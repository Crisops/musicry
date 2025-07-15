import { Slider, type SliderProps } from '@heroui/slider'
import { useAudioSeek } from '@/hooks/use-audio-seek'
import { formatDuration } from '@/utils/format-duration'

interface ProgressSliderProps extends SliderProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
  disabledContent?: boolean
  audioSeekState?: ReturnType<typeof useAudioSeek>
}

const ProgressSlider = ({ audioRef, disabledContent = false, audioSeekState, ...props }: ProgressSliderProps) => {
  const internalAudioSeekState = useAudioSeek({ audioRef })
  const { displayTime, duration, handleSeekChange, handleSeekEnd } = audioSeekState || internalAudioSeekState

  return (
    <Slider
      {...props}
      aria-label="Control de reproducción"
      defaultValue={[0]}
      value={[displayTime]}
      startContent={disabledContent ? null : formatDuration(displayTime)}
      endContent={disabledContent ? null : formatDuration(duration)}
      minValue={0}
      maxValue={duration}
      disableThumbScale
      size="sm"
      onChange={handleSeekChange}
      onChangeEnd={handleSeekEnd}
    />
  )
}

export default ProgressSlider
