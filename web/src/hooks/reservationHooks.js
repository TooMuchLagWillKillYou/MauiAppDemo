import config from "../config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// https://tanstack.com/query/latest/docs/framework/react/guides/queries
const useFetchReservations = () => {
  return useQuery({
    queryKey: ["reservations"],
    queryFn: () =>
      axios
        .get(`${config.baseApiUrl}/reservations`)
        .then((response) => response.data)
        .catch((error) => console.error(error)),
  });
};

const useFetchReservation = () => {
  return useQuery({
    queryKey: ["reservations", id],
    queryFn: (id) =>
      axios
        .get(`${config.baseApiUrl}/reservation/${id}`)
        .then((response) => response.data)
        .catch((error) => console.error(error)),
  });
};

const useAddReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reservation) =>
      axios.post(`${config.baseApiUrl}/reservations`, reservation),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
  });
};

const useUpdateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reservation) =>
      axios.put(`${config.baseApiUrl}/reservations`, reservation),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
  });
};

const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => axios.delete(`${config.baseApiUrl}/reservations`, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
  });
};

export default useFetchReservations;
export {
  useFetchReservation,
  useAddReservation,
  useUpdateReservation,
  useDeleteReservation,
};
