import { createContext, useRef, type ReactNode } from 'react'

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>
}

export const AudioContext = createContext<AudioContextType | null>(null)

interface AudioProviderProps {
  children: ReactNode
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  return <AudioContext.Provider value={{ audioRef }}>{children}</AudioContext.Provider>
}
