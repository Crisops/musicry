import { cn } from '@/lib/utils'
import {
  type ButtonProps as ButtonPropsHero,
  Button as ButtonHero,
} from '@heroui/button'

export interface ButtonProps extends ButtonPropsHero {
  children: React.ReactNode
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <ButtonHero
      className={cn(
        'data-[hover=true]:opacity-disabled data-[hover=true]:hover:opacity-100',
        props.className,
      )}
      {...props}
    >
      {children}
    </ButtonHero>
  )
}

export default Button
