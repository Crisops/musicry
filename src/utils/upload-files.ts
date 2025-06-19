import { v4 as uuidv4 } from 'uuid'
import { type Tables } from '@/types/database.types'
import imageCompression from 'browser-image-compression'
import { supabase } from '@/lib/supabase/client'

interface UploadImageProps {
  bucket: 'songs' | 'albums'
  file: File
  folder: Tables<'users'>['id']
}

export const uploadFile = async ({
  bucket,
  file,
  folder,
}: UploadImageProps) => {
  const fileName = file.name
  const fileExt = fileName.split('.').pop()?.toLocaleLowerCase()
  const filePath = `${folder}/${uuidv4()}.${fileExt}`

  try {
    if (fileExt !== 'mp3') {
      file = await imageCompression(file, {
        maxSizeMB: 1,
      })
    }
  } catch (error) {
    console.error(error)
    return { url: '', error: 'Image compression failed' }
  }

  const { error } = await supabase.storage.from(bucket).upload(filePath, file)

  if (error) return { url: '', error: 'upload failed' }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath)

  return { url: publicUrl, error: '' }
}
