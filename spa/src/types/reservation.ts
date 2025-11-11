export type Reservation = {
  id: number;
  name: string;
  hour: string;
  people: number;
  table: string | null;
  notes: string | null;
};
