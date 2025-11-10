import axios from 'axios';

const API_URL = 'https://localhost:4000/api';

export const getReservationsByDate = async (date: string) => {
  const response = await axios.get(`${API_URL}/reservation/getByDate/${date}`);
  return response.data;
};
