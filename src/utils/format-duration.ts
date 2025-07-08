export const formatDuration = (duration: number | number[]): string => {
  if (duration === 0) return '00:00'
  const currentTime = Array.isArray(duration) ? duration[0] : duration
  const totalSeconds = Math.floor(currentTime)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
