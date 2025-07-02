import { useListData } from 'react-stately'
import type {
  TrackSongsListPanelRows,
  TrackAlbumListPanelRows,
} from '@/types/track'

type TrackType = 'songs' | 'albums'

type Track = TrackSongsListPanelRows | TrackAlbumListPanelRows

export const useTrackCollection = <T extends Track>(
  initialItems: T[],
  type: TrackType,
) => {
  const list = useListData({
    initialItems,
    getKey: (item) => item.id,
  })

  const removeItem = (id: T['id']) => list.remove(id)
  const appendItem = (item: T) => list.append(item)
  const updateItem = (id: T['id'], item: T) => list.update(id, item)

  return {
    items: list.items,
    removeItem,
    appendItem,
    updateItem,
  }
}
