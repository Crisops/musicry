import TopBarUserControls from '@/components/react/top-bar-user-controls'
import FormRegister from '@/components/react/form-register'
import { useAuth } from '@/hooks/use-store'

const TopBarAuthControl = () => {
  const { user } = useAuth((state) => state)
  return <>{user ? <TopBarUserControls /> : <FormRegister />}</>
}

export default TopBarAuthControl
