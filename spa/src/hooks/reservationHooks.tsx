import apiConfig from '@/api/config';
import type { Reservation } from '@/types/reservation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useReservationsByDate = (date: Date) => {
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
      console.log(`useAddReservation error: ${error.message}`);
    },
  });
};
const useUpdateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reservation: Reservation) =>
      axios.put(`${apiConfig.baseURL}/reservation/update`, reservation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error) => {
      console.log(`useUpdateReservation error: ${error.message}`);
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
      console.log(`useDeleteReservation error: ${error.message}`);
    },
  });
};
export {
  useReservationsByDate,
  useAddReservation,
  useUpdateReservation,
  useDeleteReservation,
};
