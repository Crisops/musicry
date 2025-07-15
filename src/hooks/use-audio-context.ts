import { useContext } from 'react'
import { AudioContext } from '@/context/audio-provider'

export const useAudioContext = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioContext debe ser usado dentro de AudioProvider')
  }
  return context
}
