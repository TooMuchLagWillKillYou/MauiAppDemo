import { useEffect, useState } from "react";
import config from "../config";

const useFetchReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch(`${config.baseApiUrl}reservations`);
      const data = await response.json();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  return reservations;
};

export default useFetchReservations;
