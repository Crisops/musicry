import {
  type ButtonProps as ButtonPropsHero,
  Button as ButtonHero,
} from '@heroui/button'

interface ButtonProps extends ButtonPropsHero {
  children: React.ReactNode
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonHero {...props}>{children}</ButtonHero>
}

export default Button
