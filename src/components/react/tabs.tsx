import { Tabs as TapsHero, Tab } from '@heroui/tabs'
import { Album, Music } from 'lucide-react'
import SongsTabContent from '@/components/react/songs-tab-content'
import AlbumsTabContent from '@/components/react/albums-tab-content'

const Tabs = () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-3">
      <TapsHero
        classNames={{
          panel:
            'h-full py-4 px-4 bg-rich-dark-jungle rounded-tl-md rounded-tr-md',
          tabList: 'bg-rich-dark-jungle',
          cursor: 'bg-blue-silver',
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
          <SongsTabContent tap="songs" />
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
          <AlbumsTabContent tap="albums" />
        </Tab>
      </TapsHero>
    </div>
  )
}

export default Tabs
