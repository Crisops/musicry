import Button from '@/components/shared/button'
import {
  type PopoverProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/popover'

interface Props extends PopoverProps {
  trigger: React.ReactNode
}

export default function PopoverLogOut({ children, trigger, ...props }: Props) {
  return (
    <Popover {...props}>
      <PopoverTrigger>
        <Button isIconOnly radius="full" size="sm">
          {trigger}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-rich-black-dark p-1.5">
        {children}
      </PopoverContent>
    </Popover>
  )
}
