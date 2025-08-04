import { type HTMLProps } from 'react'
import { cn } from '@/lib/utils'
import TopBarAuthControl from './top-bar-auth-control'
import ButtonSignOut from '@/components/react/button-signout'
import { LogOut } from 'lucide-react'

interface AuthUserProps {
  className?: HTMLProps<HTMLElement>['className']
}

const AuthUser = ({ className }: AuthUserProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <ButtonSignOut isDeviceMovile isIconOnly size="sm" variant="solid">
        <LogOut size={15} />
      </ButtonSignOut>
      <TopBarAuthControl />
    </div>
  )
}

export default AuthUser
