import PopoverLogOut from '@/components/react/popover'
import AvatarUser from '@/components/react/avatar-user'
import Button from '@/components/shared/button'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { Link } from '@heroui/react'
import { useAuth } from '@/hooks/use-auth'
import ButtonSignOut from '@/components/react/button-signout'

interface TopBarUserControlsProps {
  isAdmin: boolean
}

export default function TopBarUserControls({
  isAdmin,
}: TopBarUserControlsProps) {
  const { user } = useAuth()
  return (
    <>
      {isAdmin && (
        <Button
          startContent={<LayoutDashboard size={15} color="currentColor" />}
          className="text-platinum bg-rich-dark-jungle h-9 rounded-md text-xs"
          as={Link}
          href="/admin/dashboard"
        >
          Panel de administración
        </Button>
      )}
      <PopoverLogOut
        placement="bottom-end"
        trigger={<AvatarUser user={user} />}
        portalContainer={document.getElementById('settings-top-bar')!}
      >
        <ButtonSignOut
          startContent={<LogOut size={15} />}
          className="text-platinum data-[hover=true]:bg-rich-black-light bg-rich-black-dark w-full text-xs"
          radius="sm"
          variant="light"
          size="sm"
        >
          Cerrar sesión
        </ButtonSignOut>
        <></>
      </PopoverLogOut>
    </>
  )
}
