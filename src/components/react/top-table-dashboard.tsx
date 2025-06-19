import { Library, Music } from 'lucide-react'
import ButtonCreateSong from '@/components/react/button-create-song'
import ModalProvider from '@/context/modal-provider'
import ButtonCreateAlbum from '@/components/react/button-create-album'

interface TopTableDashboardProps {
  tap: 'songs' | 'albums'
  user: User
}

const TopTableDashboard = ({ tap, user }: TopTableDashboardProps) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <div
            className={`flex items-center gap-2 ${
              tap === 'songs' ? 'text-blue-argentinian' : 'text-indigo-400'
            }`}
          >
            {tap === 'songs' ? (
              <Music color="currentColor" />
            ) : (
              <Library color="currentColor" />
            )}
            <span className="text-sealsalt">
              {tap === 'songs'
                ? 'Biblioteca de canciones'
                : 'Biblioteca de albunes'}
            </span>
          </div>
          <div>
            <span className="text-gray-dim text-small">
              {tap === 'songs'
                ? 'Gestiona tus pistas de música'
                : 'Gestiona tus colecciones de álbunes'}
            </span>
          </div>
        </div>
        <ModalProvider>
          {tap === 'songs' ? (
            <ButtonCreateSong user={user} />
          ) : (
            <ButtonCreateAlbum />
          )}
        </ModalProvider>
      </div>
    </div>
  )
}

export default TopTableDashboard
