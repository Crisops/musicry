import Button, { type ButtonProps } from '@/components/shared/button'
import { cn } from '@/lib/utils'

const PlaybackIconButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button
      isIconOnly
      radius="full"
      variant="solid"
      disableAnimation
      className={cn(
        'h-fit w-fit min-w-fit bg-transparent text-white',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export default PlaybackIconButton
