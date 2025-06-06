import { createContext, useEffect, useState } from 'react'
import { useDisclosure } from '@heroui/react'

type ModalContextType = {
  isOpen: boolean
  sizeViewPort: number
  onOpen: () => void
  onOpenChange: (open: boolean) => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [sizeViewPort, setSizeViewPort] = useState<number>(() => {
    return window.innerWidth
  })

  useEffect(() => {
    const handleResize = () => {
      setSizeViewPort(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ModalContext value={{ isOpen, sizeViewPort, onOpen, onOpenChange }}>
      {children}
    </ModalContext>
  )
}

export default ModalProvider
