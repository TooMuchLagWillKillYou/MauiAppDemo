import type { ClosureDay } from '@/types/closureDay';
import type { DayForMiniCalendar } from '@/types/DayForMiniCalendar';
import { clsx, type ClassValue } from 'clsx';
import { addDays, format, isAfter, isBefore, isSameDay } from 'date-fns';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
function isWithinRange(d: Date, range: ClosureDay) {
  return (
    (isAfter(d, range.from) || isSameDay(d, range.from)) &&
    (isBefore(d, range.to) || isSameDay(d, range.to))
  );
}
const getDays = (
  startDate: Date,
  count: number,
  closureDays: ClosureDay[]
): DayForMiniCalendar[] => {
  const allDays: Date[] = [];

  for (let i = 0; i < count; i++) {
    allDays.push(addDays(startDate, i));
  }

  return allDays.map((day) => {
    const range = closureDays?.find((r) => isWithinRange(day, r));

    return {
      day: format(day, 'yyyy-MM-dd'),
      isClosed: range ? true : false,
      reason: range?.reason,
    };
  });
};
const buildLocalDateTime = (date: string, time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours);
  result.setMinutes(minutes);

  return result;
};
const formatAxiosErrors = (validationErrors: any) =>
  Object.entries(validationErrors)
    .flatMap(([field, messages]) =>
      // The structure is errors: { FieldName: ['message 1', 'message 2'] }
      (messages as string[]).map((m) => `${field}: ${m}`)
    )
    .join('\n'); // Join messages with a newline
export { cn, isWithinRange, getDays, buildLocalDateTime, formatAxiosErrors };
