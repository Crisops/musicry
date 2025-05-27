import {
  House,
  MessageCircle,
  Library,
  type Icon as IconType,
} from '@lucide/astro'

type MenuItem = {
  name: string
  href: string
  icon: typeof IconType
}

export const menuItems: MenuItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: House,
  },
  {
    name: 'Mensajes',
    href: '/messages',
    icon: MessageCircle,
  },
  {
    name: 'Librería',
    href: '/library',
    icon: Library,
  },
]
