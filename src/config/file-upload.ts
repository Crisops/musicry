export const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
}

export const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

export const DEFAULT_IMAGE_CONFIG = {
  maxSizeMB: 5,
  acceptedTypes: ['image/jpeg', 'image/jpg', 'image/webp'],
}
