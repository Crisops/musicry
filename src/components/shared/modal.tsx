import { useDevice } from '@/hooks/use-device'
import {
  Modal as ModalHero,
  ModalContent,
  ModalBody,
  type ModalProps,
} from '@heroui/modal'

const Modal = ({ children, ...props }: ModalProps) => {
  const { width: sizeViewPort } = useDevice()
  return (
    <ModalHero
      {...props}
      size={sizeViewPort < 700 ? 'full' : 'xl'}
      placement="center"
      classNames={{
        base: ['bg-black min-h-72 overflow-y-auto'],
        backdrop: ['bg-night/75'],
        body: ['px-0'],
        closeButton: [
          'left-1 w-fit hover:bg-white/10 transition-colors ease-in duration-150 text-white text-xl',
        ],
      }}
    >
      <ModalContent>
        <ModalBody className="w-full items-center py-6 min-[500px]:py-2">
          {children}
        </ModalBody>
      </ModalContent>
    </ModalHero>
  )
}

export default Modal
