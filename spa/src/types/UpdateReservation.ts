export type AddReservation = {
  id: number;
  name: string;
  day: string;
  hour: string;
  people: number;
  tableId: number | undefined;
  notes: string | null;
};
