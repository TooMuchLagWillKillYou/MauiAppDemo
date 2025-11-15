import { DataTable } from '@/components/ui/data-table';
import { useReservationsByDate } from '@/hooks/reservationHooks';
import { columns, defaultColumn } from './columns';
import { useState } from 'react';

export default function Reservations() {
  const [date, setDate] = useState<Date>(new Date());
  const { data, isLoading, isError } = useReservationsByDate(date);

  if (isError) {
    return <p>Error loading reservations</p>;
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <DataTable
        columns={columns}
        defaultColumn={defaultColumn}
        data={data ?? []}
        date={date}
        setDate={setDate}
        isLoading={isLoading}
      />
    </div>
  );
}
