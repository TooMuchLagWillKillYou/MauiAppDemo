import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "../config.js";
import axios from "axios";

const useFetchPizzas = () => {
  return useQuery({
    queryKey: ["pizzas"],
    queryFn: () =>
      axios
        .get(`${config.baseApiUrl}/pizza`)
        .then((response) => response.data)
        .catch((error) => console.error("useFetchPizzas", error)),
  });
};

const useAddPizza = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pizza) => axios.post(`${config.baseApiUrl}/pizza`, pizza),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pizzas"],
      });
    },
    onError: (error) => {
      console.log("useAddPizza error", error.response.data.errors);
    },
  });
};

const useUpdatePizza = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pizza) => axios.put(`${config.baseApiUrl}/pizza`, pizza),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pizzas"],
      });
    },
    onError: (error) => {
      console.log("useUpdatePizza error", error.response.data.errors);
    },
  });
};

const useDeletePizza = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => axios.delete(`${config.baseApiUrl}/pizza/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pizzas"],
      });
    },
    onError: (error) => {
      console.log("useDeletePizza error", error.response.data.errors);
    },
  });
};

export { useFetchPizzas, useAddPizza, useUpdatePizza, useDeletePizza };
