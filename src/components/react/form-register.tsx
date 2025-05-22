import Button from '@/components/shared/button'
import { User } from 'lucide-react'

const FormRegister = () => {
  return (
    <form action="/api/auth/signin" method="POST">
      <Button
        type="submit"
        value="google"
        name="provider"
        isIconOnly
        radius="full"
        className="text-platinum bg-rich-dark-jungle text-small"
      >
        <User color="currentColor" size={18} />
      </Button>
    </form>
  )
}

export default FormRegister
