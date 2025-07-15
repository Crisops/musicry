import { FastAverageColor, type FastAverageColorIgnoredColor } from 'fast-average-color'

export interface ColorResult {
  hex: string
  rgb: [number, number, number]
  rgba: [number, number, number, number]
  hexa: string
  isDark: boolean
  isLight: boolean
}

export interface ColorExtractorOptions {
  algorithm?: 'dominant' | 'simple' | 'sqrt'
  mode?: 'speed' | 'precision'
  crossOrigin?: string
  ignoredColor?: FastAverageColorIgnoredColor
  step?: number
}

export const extractDominantColor = async (
  imageSource: string | HTMLImageElement,
  options: ColorExtractorOptions = {},
): Promise<ColorResult | null> => {
  const fac = new FastAverageColor()

  try {
    const { algorithm = 'dominant', mode = 'speed', crossOrigin = 'anonymous', ignoredColor, step = 1 } = options

    let image: HTMLImageElement

    if (typeof imageSource === 'string') {
      image = new Image()
      image.crossOrigin = crossOrigin

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve()
        image.onerror = () => reject(new Error('Failed to load image'))
        image.src = imageSource
      })
    } else {
      image = imageSource
    }

    const color = await fac.getColorAsync(image, {
      algorithm,
      mode,
      ignoredColor,
      step,
    })

    return {
      hex: color.hex,
      rgb: color.value.slice(0, 3) as [number, number, number],
      rgba: color.value as [number, number, number, number],
      hexa: color.hexa,
      isDark: color.isDark,
      isLight: color.isLight,
    }
  } catch (error) {
    console.error('Error extracting color:', error)
    return null
  } finally {
    fac.destroy()
  }
}
