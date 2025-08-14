import { useDevice } from '@/hooks/use-device'
import { ToastProvider as HeroToastProvider } from '@heroui/toast'

export default function ToastProvider() {
  const { width } = useDevice()
  return <HeroToastProvider placement="bottom-center" toastOffset={width <= 1024 ? 50 : 0} />
}
