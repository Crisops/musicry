import TrackList from '@/components/react/track-list'
import { trackListAlbumColumnsDashboard, tracks } from '@/types/track'
import TopTableDashboard from '@/components/react/top-table-dashboard'

interface SongsTabContentProps {
  tap: 'songs' | 'albums'
  user: User
}

const SongsTabContent = ({ tap, user }: SongsTabContentProps) => {
  return (
    <div className="grid-row-1 grid h-full">
      <div className="scrollbar scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-rich-dark-jungle overflow-y-auto">
        <TrackList
          topContent={<TopTableDashboard tap={tap} user={user} />}
          selectionMode="single"
          classNames={{
            base: ['flex flex-col h-0'],
            thead: ['border-b border-gray-dim'],
            th: ['bg-transparent', 'text-sealsalt', 'border-divider'],
            td: [
              'first:before:rounded-none last:before:rounded-none',
              'before:bg-rich-black-light',
              'data-[selected=true]:text-platinum',
              'group-aria-[selected=false]/tr:group-data-[hover=true]/tr:before:bg-rich-black-light/60',
              'group-aria-[selected=true]/tr:group-data-[hover=true]/tr:before:bg-rich-black-light',
            ],
            tr: ['text-gray-dim'],
          }}
          removeWrapper
          rows={tracks}
          columns={trackListAlbumColumnsDashboard}
        />
      </div>
    </div>
  )
}

export default SongsTabContent
