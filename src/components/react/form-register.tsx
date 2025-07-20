import type { HTMLProps } from 'react'
import type { ButtonProps } from '@heroui/button'
import { cn } from '@/lib/utils'
import Button from '@/components/shared/button'

interface FormRegisterProps extends Omit<ButtonProps, 'children'> {
  className?: HTMLProps<HTMLButtonElement>['className']
  children: string | React.ReactNode
}

const FormRegister = ({ className, children, ...props }: FormRegisterProps) => {
  return (
    <form action="/api/auth/signin" method="POST" data-astro-reload>
      <Button {...props} type="submit" value="google" name="provider" className={cn('text-small', className)}>
        {children}
      </Button>
    </form>
  )
}

export default FormRegister
