import type { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import FormRegister from '@/components/react/form-register'
import TopBarUserControls from './top-bar-user-controls'

interface AuthUserProps {
  isAdmin: boolean
  user?: User
}

const AuthUser = ({ user, isAdmin }: AuthUserProps) => {
  const [auth, setAuth] = useState<boolean>(false)

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
    <div className="flex items-center gap-2">
      {auth && user ? (
        <TopBarUserControls
          isAdmin={isAdmin}
          user={user}
          handleSignOut={handleSignOut}
        />
      ) : (
        <FormRegister />
      )}
    </div>
  )
}

export default AuthUser
