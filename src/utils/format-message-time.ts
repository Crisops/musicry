import { parseAbsolute, getLocalTimeZone, now, isSameDay, today } from '@internationalized/date'

export const formatMessageTime = (date: string): string => {
  if (!date) return ''

  try {
    const localDateTime = parseAbsolute(date, getLocalTimeZone())
    const localNow = now(getLocalTimeZone())
    const todayDate = today(getLocalTimeZone())

    const dateMs = localDateTime.toDate().getTime()
    const nowMs = localNow.toDate().getTime()
    const diffMs = nowMs - dateMs
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    // Menos de 1 minuto
    if (diffMinutes < 1) return 'justo ahora'

    // Menos de 1 hora
    if (diffMinutes < 60) return `hace ${diffMinutes} minuto${diffMinutes === 1 ? '' : 's'}`

    // Mismo día
    if (isSameDay(localDateTime, todayDate)) {
      return `hace ${diffHours} hora${diffHours === 1 ? '' : 's'}`
    }

    // Ayer - verificar manualmente
    const yesterday = todayDate.subtract({ days: 1 })
    if (isSameDay(localDateTime, yesterday)) {
      return 'ayer'
    }

    // Menos de una semana
    if (diffDays < 7) return `hace ${diffDays} día${diffDays === 1 ? '' : 's'}`

    // Más de una semana - incluir año si es diferente
    const currentYear = todayDate.year
    if (localDateTime.year !== currentYear) {
      return `${localDateTime.day}/${localDateTime.month}/${localDateTime.year}`
    }

    return `${localDateTime.day}/${localDateTime.month}`
  } catch (error) {
    console.warn('Error formatting message time:', error)
    return ''
  }
}
