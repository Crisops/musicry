import type { TablesInsert } from '@/types/database.types'
import type { RegisterOptions } from 'react-hook-form'
import { DEFAULT_IMAGE_CONFIG } from '@/config/file-upload'
import { getLocalTimeZone, type DateValue } from '@internationalized/date'

export type SongFormData = Omit<TablesInsert<'songs'>, 'created_at' | 'id' | 'imageUrl' | 'audioUrl'> & {
  imageUrl: File[] | null
  audioUrl: FileList | null
}

export type AlbumFormData = Omit<TablesInsert<'albums'>, 'created_at' | 'id' | 'imageUrl'> & {
  imageUrl: File[] | null
  releaseYear: DateValue | null
}

export type MessageFormData = {
  content: TablesInsert<'messages'>['content']
}

const commonRules = {
  title: {
    required: 'El título es obligatorio y debe contener al menos un carácter válido.',
    pattern: {
      value: /^[a-zA-ZÀ-ÿ0-9\s]+(?:'[a-zA-ZÀ-ÿ\s]+)*$/,
      message: 'El título solo puede contener letras, números y espacios.',
    },
    minLength: {
      value: 3,
      message: 'El título debe tener al menos 3 caracteres.',
    },
    maxLength: {
      value: 150,
      message: 'El título no puede tener más de 150 caracteres.',
    },
  },
  artist: {
    required: 'El nombre del artista es obligatorio.',
    pattern: {
      value: /^[a-zA-ZÀ-ÿ0-9\s]+(?:,\s*[a-zA-ZÀ-ÿ0-9]+(?:\s+[a-zA-ZÀ-ÿ0-9]+)*)*$/,
      message:
        'El nombre del artista solo puede contener letras, números, espacios y comas para separar múltiples artistas',
    },
    minLength: {
      value: 2,
      message: 'El nombre del artista debe tener al menos 2 caracteres.',
    },
    maxLength: {
      value: 100,
      message: 'El nombre del artista no puede exceder los 100 caracteres.',
    },
  },
  imageUrl: {
    required: 'Debes seleccionar una imagen',
    validate: (value: File[]) => {
      const file = value[0]
      if (file.size > 1024 * 1024 * 5) {
        return 'La imagen no puede pesar más de 5MB.'
      }
      if (!DEFAULT_IMAGE_CONFIG.acceptedTypes.includes(file.type)) {
        return 'El formato de la imagen no es válido.'
      }
      return true
    },
  },
} as const

export const songValidationRules: Record<keyof SongFormData, RegisterOptions> = {
  ...commonRules,
  albumId: {
    validate: (value: any) => {
      if (!value || value === '') return true
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(value)) {
        return 'El ID del álbum no tiene un formato válido.'
      }

      return true
    },
  },
  duration: {
    required: 'La duración es obligatoria.',
    pattern: {
      value: /^[1-9]\d*$/,
      message: 'La duración debe ser un número entero positivo sin espacios ni símbolos.',
    },
  },
  audioUrl: {
    required: 'Debes seleccionar un audio.',
    validate: (value: any) => {
      if (value instanceof FileList) {
        const file = value[0]
        if (file.size > 1024 * 1024 * 10) {
          return 'El audio no puede pesar más de 10MB.'
        }
        if (!['audio/mpeg', 'audio/mp3', 'audio/wav'].includes(file.type)) {
          return 'El formato de audio no es válido.'
        }
        return true
      }
      return 'Debes subir un audio válido.'
    },
  },
}

export const albumValidationRules: Record<keyof AlbumFormData, RegisterOptions> = {
  ...commonRules,
  releaseYear: {
    required: 'El año de lanzamiento es obligatorio.',
    validate: (value) => {
      if (!value) return 'La fecha es obligatoria.'
      const date = new Date(value.toDate(getLocalTimeZone()))
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      if (date > today) {
        return 'La fecha no puede ser futura.'
      }
      return true
    },
  },
}

export const messageValidationRules: Record<keyof MessageFormData, RegisterOptions> = {
  content: {
    required: 'El mensaje es obligatorio.',
    minLength: {
      value: 1,
      message: 'El mensaje debe tener al menos 1 carácter.',
    },
  },
}

export const validateRulesForm = {
  ...commonRules,
  audioUrl: songValidationRules.audioUrl,
  duration: songValidationRules.duration,
  albumId: songValidationRules.albumId,
  content: messageValidationRules.content,
}
