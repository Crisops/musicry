import TopBarUserControls from '@/components/react/top-bar-user-controls'
import FormRegister from '@/components/react/form-register'
import type { User } from '@supabase/supabase-js'

interface TopBarAuthControlProps {
  isAdmin: boolean
  user: User | null
}

const TopBarAuthControl = ({ user, isAdmin }: TopBarAuthControlProps) => {
  return (
    <>{user ? <TopBarUserControls isAdmin={isAdmin} /> : <FormRegister />}</>
  )
}

export default TopBarAuthControl
