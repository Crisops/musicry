import type { User } from '@supabase/supabase-js'

interface Props {
  user: User
  imageRef: React.RefObject<HTMLImageElement>
}

const AvatarUser = ({ user, imageRef }: Props) => {
  return (
    <div className="absolute size-6 h-full w-full rounded-full">
      <img
        ref={imageRef}
        className="absolute h-full w-full object-cover"
        src={user.user_metadata.avatar_url}
        alt={user.user_metadata.name}
      />
    </div>
  )
}

export default AvatarUser
