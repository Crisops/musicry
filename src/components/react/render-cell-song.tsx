import type { Track } from '@/types/track'
import { SongItem } from '@/components/react/song-item'

export const renderCellSong = (track: Track, columnKey: React.Key) => {
  const cellValue = track[columnKey as keyof Track]
  switch (columnKey) {
    case 'title':
      return (
        <SongItem
          imageUrl={track.image}
          title={track.title}
          artist={track.artist}
        />
      )
    default:
      return cellValue
  }
}
