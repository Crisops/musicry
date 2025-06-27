import type { TrackAlbumListPanelRows, BaseTrackRow } from '@/types/track'

export const isAlbumRow = (
  row: BaseTrackRow,
): row is TrackAlbumListPanelRows => {
  return 'songs' in row && Array.isArray(row.songs)
}
