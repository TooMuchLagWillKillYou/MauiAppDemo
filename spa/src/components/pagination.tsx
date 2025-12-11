import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from './ui/shadcn-io/mini-calendar';

interface PaginationProps {
  setDate: (value: Date) => void;
}
function Pagination({ setDate }: PaginationProps) {
  const today = new Date();
  today.setDate(today.getDate() - 10);

  return (
    <MiniCalendar defaultStartDate={today} days={24}>
      <MiniCalendarNavigation direction="prev" />
      <MiniCalendarDays>
        {(date) => (
          <MiniCalendarDay
            date={date}
            key={date.toISOString()}
            onClick={() => setDate(date)}
          />
        )}
      </MiniCalendarDays>
      <MiniCalendarNavigation direction="next" />
    </MiniCalendar>
  );
}

export default Pagination;
