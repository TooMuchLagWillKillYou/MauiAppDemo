import { getReservationsByDate } from '@/api/reservation';
import type { Reservation } from '@/types/reservation';
import { useQuery } from '@tanstack/react-query';

export const useReservationsByDate = (date: string) => {
  return useQuery<Reservation[]>({
    queryKey: ['reservations', date],
    queryFn: () => getReservationsByDate(date),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
