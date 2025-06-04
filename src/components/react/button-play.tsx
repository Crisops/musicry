import type { ButtonProps } from '@heroui/button'
import { Play } from 'lucide-react'
import Button from '@/components/shared/button'

interface ButtonPropsPlay extends ButtonProps {
  sizeIcon?: number
}

const ButtonPlay = ({ sizeIcon = 16, ...props }: ButtonPropsPlay) => {
  return (
    <Button {...props} isIconOnly variant="solid">
      <Play fill="currentColor" size={sizeIcon} color="currentColor" />
    </Button>
  )
}

export default ButtonPlay
