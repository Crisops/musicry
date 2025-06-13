import { Input as InputHero, type InputProps } from '@heroui/react'

const Input = (props: InputProps) => {
  return (
    <InputHero
      {...props}
      size="sm"
      radius="sm"
      classNames={{
        inputWrapper: [
          'bg-night group-data-[focus=true]:bg-night data-[hover=true]:bg-night/90 group-data-[invalid=true]:!bg-red-500/10 group-data-[invalid=true]:data-[hover=true]:!bg-red-500/15',
        ],
        label: ['text-gray-dim'],
        input: ['group-data-[has-value=true]:text-sealsalt'],
        description: ['text-gray-dim'],
        helperWrapper: ['max-w-md'],
      }}
    />
  )
}

export default Input
