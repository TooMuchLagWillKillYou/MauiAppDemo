import { useEffect, useState } from 'react';
import { addHours, format } from 'date-fns';
import type { WeatherInfo } from '@/types/Weather';
import { useWeather } from '@/hooks/weatherHooks';
import { Spinner } from './ui/spinner';
import { cn } from '@/lib/utils';

function Forecast() {
  const { data, isLoading } = useWeather();
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));
  const [open, setOpen] = useState(false);

  const fourHoursFromNow = data?.hourly.filter(
    (x: WeatherInfo) =>
      x.hour >= new Date() && x.hour <= addHours(new Date(), 4)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(format(new Date(), 'HH:mm'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderForecast = (hour: string, emoji?: string, temp?: string) => (
    <div className="flex">
      <div className="text-4xl relative bottom-[.1rem]">{emoji}</div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{hour}</span>
        <span className="text-sm font-thin">{temp}°C</span>
      </div>
    </div>
  );

  if (isLoading) return <Spinner className="size-6" />;

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      {renderForecast(
        time,
        data?.current.display.emoji,
        data?.current.temp.toFixed()
      )}
      <div
        className={cn(
          'flex items-center overflow-hidden h-12 gap-2 whitespace-nowrap',
          'transition-[max-width,opacity] duration-300 ease-in-out',
          open ? 'max-w-[1000px] opacity-100' : 'max-w-0 opacity-0'
        )}
      >
        {fourHoursFromNow?.map((x) =>
          renderForecast(
            format(x.hour, 'HH:mm'),
            x.display.emoji,
            x.temp.toFixed()
          )
        )}
      </div>
    </div>
  );
}

export default Forecast;
