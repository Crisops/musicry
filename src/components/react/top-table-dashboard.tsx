import { Library, Music } from 'lucide-react'
import type { BaseTrackRow } from '@/types/track'
import ModalProvider from '@/context/modal-provider'
import ButtonCreateSong from '@/components/react/button-create-song'
import ButtonCreateAlbum from '@/components/react/button-create-album'

interface TopTableDashboardProps<T extends BaseTrackRow> {
  tap: 'songs' | 'albums'
  onAddItem: (item: T) => void
}

const TopTableDashboard = <T extends BaseTrackRow>({ tap, onAddItem }: TopTableDashboardProps<T>) => {
  return (
    <div className="relative w-full p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <div className={`flex items-center gap-2 ${tap === 'songs' ? 'text-blue-argentinian' : 'text-indigo-400'}`}>
            {tap === 'songs' ? <Music color="currentColor" /> : <Library color="currentColor" />}
            <span className="text-sealsalt">
              {tap === 'songs' ? 'Biblioteca de canciones' : 'Biblioteca de albunes'}
            </span>
          </div>
          <div>
            <span className="text-gray-dim text-small">
              {tap === 'songs' ? 'Gestiona tus pistas de música' : 'Gestiona tus colecciones de álbunes'}
            </span>
          </div>
        </div>
        <ModalProvider>
          {tap === 'songs' ? (
            <ButtonCreateSong onAddItem={onAddItem as (item: any) => void} />
          ) : (
            <ButtonCreateAlbum onAddItem={onAddItem as (item: any) => void} />
          )}
        </ModalProvider>
      </div>
    </div>
  )
}

export default TopTableDashboard
