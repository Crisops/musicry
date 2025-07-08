import { usePlaySong } from '@/hooks/use-store'

const CurrentSong = () => {
  const currentSong = usePlaySong((state) => state.currentSong)

  return (
    <article className="flex w-80 items-center gap-1.5 py-1.5">
      <div className="relative aspect-square h-auto w-11">
        {currentSong?.song?.imageUrl && (
          <img
            className="absolute h-full w-full rounded-md object-cover"
            src={currentSong.song.imageUrl}
            alt={`${currentSong.song.title} - ${currentSong.song.artist}`}
            width={44}
            height={44}
          />
        )}
      </div>
      <div className="flex-initial flex-col items-start justify-center">
        <h4 className="text-sealsalt text-small font-semibold">{currentSong?.song?.title}</h4>
        <p className="text-gray-dim text-xs">{currentSong?.song?.artist}</p>
      </div>
    </article>
  )
}

export default CurrentSong
