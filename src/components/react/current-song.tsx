interface CurrentSongProps {
  title: string
  artist: string
  imageUrl: string
}

const CurrentSong = ({ title, artist, imageUrl }: CurrentSongProps) => {
  return (
    <article className="flex w-80 items-center gap-1.5 py-1.5">
      <div className="relative aspect-square h-auto w-11">
        <img
          className="absolute h-full w-full rounded-md object-cover"
          src={imageUrl}
          alt={title}
          width={44}
          height={44}
        />
      </div>
      <div className="flex-initial flex-col items-start justify-center">
        <h4 className="text-sealsalt text-small font-semibold">{title}</h4>
        <p className="text-gray-dim text-xs">{artist}</p>
      </div>
    </article>
  )
}

export default CurrentSong
