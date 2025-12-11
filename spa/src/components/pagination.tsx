import { useGetRange } from '@/hooks/closureDayHooks';
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from './ui/shadcn-io/mini-calendar';
import { Spinner } from './ui/spinner';
import { addDays, isAfter, isBefore, isSameDay, subDays } from 'date-fns';
import { useState } from 'react';

interface PaginationProps {
  setDate: (value: Date) => void;
}
function Pagination({ setDate }: PaginationProps) {
  const numberOfDaysDisplayed = 24;
  const [from, setFrom] = useState<Date>(subDays(new Date(), 10));
  const [to, setTo] = useState<Date>(addDays(from, numberOfDaysDisplayed));
  const { data, isLoading, isError } = useGetRange(from, to);

  const isClosureDay = (d: Date) => {
    return data!.some(
      (r) =>
        (isAfter(d, r.from) || isSameDay(d, r.from)) &&
        (isBefore(d, r.to) || isSameDay(d, r.to))
    );
  };

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
    >
      <MiniCalendarNavigation direction="prev" />
      <MiniCalendarDays>
        {(date) => (
          <MiniCalendarDay
            date={date}
            key={date.toISOString()}
            onClick={() => setDate(date)}
            isClosureDay={isClosureDay(date)}
          />
        )}
      </MiniCalendarDays>
      <MiniCalendarNavigation direction="next" />
    </MiniCalendar>
  );
}

export default Pagination;
