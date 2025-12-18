import type { ClosureDay } from '@/types/closureDay';
import type { DayForMiniCalendar } from '@/types/DayForMiniCalendar';
import type { WeatherInfo } from '@/types/Weather';
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
function getWeatherDescription(code: number): {
  description: string;
  emoji: string;
} {
  switch (code) {
    case 0:
      return { description: 'fair', emoji: '☀' };
    case 1:
      return { description: 'mainly clear', emoji: '🌤' };
    case 2:
      return { description: 'partly cloudy', emoji: '⛅' };
    case 3:
      return { description: 'overcast', emoji: '🌥' };
    case 45:
      return { description: 'fog', emoji: '🌫' };
    case 48:
      return { description: 'depositing rime fog', emoji: '🌫' };
    case 51:
      return { description: 'light drizzle', emoji: '🌦' };
    case 53:
      return { description: 'moderate drizzle', emoji: '🌦' };
    case 55:
      return { description: 'dense drizzle', emoji: '🌧' };
    case 56:
      return { description: 'light freezing drizzle', emoji: '🌦' };
    case 57:
      return { description: 'dense freezing drizzle', emoji: '🌦' };
    case 61:
      return { description: 'slight rain', emoji: '🌧' };
    case 63:
      return { description: 'moderate rain', emoji: '🌧' };
    case 65:
      return { description: 'heavy rain', emoji: '🌧' };
    case 66:
      return { description: 'light freezing rain', emoji: '🌧' };
    case 67:
      return { description: 'heavy freezing rain', emoji: '🌧' };
    case 71:
      return { description: 'slight snow fall', emoji: '🌨' };
    case 73:
      return { description: 'moderate snow fall', emoji: '❄' };
    case 75:
      return { description: 'heavy snow fall', emoji: '❄' };
    case 77:
      return { description: 'snow grains', emoji: '❄' };
    case 80:
      return { description: 'slight rain showers', emoji: '🌧' };
    case 81:
      return { description: 'moderate rain showers', emoji: '🌧' };
    case 82:
      return { description: 'heavy rain showers', emoji: '🌧' };
    case 85:
      return { description: 'slight snow showers', emoji: '❄' };
    case 86:
      return { description: 'heavy snow showers', emoji: '❄' };
    case 95:
      return { description: 'slight to moderate thunderstorm', emoji: '🌩' };
    case 96:
      return { description: 'thunderstorm with slight hail', emoji: '⛈' };
    case 99:
      return { description: 'thunderstorm with heavy hail', emoji: '⛈' };
    default:
      return { description: '', emoji: '' };
  }
}
function parseWeatherResponse(data: any): {
  current: WeatherInfo;
  hourly: WeatherInfo[];
} {
  const utcOffsetSeconds = data.utcOffsetSeconds();
  const current = data.current()!;
  const hourly = data.hourly()!;

  // 1. Create a range of timestamps once
  const start = Number(hourly.time()) + utcOffsetSeconds;
  const end = Number(hourly.timeEnd()) + utcOffsetSeconds;
  const step = hourly.interval();

  const temps = hourly.variables(0)!.valuesArray()!;
  const codes = hourly.variables(1)!.valuesArray()!;

  // 2. Map them more efficiently
  const hourlyData = [];
  let currentIndex = 0;

  for (let time = start; time < end; time += step) {
    const weatherCode = Number(codes[currentIndex]);
    hourlyData.push({
      hour: new Date(time * 1000),
      temp: Number(temps[currentIndex]),
      display: getWeatherDescription(weatherCode),
    });
    currentIndex++;
  }

  // Note: The order of weather variables in the URL query and the indices below need to match!
  return {
    current: {
      hour: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temp: current.variables(0)!.value(),
      display: getWeatherDescription(current.variables(1)!.value() as number),
    },
    hourly: hourlyData,
  };
}
export {
  cn,
  isWithinRange,
  getDays,
  buildLocalDateTime,
  formatAxiosErrors,
  parseWeatherResponse,
};
