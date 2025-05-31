import { useEffect, type HTMLProps } from 'react'
import type { User } from '@supabase/supabase-js'
import { cn } from '@/lib/utils'
import TopBarAuthControl from './top-bar-auth-control'
import ButtonSignOut from '@/components/react/button-signout'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-store'

interface AuthUserProps {
  isAdmin: boolean
  user: User | null
  className?: HTMLProps<HTMLElement>['className']
}

const AuthUser = ({ user, isAdmin, className }: AuthUserProps) => {
  const { setIsAdmin, setUser } = useAuth((state) => state)

  useEffect(() => {
    setUser(user)
    setIsAdmin(isAdmin)
  }, [user])

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
