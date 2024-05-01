import config from "../config";
import { useQuery } from "@tanstack/react-query";
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

export default useFetchReservations;
