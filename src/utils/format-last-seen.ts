import { parseAbsolute, getLocalTimeZone, today, isSameDay } from '@internationalized/date'

export const formatLastSeen = (date: string) => {
  const localDateTime = parseAbsolute(date, getLocalTimeZone())
  const todayDate = today(getLocalTimeZone())

  const hour = localDateTime.hour
  const minute = localDateTime.minute.toString().padStart(2, '0')
  const period = hour >= 12 ? 'p.m' : 'a.m'
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  const timeString = `${displayHour}:${minute} ${period}`

  const isToday = isSameDay(localDateTime, todayDate)

  if (isToday) {
    return `a las ${timeString}`
  } else {
    return `el ${localDateTime.day}/${localDateTime.month} a las ${timeString}`
  }
}
