import type { HTMLProps } from 'react'

interface GreetingProps {
  className: HTMLProps<HTMLElement>['className']
}

const Greeting = ({ className }: GreetingProps) => {
  const hours = new Date().getHours()
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
      <h3 className="text-2xl font-bold text-current lg:text-2xl">
        {greeting}
      </h3>
    </div>
  )
}

export default Greeting
