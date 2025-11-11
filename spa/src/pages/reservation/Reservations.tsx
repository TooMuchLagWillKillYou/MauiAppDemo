import { DataTable } from '@/components/ui/data-table';
import { useReservationsByDate } from '@/hooks/reservationHooks';
import { columns } from './columns';

export default function Reservations() {
  const { data, isLoading, isError } = useReservationsByDate('2025-11-10');
  console.log('data', data);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading reservations</p>;

  return (
    <div className="container mx-auto py-10 px-6">
      <DataTable columns={columns} data={data!} />
    </div>
  );
}
