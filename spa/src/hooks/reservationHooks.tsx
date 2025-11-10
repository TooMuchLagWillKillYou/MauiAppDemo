import { getReservationsByDate } from '@/api/reservation';
import { useQuery } from '@tanstack/react-query';

export const useReservationsByDate = (date: string) => {
  return useQuery({
    queryKey: ['reservations', date],
    queryFn: () => getReservationsByDate(date),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
