import { DataTable } from '@/components/ui/data-table';
import { useReservationsByDate } from '@/hooks/reservationHooks';
import { columns } from './columns';
import { useState } from 'react';
import { ReservationStatus } from '@/types/ReservationStatus';
import type { Reservation } from '@/types/Reservation';
import type { RowSelectionState } from '@tanstack/react-table';
import Pagination from '@/components/pagination';
import AddReservationForm from './AddReservationForm';
import { format } from 'date-fns';

export default function Reservations() {
  const [day, setDay] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const { data, isLoading } = useReservationsByDate(day);

  const getSelectedRows = (): RowSelectionState => {
    const arrivedReservations: Reservation[] = Array.from(data ?? []).filter(
      (r) => r.status == ReservationStatus.Arrived
    );
    return arrivedReservations.reduce<Record<string, boolean>>((acc, id) => {
      acc[String(id.id)] = true;
      return acc;
    }, {});
  };
  const unseatedGuests = data
    ?.filter((x) => x.status == ReservationStatus.NotArrived)
    .reduce((acc, curr) => acc + curr.people, 0);

  return (
    <div className="container mx-auto py-10 px-6">
      <Pagination setDay={setDay} />
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        defaultSelectedRows={getSelectedRows()}
        formComponent={<AddReservationForm day={day} />}
        unseatedGuests={unseatedGuests}
      />
    </div>
  );
}
