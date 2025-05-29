import { Volume2 } from 'lucide-react'
import { Slider } from '@heroui/slider'
import Button from '@/components/shared/button'

const VolumenControl = () => {
  return (
    <div className="flex items-center justify-end">
      <Slider
        size="sm"
        disableThumbScale
        startContent={
          <Button
            isIconOnly
            variant="solid"
            className="text-platinum relative h-6 w-6 min-w-6 bg-transparent"
          >
            <Volume2 size={16} color="currentColor" />
          </Button>
        }
        minValue={0}
        maxValue={100}
        aria-label="Volumen"
        classNames={{
          filler: ['bg-blue-argentinian'],
          base: ['max-w-36'],
          thumb: [
            'transition-opacity opacity-0 duration-200 group-hover:opacity-100 w-2 h-2 cursor-default after:w-2 after:h-2 data-[pressed=true]:cursor-default before:w-3 before:h-3',
          ],
          track: [
            'group bg-blue-oxford data-[fill-start=true]:border-s-blue-argentinian data-[fill-end=true]:border-e-blue-argentinian border-x-[calc(theme(spacing.0)/2)]',
          ],
          startContent: ['text-platinum text-xs'],
        }}
      />
    </div>
  )
}

export default VolumenControl
