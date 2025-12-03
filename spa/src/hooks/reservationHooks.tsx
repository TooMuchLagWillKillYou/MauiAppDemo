import apiConfig from '@/api/config';
import type { Reservation } from '@/types/reservation';
import { ReservationStatus } from '@/types/ReservationStatus';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useReservationsByDate = (date: Date) => {
  // can we improve performance by pre-fetching reservations for other days like in this article: https://tkdodo.eu/blog/practical-react-query ?
  return useQuery<Reservation[]>({
    queryKey: ['reservations', date],
    queryFn: async () => {
      const response = await axios.get(
        `${apiConfig.baseURL}/reservation/getByDate/${date.toDateString()}`
      );
      return (Array.isArray(response.data) ? response.data : []).map(
        (r): Reservation => ({
          id: Number(r.id),
          name: String(r.name ?? ''),
          hour: String(r.hour ?? ''),
          people: Number(r.people ?? 0),
          table:
            r.table === null || r.table === undefined ? null : String(r.table),
          notes:
            r.notes === null || r.notes === undefined ? null : String(r.notes),
          status: Number(r.status) as ReservationStatus,
        })
      );
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
const useAddReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reservation: Reservation) =>
      axios.post(`${apiConfig.baseURL}/reservation/add`, reservation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      console.error(`useAddReservation error: ${error.message}`);
    },
  });
};
const useUpdateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reservation: Reservation) =>
      await axios.put(`${apiConfig.baseURL}/reservation/update`, reservation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      console.error(`useUpdateReservation error: ${error.message}`);
    },
  });
};
const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${apiConfig.baseURL}/reservation/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      console.error(`useDeleteReservation error: ${error.message}`);
    },
  });
};
const useChangeReservationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: number }) =>
      await axios.patch(
        `${apiConfig.baseURL}/reservation/ChangeStatus/${id}/status`,
        { status }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      console.error(`useChangeReservationStatus error: ${error.message}`);
    },
  });
};
export {
  useReservationsByDate,
  useAddReservation,
  useUpdateReservation,
  useDeleteReservation,
  useChangeReservationStatus,
};
