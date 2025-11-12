import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { sub, add, format, isToday } from 'date-fns';
import { TypographyH1 } from './ui/typography-h1';
import { cn } from '@/lib/utils';

interface PaginationProps {
  date: Date;
  setDate: (value: Date) => void;
  classNames?: string;
}
function Pagination({ date, setDate, classNames }: PaginationProps) {
  return (
    <div className={cn('flex justify-between', classNames)}>
      <Button
        variant="outline"
        size="icon"
        aria-label="Pagination left"
        onClick={() => setDate(sub(date, { days: 1 }))}
      >
        <ArrowLeftIcon />
      </Button>
      <TypographyH1 text={isToday(date) ? 'Today' : format(date, 'eeee d')} />
      <Button
        variant="outline"
        size="icon"
        aria-label="Pagination right"
        onClick={() => setDate(add(date, { days: 1 }))}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}

export default Pagination;
