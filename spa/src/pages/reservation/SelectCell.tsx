import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateReservation } from '@/hooks/reservationHooks';
import type { Reservation } from '@/types/reservation';
import type { Row } from '@tanstack/react-table';
import { useTablesForDropdown } from '@/hooks/tableHooks';
import { useState } from 'react';

interface SelectCellProps {
  row: Row<Reservation>;
}

function SelectCell({ row }: SelectCellProps) {
  const { data } = useTablesForDropdown();
  const { mutateAsync } = useUpdateReservation();

  const [value, setValue] = useState(row.original.table?.toString());

  const handleChange = async (tableId: string) => {
    console.log('tableId', tableId);

    // const selected = data?.find((t) => t.value === tableId);
    // console.log('selected', selected);

    setValue(tableId);
    // if (!selected) return;

    await mutateAsync({
      id: row.original.id,
      name: row.original.name,
      day: row.original.day,
      hour: row.original.hour,
      people: row.original.people,
      tableId: Number(tableId),
      notes: row.original.notes,
    });
  };

  return (
    <Select defaultValue={value} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Choose table" />
      </SelectTrigger>

      <SelectContent>
        {data?.map((table) => {
          return (
            <SelectItem key={table.value} value={table.value.toString()}>
              {table.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default SelectCell;

// capire cosa sta succendendo di sbagliato:
// - è sbagliata la prop 'value' dell'option della select
// - oppure è l'api che manda il valore sbagliato?
// - oppure il valore dell'api viene parsato erroneamente da qualche parte?
