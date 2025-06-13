import { createContext } from 'react'
import { useDisclosure } from '@heroui/react'
import { useDevice } from '@/hooks/use-device'

type ModalContextType = {
  isOpen: boolean
  sizeViewPort: number
  onOpen: () => void
  onOpenChange: (open: boolean) => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { width: sizeViewPort } = useDevice()

  return (
    <ModalContext value={{ isOpen, sizeViewPort, onOpen, onOpenChange }}>
      {children}
    </ModalContext>
  )
}

export default ModalProvider
