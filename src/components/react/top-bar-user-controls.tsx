import type { User } from '@supabase/supabase-js'
import PopoverLogOut from '@/components/react/popover'
import AvatarUser from '@/components/react/avatar-user'
import Button from '@/components/shared/button'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { Link } from '@heroui/react'

interface TopBarUserControlsProps {
  isAdmin: boolean
  user: User
  handleSignOut: () => void
}

export default function TopBarUserControls({
  isAdmin,
  user,
  handleSignOut,
}: TopBarUserControlsProps) {
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
        <Button
          startContent={<LogOut size={15} />}
          className="text-platinum data-[hover=true]:bg-rich-black-light w-full text-xs"
          radius="sm"
          onPress={handleSignOut}
          variant="light"
          size="sm"
        >
          Cerrar sesión
        </Button>
        <></>
      </PopoverLogOut>
    </>
  )
}
