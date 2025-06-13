import { use } from 'react'
import { ModalContext } from '@/context/modal-provider'

export const useModal = () => {
  const context = use(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
