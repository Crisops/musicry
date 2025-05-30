import Button, { type ButtonProps } from '@/components/shared/button'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

interface ButtonSignOutProps extends ButtonProps {
  isDeviceMovile?: boolean
}

const ButtonSignOut = ({
  children,
  className,
  isDeviceMovile,
  ...props
}: ButtonSignOutProps) => {
  const { user, handleSignOut } = useAuth()
  return (
    <Button
      {...props}
      className={cn(
        `text-platinum bg-rich-dark-jungle h-9 w-9 justify-self-end ${user ? (isDeviceMovile ? 'lg:hidden' : 'flex') : 'hidden'}`,
        className,
      )}
      onPress={handleSignOut}
    >
      {children}
    </Button>
  )
}

export default ButtonSignOut
