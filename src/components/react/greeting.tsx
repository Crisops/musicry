const Greeting = () => {
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
    <h3 className="text-platinum text-xl font-bold lg:text-2xl">{greeting}</h3>
  )
}

export default Greeting
