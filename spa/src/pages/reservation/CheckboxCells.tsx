import { Checkbox } from '@/components/ui/checkbox';
import { useChangeReservationStatus } from '@/hooks/reservationHooks';
import type { CheckedState } from '@radix-ui/react-checkbox';

interface CheckboxCellProps {
  id: number;
  checked: boolean;
  toggleRowSelection: (value: CheckedState) => void;
}
function CheckboxCell({ id, checked, toggleRowSelection }: CheckboxCellProps) {
  const { mutateAsync } = useChangeReservationStatus();
  const handleChange = async (value: CheckedState) => {
    toggleRowSelection(value);
    await mutateAsync({ id, status: value === true ? 1 : 0 });
  };
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => handleChange(value)}
      aria-label="Select row"
    />
  );
}

export default CheckboxCell;
