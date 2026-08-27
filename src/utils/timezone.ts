import { formatInTimeZone, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { startOfDay, endOfDay, subDays, subMonths } from 'date-fns';

/**
 * Returns the current time in a specific timezone
 */
export const getCurrentTimeInZone = (timeZone: string = 'UTC') => {
  return toZonedTime(new Date(), timeZone);
};

/**
 * Formats a date to a string in a specific timezone
 */
export const formatDateInZone = (date: Date | string | number, formatStr: string, timeZone: string = 'UTC') => {
  return formatInTimeZone(date, timeZone, formatStr);
};

/**
 * Gets exact UTC start and end bounds based on a target timezone
 */
export const getBoundsForTimezone = (
  range?: string,
  timezone: string = 'Asia/Kolkata',
  customStart?: string,
  customEnd?: string
): { start?: Date; end?: Date } => {
  const now = new Date();
  const zonedNow = toZonedTime(now, timezone);

  let start: Date | undefined;
  let end: Date | undefined;

  switch (range) {
    case 'today':
      start = fromZonedTime(startOfDay(zonedNow), timezone);
      end = fromZonedTime(endOfDay(zonedNow), timezone);
      break;
    case 'yesterday':
      const yesterday = subDays(zonedNow, 1);
      start = fromZonedTime(startOfDay(yesterday), timezone);
      end = fromZonedTime(endOfDay(yesterday), timezone);
      break;
    case '7days':
      start = fromZonedTime(startOfDay(subDays(zonedNow, 7)), timezone);
      end = fromZonedTime(endOfDay(zonedNow), timezone);
      break;
    case '1month':
      start = fromZonedTime(startOfDay(subMonths(zonedNow, 1)), timezone);
      end = fromZonedTime(endOfDay(zonedNow), timezone);
      break;
    case 'custom':
    default:
      if (customStart) {
        start = fromZonedTime(`${customStart}T00:00:00`, timezone);
      }
      if (customEnd) {
        end = fromZonedTime(`${customEnd}T23:59:59.999`, timezone);
      }
      break;
  }

  return { start, end };
};
