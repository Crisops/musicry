import type { ReactNode } from 'react'
import type { BaseTrackRow } from '@/types/track'
import ModalProvider from '@/context/modal-provider'
import { isAlbumRow } from '@/utils/track-utils'
import { formatDate } from '@/utils/format-date'
import DeleteSong from '@/components/react/delete-song'
import { SongItem } from '@/components/react/song-item'

export const renderCellSong = <T extends BaseTrackRow>(
  track: T,
  columnKey: React.Key,
): ReactNode => {
  const cellValue = track[columnKey as keyof T]
  switch (columnKey) {
    case 'title':
      return (
        <SongItem
          imageUrl={track.imageUrl}
          title={track.title}
          artist={track.artist}
        />
      )
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
    case 'action':
      return (
        <ModalProvider>
          <DeleteSong id={track.id} />
        </ModalProvider>
      )
    default:
      return cellValue != null ? String(cellValue) : null
  }
}
