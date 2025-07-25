import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-store'
import { Settings as SettingsIcon } from 'lucide-react'
import { Drawer, DrawerContent } from '@heroui/drawer'
import AuthUser from '@/components/react/auth-user'
import Button from '@/components/shared/button'

const Settings = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { user: userDB, setUser } = useAuth((state) => state)

  useEffect(() => {
    setUser(user)
  }, [user])

  const handleOpenDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button
        onPress={handleOpenDrawer}
        isIconOnly
        variant="light"
        size="sm"
        className="text-platinum bg-transparent data-[hover=true]:bg-transparent lg:hidden"
      >
        <SettingsIcon color="currentColor" size={24} />
      </Button>
      <Drawer
        hideCloseButton
        classNames={{
          base: 'bg-rich-black-light justify-end',
        }}
        placement="right"
        size="xs"
        isOpen={isOpen}
        onClose={handleOpenDrawer}
      >
        <DrawerContent>
          <div id="settings-top-bar-movile" className="flex justify-start p-3">
            <AuthUser user={userDB} className="flex-row-reverse" />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Settings
