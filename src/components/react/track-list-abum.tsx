import { trackAlbumPageColumns, type TrackAlbumPageColumns } from '@/types/track'
import { useShallow } from 'zustand/react/shallow'
import { usePlaySong } from '@/hooks/use-store'
import TrackList from '@/components/react/track-list'

interface TrackListAlbumProps {
  songs: TrackAlbumPageColumns['songs']
}

const TrackListAlbum = ({ songs }: TrackListAlbumProps) => {
  const songsModified = songs.map((song, index) => ({ ...song, index: index + 1 }))

  const { list } = usePlaySong(
    useShallow((s) => {
      return {
        list: s.shuffle ? s.shufflePlaylist : s.currentSong,
      }
    }),
  )

  return (
    <div className="grid-row-1 bg-night-alpha relative grid h-full">
      <div className="scrollbar scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-rich-dark-jungle overflow-y-auto">
        <TrackList
          selectionMode="single"
          selectedKeys={list?.song?.id ? [list.song.id] : []}
          classNames={{
            base: ['flex flex-col h-0'],
            thead: ['border-b border-gray-dim'],
            th: ['bg-transparent', 'text-gray-dim', 'border-divider'],
            td: [
              'first:before:rounded-none last:before:rounded-none',
              'before:bg-gray-500/40',
              'data-[selected=true]:text-platinum',
              'group-aria-[selected=false]/tr:group-data-[hover=true]/tr:before:bg-gray-500/20',
              'group-aria-[selected=true]/tr:group-data-[hover=true]/tr:before:bg-gray-500/40',
            ],
            tr: ['text-gray-dim'],
          }}
          removeWrapper
          rows={songsModified}
          columns={trackAlbumPageColumns}
        />
      </div>
    </div>
  )
}

export default TrackListAlbum
