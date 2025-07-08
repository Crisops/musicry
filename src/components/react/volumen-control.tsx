import { useCallback, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Volume2, Volume1, Volume } from 'lucide-react'
import { usePlaySong } from '@/hooks/use-store'
import { Slider } from '@heroui/slider'
import Button from '@/components/shared/button'

const VolumenControl = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement | null> }) => {
  const { volume, setVolume } = usePlaySong(
    useShallow((state) => ({
      volume: state.volume,
      setVolume: state.setVolume,
    })),
  )

  const Icon = volume === 0 ? Volume : volume < 50 ? Volume1 : Volume2
  const previousVolumeRef = useRef(volume)

  const handleMuted = useCallback(() => {
    if (!audioRef.current) return
    if (volume === 0) {
      setVolume(previousVolumeRef.current)
      audioRef.current.volume = previousVolumeRef.current / 100
    } else {
      setVolume(0)
      audioRef.current.volume = 0
    }
  }, [volume, setVolume])

  const handleVolumeChange = useCallback(
    (value: number | number[]) => {
      const newVolume = Array.isArray(value) ? value[0] : value
      setVolume(newVolume)
      if (newVolume > 0) previousVolumeRef.current = newVolume
    },
    [setVolume],
  )

  return (
    <div className="flex items-center justify-end">
      <Slider
        defaultValue={[previousVolumeRef.current]}
        value={[volume]}
        size="sm"
        disableThumbScale
        startContent={
          <Button
            onPress={handleMuted}
            isIconOnly
            variant="solid"
            className="text-platinum relative h-6 w-6 min-w-6 bg-transparent"
          >
            <Icon size={16} color="currentColor" />
          </Button>
        }
        minValue={0}
        maxValue={100}
        aria-label="Volumen"
        classNames={{
          filler: ['bg-blue-argentinian'],
          base: ['max-w-36'],
          thumb: [
            'transition-opacity opacity-0 duration-200 group-hover:opacity-100 w-2 h-2 cursor-default after:w-2 after:h-2 data-[pressed=true]:cursor-default before:w-3 before:h-3 data-[dragging=true]:cursor-default',
          ],
          track: [
            'group bg-blue-oxford data-[fill-start=true]:border-s-blue-argentinian data-[fill-end=true]:border-e-blue-argentinian border-x-[calc(theme(spacing.0)/2)]',
          ],
          startContent: ['text-platinum text-xs'],
        }}
        onChange={handleVolumeChange}
        showTooltip
        tooltipProps={{
          classNames: {
            base: ['before:bg-blue-argentinian'],
            content: ['text-platinum bg-blue-argentinian'],
          },
        }}
      />
    </div>
  )
}

export default VolumenControl
