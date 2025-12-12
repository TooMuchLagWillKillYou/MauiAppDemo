import { DataTable } from '@/components/ui/data-table';
import { useReservationsByDate } from '@/hooks/reservationHooks';
import { columns } from './columns';
import { useState } from 'react';
import { ReservationStatus } from '@/types/ReservationStatus';
import type { Reservation } from '@/types/reservation';
import type { RowSelectionState } from '@tanstack/react-table';
import Pagination from '@/components/pagination';
import AddReservationForm from './AddReservationForm';

export default function Reservations() {
  const [date, setDate] = useState<Date>(new Date());
  const { data, isLoading, isError } = useReservationsByDate(date);

  if (isError) {
    return <p>Error loading reservations</p>;
  }

  const getSelectedRows = (): RowSelectionState => {
    const arrivedReservations: Reservation[] = Array.from(data ?? []).filter(
      (r) => r.status == ReservationStatus.Arrived
    );
    return arrivedReservations.reduce<Record<string, boolean>>((acc, id) => {
      acc[String(id.id)] = true;
      return acc;
    }, {});
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <Pagination setDate={setDate} />
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        defaultSelectedRows={getSelectedRows()}
        formComponent={<AddReservationForm />}
      />
    </div>
  );
}
