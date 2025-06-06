import { Music } from 'lucide-react'
import ButtonCreateSong from '@/components/react/button-create-song'
import ModalProvider from '@/context/ModalProvider'
import ButtonCreateAlbum from '@/components/react/button-create-album'

interface TopTableDashboardProps {
  tap: 'songs' | 'albums'
}

const TopTableDashboard = ({ tap }: TopTableDashboardProps) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <div className="text-blue-argentinian flex items-center gap-2">
            <Music color="currentColor" />
            <span className="text-sealsalt">Biblioteca de canciones</span>
          </div>
          <div>
            <span className="text-gray-dim text-small">
              Gestiona tus pistas de música
            </span>
          </div>
        </div>
        <ModalProvider>
          {tap === 'songs' ? <ButtonCreateSong /> : <ButtonCreateAlbum />}
        </ModalProvider>
      </div>
    </div>
  )
}

export default TopTableDashboard
