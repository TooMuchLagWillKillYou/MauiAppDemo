import type { ReservationStatus } from './ReservationStatus';
import type { TableData } from './TableData';

export interface Reservation extends TableData {
  [key: string]: string | number | null;
  id: number;
  name: string;
  hour: string;
  people: number;
  table: string | null;
  notes: string | null;
  status: ReservationStatus;
}
