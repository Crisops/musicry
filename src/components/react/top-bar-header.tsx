import type { User } from '@supabase/supabase-js'
import AuthUser from '@/components/react/auth-user'
import Greeting from '@/components/react/greeting'
import Settings from '@/components/react/settings'
import AuthProvider from '@/context/auth-context'

interface TopBarHeaderProps {
  user: User | null
  isAdmin: boolean
}

const TopBarHeader = ({ user, isAdmin }: TopBarHeaderProps) => {
  return (
    <>
      <AuthProvider>
        <header
          id="settings-top-bar"
          className="bg-rich-black-light hidden h-24 items-center justify-between px-5 lg:flex"
        >
          <h2 className="text-platinum text-large font-bold">Musicry</h2>
          <AuthUser className="hidden md:block" user={user} isAdmin={isAdmin} />
        </header>
        <div className="relative flex h-24 w-full items-center justify-between px-3">
          <Greeting className="text-platinum" />
          <Settings isAdmin={isAdmin} />
        </div>
      </AuthProvider>
    </>
  )
}

export default TopBarHeader
