import {
  Modal as ModalHero,
  ModalContent,
  ModalHeader,
  ModalBody,
  type ModalProps,
} from '@heroui/modal'

const Modal = ({ children, ...props }: ModalProps) => {
  return (
    <ModalHero
      {...props}
      placement="center"
      classNames={{
        base: ['bg-black min-h-72'],
        backdrop: ['bg-night/75'],
        body: ['px-0'],
        closeButton: [
          'left-1 w-fit hover:bg-white/10 transition-colors ease-in duration-150 text-white text-xl',
        ],
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1" />
        <ModalBody className="w-full flex-row py-6 min-[500px]:py-2">
          {children}
        </ModalBody>
      </ModalContent>
    </ModalHero>
  )
}

export default Modal
