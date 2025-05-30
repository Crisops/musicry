import { Drawer, DrawerContent } from '@heroui/drawer'
import { useState } from 'react'
import Button from '@/components/shared/button'
import { Settings as SettingsIcon } from 'lucide-react'
import AuthUser from '@/components/react/auth-user'
import { useAuth } from '@/hooks/use-auth'

interface SettingsProps {
  isAdmin: boolean
}

const Settings = ({ isAdmin }: SettingsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { user } = useAuth()

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
            <AuthUser
              isAdmin={isAdmin}
              user={user}
              className="flex-row-reverse"
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Settings
