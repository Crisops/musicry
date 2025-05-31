import type { ButtonProps } from '@heroui/button'
import { Play } from 'lucide-react'
import Button from '@/components/shared/button'

const ButtonPlay = ({ ...props }: ButtonProps) => {
  return (
    <Button {...props} isIconOnly variant="solid">
      <Play fill="currentColor" size={16} color="currentColor" />
    </Button>
  )
}

export default ButtonPlay
