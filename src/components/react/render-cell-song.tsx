import type { ReactNode } from 'react'
import type { BaseTrackRow } from '@/types/track'
import ModalProvider from '@/context/modal-provider'
import { isAlbumRow } from '@/utils/track-utils'
import { formatDate } from '@/utils/format-date'
import { formatDuration } from '@/utils/format-duration'
import DeleteItem from '@/components/react/delete-item'
import { SongItem } from '@/components/react/song-item'
import { IndexOrPlay } from '@/components/react/index-or-play'

export const renderCellSong = <T extends BaseTrackRow>(
  track: T,
  columnKey: React.Key,
  tap: 'song' | 'album',
  onRemoveItem: (id: string) => void,
): ReactNode => {
  const cellValue = track[columnKey as keyof T]
  switch (columnKey) {
    case 'index':
      return <IndexOrPlay trackId={track.id} index={(track as any).index} />
    case 'title':
      return <SongItem imageUrl={track.image_url} title={track.title} artist={track.artist} />
    case 'release_year':
      return <span>{formatDate(track.release_year)}</span>
    case 'songs':
      if (isAlbumRow(track)) {
        return (
          <span>
            {track.songs.length < 1
              ? 'Sin canciones'
              : `${track.songs.length < 2 ? '1 canción' : `${track.songs.length} canciones`}`}
          </span>
        )
      }
      return null
    case 'duration':
      return <span>{formatDuration((track as any).duration)}</span>
    case 'action':
      return (
        <ModalProvider>
          <DeleteItem id={track.id} title={track.title ?? ''} tap={tap} onDelete={onRemoveItem} />
        </ModalProvider>
      )
    default:
      return cellValue != null ? String(cellValue) : null
  }
}
