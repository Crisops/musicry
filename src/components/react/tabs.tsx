import { Tabs as TapsHero, Tab } from '@heroui/tabs'
import { Album, Music } from 'lucide-react'
import type {
  TrackAlbumListPanelRows,
  TrackSongsListPanelRows,
} from '@/types/track'
import SongsTabContent from '@/components/react/songs-tab-content'
import AlbumsTabContent from '@/components/react/albums-tab-content'

interface TabsProps {
  songs: TrackSongsListPanelRows[]
  albums: TrackAlbumListPanelRows[]
}

const Tabs = ({ songs, albums }: TabsProps) => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-3">
      <TapsHero
        classNames={{
          panel: 'h-full bg-rich-black-light rounded-tl-md rounded-tr-md',
          tabList: 'bg-rich-black-light',
          cursor: 'bg-blue-silver',
          tab: 'h-7',
          tabContent: 'text-gray-davy group-data-[selected=true]:text-sealsalt',
        }}
        size="sm"
        radius="sm"
        aria-label="Opciones para elegir entre canciones y albunes"
      >
        <Tab
          key="songs"
          title={
            <div className="flex items-center space-x-2">
              <Music size={15} color="currentColor" />
              <span>Canciones</span>
            </div>
          }
        >
          <SongsTabContent tap="songs" songs={songs} />
        </Tab>
        <Tab
          key="albums"
          title={
            <div className="flex items-center space-x-2">
              <Album size={15} color="currentColor" />
              <span>Albunes</span>
            </div>
          }
        >
          <AlbumsTabContent tap="albums" albums={albums} />
        </Tab>
      </TapsHero>
    </div>
  )
}

export default Tabs
