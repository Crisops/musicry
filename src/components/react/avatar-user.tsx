import { useAuth } from '@/hooks/use-store'

const AvatarUser = () => {
  const { user } = useAuth((state) => state)

  return (
    <div className="absolute size-6 h-full w-full rounded-full">
      <img
        className="absolute h-full w-full object-cover"
        src={user?.avatar_url ?? ''}
        alt={user?.full_name ?? ''}
      />
    </div>
  )
}

export default AvatarUser
