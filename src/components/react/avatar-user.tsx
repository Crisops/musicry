import { useAuth } from '@/hooks/use-store'

const AvatarUser = () => {
  const { user } = useAuth((state) => state)

  if (!user) return null
  return (
    <div className="absolute size-6 h-full w-full rounded-full">
      <img
        className="absolute h-full w-full object-cover"
        src={user.user_metadata.avatar_url}
        alt={user.user_metadata.name}
      />
    </div>
  )
}

export default AvatarUser
