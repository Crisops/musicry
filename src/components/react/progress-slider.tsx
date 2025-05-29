import { Slider } from '@heroui/slider'
const ProgressSlider = () => {
  return (
    <Slider
      startContent="00:00"
      endContent="03:00"
      minValue={0}
      maxValue={100}
      aria-label="Control de reproducción"
      classNames={{
        filler: ['bg-blue-argentinian'],
        thumb: [
          'transition-opacity opacity-0 duration-200 group-hover:opacity-100 w-2 h-2 cursor-default after:w-2 after:h-2 data-[pressed=true]:cursor-default',
        ],
        track: [
          'group bg-blue-oxford data-[fill-start=true]:border-s-blue-argentinian data-[fill-end=true]:border-e-blue-argentinian border-x-[calc(theme(spacing.0)/2)]',
        ],
        startContent: ['text-platinum text-xs'],
        endContent: ['text-platinum text-xs'],
      }}
      disableThumbScale
      size="sm"
    />
  )
}

export default ProgressSlider
