import {
  CalendarDate,
  parseAbsolute,
  parseDate,
  toCalendarDate,
} from '@internationalized/date'

export const formatDate = (date: string | null): string => {
  if (!date) return ''

  let dateCalendar: CalendarDate

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    dateCalendar = parseDate(date)
  } else {
    const dateTime = parseAbsolute(date, 'UTC')
    dateCalendar = toCalendarDate(dateTime)
  }

  const { year, month, day } = dateCalendar
  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
}
