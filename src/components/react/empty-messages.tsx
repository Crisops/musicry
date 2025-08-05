import { motion } from 'framer-motion'

const EmptyMessages = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="h-full w-full"
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-large max-w-56 text-center">
          <p className="text-sealsalt font-semibold text-balance">Ninguna conversación seleccionada</p>
          <span className="text-tiny text-gray-davy font-light text-balance">
            Elige un amigo para empezar a chatear
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default EmptyMessages
