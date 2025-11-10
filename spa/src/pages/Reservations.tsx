import { useReservationsByDate } from '@/hooks/reservationHooks';

export default function Reservations() {
  const { data, isLoading, isError } = useReservationsByDate('2025-11-10');
  console.log('reservation', data);

  return <>reservations</>;
}
