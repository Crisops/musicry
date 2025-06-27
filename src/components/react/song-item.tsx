import type { Tables } from '@/types/database.types'

interface SongItemProps {
  imageUrl: Tables<'songs'>['imageUrl'] | Tables<'albums'>['imageUrl']
  title: Tables<'songs'>['title'] | Tables<'albums'>['title']
  artist: Tables<'songs'>['artist'] | Tables<'albums'>['artist']
}

export const SongItem = ({ imageUrl, title, artist }: SongItemProps) => {
  return (
    <article className="flex w-full items-center gap-1.5">
      <div className="relative hidden aspect-square h-auto w-11 sm:block">
        {imageUrl && title && (
          <img
            className="absolute h-full w-full rounded-md object-cover"
            src={imageUrl}
            alt={title}
            width={44}
            height={44}
          />
        )}
      </div>
      <div className="flex-auto flex-col items-start justify-center">
        <h4 className="text-small font-semibold text-current">{title}</h4>
        <p className="max-w-16 truncate text-xs text-current sm:max-w-fit">
          {artist}
        </p>
      </div>
    </article>
  )
}
