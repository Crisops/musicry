import {
  trackSongsPanelColumns,
  type TrackSongsListPanelRows,
} from '@/types/track'
import TopTableDashboard from '@/components/react/top-table-dashboard'
import TrackList from '@/components/react/track-list'

interface SongsTabContentProps {
  tap: 'songs' | 'albums'
  songs: TrackSongsListPanelRows[]
}

const SongsTabContent = ({ tap, songs }: SongsTabContentProps) => {
  return (
    <div className="grid-row-1 grid h-full">
      <div className="scrollbar scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-rich-dark-jungle overflow-y-auto">
        <TrackList<TrackSongsListPanelRows>
          disableAnimation
          selectionMode="single"
          topContent={<TopTableDashboard tap={tap} />}
          classNames={{
            base: ['flex flex-col h-0'],
            thead: ['border-b border-gray-dim'],
            th: ['bg-transparent', 'text-sealsalt', 'border-divider'],
            td: [
              'first:before:rounded-none last:before:rounded-none',
              'before:bg-rich-black-dark',
              'data-[selected=true]:text-platinum',
              'group-aria-[selected=false]/tr:group-data-[hover=true]/tr:before:bg-night/60',
              'group-aria-[selected=true]/tr:group-data-[hover=true]/tr:before:bg-rich-black-dark',
            ],
            tr: ['text-gray-dim'],
          }}
          removeWrapper
          rows={songs}
          columns={trackSongsPanelColumns}
        />
      </div>
    </div>
  )
}

export default SongsTabContent
