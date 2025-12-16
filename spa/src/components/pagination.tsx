import { useGetRange } from '@/hooks/closureDayHooks';
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from './ui/shadcn-io/mini-calendar';
import { Spinner } from './ui/spinner';
import { addDays, subDays } from 'date-fns';
import { useState } from 'react';
import { getDays } from '@/lib/utils';

interface PaginationProps {
  setDay: (value: string) => void;
}
function Pagination({ setDay }: PaginationProps) {
  const numberOfDaysDisplayed = 24;
  const [from, setFrom] = useState<Date>(subDays(new Date(), 10));
  const [to, setTo] = useState<Date>(addDays(from, numberOfDaysDisplayed));
  const { data, isLoading, isError } = useGetRange(from, to);

  const handleStartDateChange = (d: Date) => {
    setFrom(d);
    setTo(addDays(d, numberOfDaysDisplayed));
  };

  if (isError) return <p>Error loading closure days</p>;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <MiniCalendar
      defaultStartDate={from}
      days={numberOfDaysDisplayed}
      onStartDateChange={handleStartDateChange}
      defaultValue={new Date()}
    >
      <MiniCalendarNavigation direction="prev" />
      <MiniCalendarDays days={getDays(from, numberOfDaysDisplayed, data!)}>
        {(date) => (
          <MiniCalendarDay
            date={date}
            key={date.day}
            onClick={() => setDay(date.day)}
          />
        )}
      </MiniCalendarDays>
      <MiniCalendarNavigation direction="next" />
    </MiniCalendar>
  );
}

export default Pagination;
