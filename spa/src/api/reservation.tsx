import type { Reservation } from '@/types/reservation';
import axios from 'axios';

const API_URL = 'https://localhost:4000/api';

export const getReservationsByDate = async (date: string) => {
  const response = await axios.get(`${API_URL}/reservation/getByDate/${date}`);

  return (Array.isArray(response.data) ? response.data : []).map(
    (r): Reservation => ({
      id: Number(r.id),
      name: String(r.name ?? ''),
      hour: String(r.hour ?? ''),
      people: Number(r.people ?? 0),
      table: r.table === null || r.table === undefined ? null : String(r.table),
      notes: r.notes === null || r.notes === undefined ? null : String(r.notes),
    })
  );
};
