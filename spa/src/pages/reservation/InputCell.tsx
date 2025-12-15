import { Input } from '@/components/ui/input';
import { useUpdateReservation } from '@/hooks/reservationHooks';
import type { Reservation } from '@/types/Reservation';
import type { Column, Row } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface InputCellProps<TValue> {
  row: Row<Reservation>;
  column: Column<Reservation>;
  inputType?: 'text' | 'number' | 'time';
  className?: string;
  transformInput?: (raw: string, original: Reservation) => TValue;
}

function InputCell<TValue extends string | number>({
  row,
  column,
  inputType = 'text',
  className,
  transformInput,
}: InputCellProps<TValue>) {
  const reservation = row.original;
  const field = column.id;

  const [value, setValue] = useState<TValue>(reservation[field] as TValue);
  const { mutateAsync } = useUpdateReservation();

  useEffect(() => {
    const handler = setTimeout(async () => {
      const sanitizedValue =
        value && inputType === 'text' ? (value as string).trim() : value;

      if (sanitizedValue != reservation[field]) {
        reservation[field] = sanitizedValue;
        await mutateAsync(reservation);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    let v = e.target.value;

    if (transformInput) {
      v = transformInput(v, reservation) as TValue;
    }

    setValue(v);
  };
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e)}
      variant="flat"
      type={inputType}
      className={`px-0 ${className}`}
    />
  );
}

export default InputCell;
