import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { motion } from 'framer-motion'
import {
  DEFAULT_IMAGE_CONFIG,
  mainVariant,
  secondaryVariant,
} from '@/config/file-upload'
import { useDropzone } from 'react-dropzone'
import { AlertCircle, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/shared/button'
import type { InputProps } from '@heroui/input'
import Input from '@/components/react/input'

interface FileDisplayInfo {
  name: string
  size: number
  type: string
  lastModified: number
  previewUrl?: string
}
interface FileUploadProps extends Omit<InputProps, 'ref' | 'onChange'> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  maxSizeMB?: number
  acceptedTypes?: string[]
  errorMessage?: string
}
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      onChange,
      maxSizeMB = DEFAULT_IMAGE_CONFIG.maxSizeMB,
      acceptedTypes = DEFAULT_IMAGE_CONFIG.acceptedTypes,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const [files, setFiles] = useState<FileDisplayInfo[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [dragError, setDragError] = useState<string | null>(null)

    useImperativeHandle(ref, () => fileInputRef.current!, [])

    const validateFileDrag = useCallback(
      (file: File): string | null => {
        if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
          return `El archivo excede el tamaño máximo de ${maxSizeMB}MB`
        }
        if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
          const extensions = acceptedTypes
            .map((type) => type.split('/')[1]?.toUpperCase() || type)
            .join(', ')
          return `Tipo de archivo no válido. Formatos aceptados: ${extensions}`
        }
        return null
      },
      [maxSizeMB, acceptedTypes],
    )

    const cleanupPreviewImage = useCallback((previewUrl?: string) => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }, [])

    const createPreviewImage = useCallback((file: File): string | undefined => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file)
      }
      return undefined
    }, [])
    const handleFileChange = useCallback(
      (newFiles: File[]) => {
        const file = newFiles[0]
        if (!file) return

        setDragError(null)

        const validationError = validateFileDrag(file)

        if (validationError) {
          setDragError(validationError)
          return
        }

        if (files[0]?.previewUrl) {
          cleanupPreviewImage(files[0].previewUrl)
        }

        const newFileInfo: FileDisplayInfo = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          previewUrl: createPreviewImage(file),
        }

        setFiles([newFileInfo])
      },
      [
        validateFileDrag,
        files[0]?.previewUrl,
        cleanupPreviewImage,
        createPreviewImage,
      ],
    )

    const handleRemoveFile = useCallback(() => {
      if (files[0]?.previewUrl) {
        cleanupPreviewImage(files[0].previewUrl)
      }
      setFiles([])
      setDragError(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }, [cleanupPreviewImage, files[0]?.previewUrl])

    const handleClick = useCallback(() => {
      fileInputRef.current?.click()
    }, [])

    const formatFileSize = useCallback((bytes: number): string => {
      return (bytes / (1024 * 1024)).toFixed(2)
    }, [])

    const formatDate = useCallback((timestamp: number): string => {
      return new Date(timestamp).toLocaleDateString('es-ES')
    }, [])

    const { getRootProps, isDragActive } = useDropzone({
      multiple: false,
      noClick: true,
      onDrop: handleFileChange,
    })

    const currentError = errorMessage || dragError

    return (
      <div className="w-full" {...getRootProps()}>
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className={cn(
            'group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-5 transition-colors sm:p-8',
            'bg-night/40 hover:bg-night/60',
            currentError && 'bg-danger/10 outline-2 outline-red-500/50',
            isDragActive &&
              'outline-blue-silver/50 bg-blue-silver/10 outline-2',
          )}
        >
          <Input
            ref={fileInputRef}
            {...props}
            accept={acceptedTypes.join(',')}
            id="file-upload-handle"
            onChange={(e) => {
              const files = Array.from(e.target.files || [])
              handleFileChange(files)
              onChange && onChange(e)
            }}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-davy relative z-20 font-sans text-base font-bold">
              Cargar imagen
            </p>
            <p className="relative z-20 mt-2 text-center font-sans text-base font-normal text-neutral-400">
              Arrastre o suelte aquí su imagen o haga clic para seleccionar
            </p>
            <p className="text-gray-dim relative z-20 mt-1 font-sans text-sm">
              Máximo 5MB • Formatos: JPG, JPEG
            </p>
            <div className="relative mx-auto mt-6 w-full max-w-xl">
              {files.length > 0 &&
                files.map((file, idx) => (
                  <motion.div
                    key={'file' + idx}
                    layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                    className={cn(
                      'bg-night relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md px-2 py-2 sm:px-6 sm:pt-4 md:h-24',
                      'shadow-sm',
                    )}
                  >
                    <Button
                      isIconOnly
                      variant="light"
                      radius="full"
                      onPress={handleRemoveFile}
                      className="text-sealsalt data-[hover=true]:bg-default/20 absolute top-2 right-2 h-6 w-6 min-w-6"
                    >
                      <X color="currentColor" size={14} />
                    </Button>
                    <div className="flex gap-4">
                      {file.previewUrl && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex-shrink-0"
                        >
                          <img
                            src={file.previewUrl}
                            alt="Vista previa"
                            className="h-16 w-16 rounded-md object-cover"
                          />
                        </motion.div>
                      )}
                      <div className="min-w-0 flex-1">
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sealsalt truncate text-sm font-medium"
                          title={file.name}
                        >
                          {file.name}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="mt-1 flex items-center gap-2 text-xs"
                        >
                          <span className="bg-blue-silver text-sealsalt rounded px-1.5 py-0.5 text-xs">
                            {file.type.split('/')[1]?.toUpperCase() || 'IMG'}
                          </span>
                          <span className="text-gray-dim">
                            {formatFileSize(file.size)}MB
                          </span>
                          <span className="text-gray-dim">•</span>
                          <span className="text-gray-dim">
                            Modificado {formatDate(file.lastModified)}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              {!files.length && (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    'bg-rich-black-light relative z-40 mx-auto mt-4 flex h-24 w-full max-w-[6rem] items-center justify-center rounded-md group-hover/file:shadow-2xl',
                    'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]',
                    isDragActive && 'shadow-blue-argentinian/25',
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-blue-argentinian flex flex-col items-center"
                    >
                      <Upload className="mb-1 h-4 w-4" />
                      <span className="text-xs">Suelta aquí</span>
                    </motion.p>
                  ) : (
                    <Upload className="h-4 w-4 text-neutral-400" />
                  )}
                </motion.div>
              )}

              {!files.length && (
                <motion.div
                  variants={secondaryVariant}
                  className="border-blue-argentinian absolute inset-0 z-30 mx-auto mt-4 flex h-24 w-full max-w-[6rem] items-center justify-center rounded-md border border-dashed bg-transparent opacity-0"
                />
              )}
            </div>
          </div>
        </motion.div>
        {currentError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-tiny text-danger mt-2 flex items-center gap-2"
          >
            <AlertCircle size={16} />
            <span className="sm:text-small text-xs">{currentError}</span>
          </motion.div>
        )}
      </div>
    )
  },
)

FileUpload.displayName = 'FileUpload'
