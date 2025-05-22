import type { User } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'
import FormRegister from '@/components/react/form-register'
import PopoverLogOut from '@/components/react/popover'
import AvatarUser from '@/components/react/avatar-user'
import Button from '@/components/shared/button'
import { LogOut } from 'lucide-react'

interface AuthUserProps {
  user?: User
}

const AuthUser = ({ user }: AuthUserProps) => {
  const [auth, setAuth] = useState<boolean>(false)

  const imageRef = useRef<HTMLImageElement>(null!)

  useEffect(() => {
    user ? setAuth(true) : setAuth(false)
  }, [user])

  const handleSignOut = async () => {
    try {
      const { status } = await fetch('/api/auth/signout')
      if (status === 200) {
        setAuth(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {auth && user ? (
        <PopoverLogOut
          classNames={{
            base: 'before:bg-rich-black-dark',
            arrow: 'text-rich-black-dark',
          }}
          showArrow
          trigger={<AvatarUser user={user} imageRef={imageRef} />}
          portalContainer={document.getElementById('settings-top-bar')!}
        >
          <Button
            startContent={<LogOut size={15} />}
            className="text-platinum data-[hover=true]:bg-rich-black-light w-full text-xs"
            radius="none"
            onPress={handleSignOut}
            variant="light"
            size="sm"
          >
            Cerrar sesión
          </Button>
          <></>
        </PopoverLogOut>
      ) : (
        <FormRegister />
      )}
    </>
  )
}

export default AuthUser
