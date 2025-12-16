import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateReservation } from '@/hooks/reservationHooks';
import type { Reservation } from '@/types/Reservation';
import type { TableForDropdown } from '@/types/tableForDropdown';
import { useState } from 'react';
import type { Column, Row } from '@tanstack/react-table';
import { useTablesForDropdown } from '@/hooks/tableHooks';
import type { Table } from '@/types/Table';

interface SelectCellProps {
  row: Row<Reservation>;
  column: Column<Reservation>;
}

function SelectCell({ row }: SelectCellProps) {
  const { data } = useTablesForDropdown();
  const reservation = row.original as Reservation;

  const [value, setValue] = useState<string | undefined>(
    reservation.table?.id.toString() ?? ''
  );
  const { mutateAsync } = useUpdateReservation();

  const handleChange = async (value: string) => {
    console.log(value);
    const selectedTable = data?.find((x) => x.value == value);
    const table: Table = {
      id: parseInt(selectedTable?.value ?? ''),
      description: selectedTable?.value ?? '',
    };
    reservation.table = table;

    await mutateAsync(reservation);
    setValue(value);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Choose table" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((x, i) => (
          <SelectItem key={`option-table-${i}`} value={x.value}>
            {x.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectCell;
