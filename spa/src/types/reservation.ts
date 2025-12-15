import type { ReservationStatus } from './ReservationStatus';
import type { Table } from './Table';
import type { TableData } from './TableData';

export interface Reservation extends TableData {
  [key: string]: string | number | Table | null;
  id: number;
  name: string;
  day: string;
  hour: string;
  people: number;
  table: Table | null;
  notes: string | null;
  status: ReservationStatus;
}
