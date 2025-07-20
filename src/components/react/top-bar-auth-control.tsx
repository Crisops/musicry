import { User } from 'lucide-react'
import { useAuth } from '@/hooks/use-store'
import TopBarUserControls from '@/components/react/top-bar-user-controls'
import FormRegister from '@/components/react/form-register'

const TopBarAuthControl = () => {
  const user = useAuth((state) => state.user)
  return (
    <>
      {user ? (
        <TopBarUserControls />
      ) : (
        <FormRegister radius="full" isIconOnly className="text-platinum bg-rich-dark-jungle">
          <User color="currentColor" size={18} />
        </FormRegister>
      )}
    </>
  )
}

export default TopBarAuthControl
