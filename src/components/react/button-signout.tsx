import Button, { type ButtonProps } from '@/components/shared/button'
import { useAuth } from '@/hooks/use-store'
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
  const { user, setUser } = useAuth((state) => state)

  const handleSignOut = async () => {
    const { status } = await fetch('/api/auth/signout')
    if (status === 200) {
      setUser(null)
    }
  }

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
