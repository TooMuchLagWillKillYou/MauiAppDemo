import { parseWeatherResponse } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherApi } from 'openmeteo';

export function useWeather() {
  const params = {
    latitude: 45.8918,
    longitude: 12.3299,
    hourly: ['temperature_2m', 'weather_code'],
    current: ['temperature_2m', 'weather_code'],
    timezone: 'GMT',
    forecast_days: 1,
  };
  return useQuery({
    queryKey: ['weatherToday'],
    queryFn: async () => {
      const response = await fetchWeatherApi(
        'https://api.open-meteo.com/v1/forecast',
        params
      );
      return parseWeatherResponse(response[0]);
    },
  });
}
