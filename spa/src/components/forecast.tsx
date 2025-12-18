import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useWeather } from '@/hooks/weatherHooks';
import { Spinner } from './ui/spinner';

function Forecast() {
  const { data, isLoading } = useWeather();
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(format(new Date(), 'HH:mm'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Spinner className="size-6" />;
  }
  return (
    <>
      <span className="text-xl ">{time}</span>
      <div className="text-3xl relative bottom-1">
        {data?.current.display.emoji}
      </div>
      <div className="text-xl font-thin">{data?.current.temp.toFixed()}°C</div>
    </>
  );
}

export default Forecast;
