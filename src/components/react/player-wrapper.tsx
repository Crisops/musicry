import { AudioProvider } from '@/context/audio-provider'
import Player from '@/components/react/player'
import PlayerMovile from '@/components/react/player-movile'

const PlayerWrapper = () => {
  return (
    <AudioProvider>
      <footer className="bg-rich-black-light hidden px-3 [grid-area:player] lg:block">
        <Player />
      </footer>
      <PlayerMovile />
    </AudioProvider>
  )
}

export default PlayerWrapper
