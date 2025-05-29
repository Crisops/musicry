import CurrentSong from '@/components/react/current-song'
import ProgressSlider from '@/components/react/progress-slider'
import PlaybackControls from '@/components/react/playback-controls'
import VolumenControl from '@/components/react/volumen-control'

const Player = () => {
  return (
    <section className="relative hidden h-full w-full items-center justify-between lg:flex">
      <CurrentSong
        title="The Dark Side of the Moon"
        artist="Pink Floyd"
        imageUrl="https://www.lamusica.com.co/cdn/shop/products/81aTawcGdmL._SL1500.jpg?v=1590757797"
      />
      <div className="flex flex-grow basis-0 items-center justify-center">
        <div className="flex w-full max-w-2xl flex-col items-center justify-center">
          <PlaybackControls />
          <ProgressSlider />
        </div>
      </div>
      <div className="hidden w-80 pr-3 2xl:block">
        <VolumenControl />
      </div>
    </section>
  )
}

export default Player
