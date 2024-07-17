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
        .catch((error) => console.error("useFetchReservations", error)),
  });
};

const useFetchReservationsByDate = (date) => {
  return useQuery({
    queryKey: ["reservations", date],
    queryFn: () =>
      axios
        .get(`${config.baseApiUrl}/reservations/${date}`)
        .then((response) => response.data)
        .catch((error) => console.error("useFetchReservationsByDate", error)),
  });
};

const useFetchReservation = (id) => {
  return useQuery({
    queryKey: ["reservations", id],
    queryFn: () =>
      axios
        .get(`${config.baseApiUrl}/reservation/${id}`)
        .then((response) => response.data)
        .catch((error) => console.error("useFetchReservation", error)),
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
    onError: (error) => {
      console.log("useAddReservation error", error.respose.data.errors);
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
    onError: (error) => {
      console.log("useUpdateReservation error", error.respose.data.errors);
    },
  });
};

const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => axios.delete(`${config.baseApiUrl}/reservations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
    onError: (error) => {
      console.log("useDeleteReservation error", error.respose.data.errors);
    },
  });
};

export default useFetchReservations;
export {
  useFetchReservationsByDate,
  useFetchReservation,
  useAddReservation,
  useUpdateReservation,
  useDeleteReservation,
};
