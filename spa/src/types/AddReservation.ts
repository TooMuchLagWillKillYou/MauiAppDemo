export type AddReservation = {
  name: string;
  day: string;
  hour: string;
  people: number;
  tableId: number | undefined;
  notes: string | undefined;
};
