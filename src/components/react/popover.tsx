import Button from '@/components/shared/button'
import {
  type PopoverProps,
  Popover as PopoverHero,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/popover'

interface Props extends PopoverProps {
  trigger: React.ReactNode
}

export default function Popover({ children, trigger, ...props }: Props) {
  return (
    <PopoverHero {...props}>
      <PopoverTrigger>
        <Button isIconOnly radius="full" size="sm">
          {trigger}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-rich-black-dark p-1.5">
        {children}
      </PopoverContent>
    </PopoverHero>
  )
}
