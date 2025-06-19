import type { HTMLProps } from 'react'
import { useAuth } from '@/hooks/use-store'

interface GreetingProps {
  className: HTMLProps<HTMLElement>['className']
}

const Greeting = ({ className }: GreetingProps) => {
  const { user } = useAuth((state) => state)
  const hours = new Date().getHours()
  const firstName: string = user?.full_name?.split(' ')[0] ?? ''
  let greeting: string = ''

  if (hours < 12) {
    greeting = 'Buenos días'
  } else if (hours < 18) {
    greeting = 'Buenas Tardes'
  } else {
    greeting = 'Buenas Noches'
  }

  return (
    <div className={className}>
      <h3 className="text-xl font-bold text-current lg:text-2xl">
        {user ? `${greeting}, ${firstName}` : greeting}
      </h3>
    </div>
  )
}

export default Greeting
