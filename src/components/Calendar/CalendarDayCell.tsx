import React from 'react';
import { format, isSameDay, isSameMonth, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

interface CalendarDayCellProps {
  day: Date;
  currentMonth: Date;
  selectedDate: Date | null;
  showCount: number;
  onSelect: (day: Date) => void;
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  currentMonth,
  selectedDate,
  showCount,
  onSelect,
}) => {
  const hasShows = showCount > 0;
  const inCurrentMonth = isSameMonth(day, currentMonth);
  const dayIsToday = isToday(day);
  const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      className={cn(
        'relative flex h-11 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 sm:h-12',
        inCurrentMonth ? 'text-white' : 'text-gray-600',
        // Only one "active" look: the selected day
        isSelected &&
          'z-[1] bg-purple-500 text-white shadow-md shadow-purple-900/30 ring-2 ring-purple-400/60',
        // Today when another day is selected: subtle ring only (must not look like selection)
        !isSelected &&
          dayIsToday &&
          'ring-2 ring-inset ring-purple-500/70 bg-purple-950/30 text-purple-100',
        !isSelected && !dayIsToday && 'hover:bg-white/10',
        hasShows && !isSelected && !dayIsToday && 'bg-purple-600/15 text-purple-300',
        hasShows && !isSelected && dayIsToday && 'bg-purple-600/20',
      )}
      aria-label={`${format(day, 'dd/MM/yyyy')}${hasShows ? `, ${showCount} show(s)` : ''}`}
      aria-pressed={isSelected}
    >
      <span>{format(day, 'd')}</span>
      {hasShows && (
        <span className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 justify-center">
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              isSelected ? 'bg-white' : dayIsToday ? 'bg-purple-300' : 'bg-purple-400',
            )}
          />
        </span>
      )}
    </button>
  );
};

export default CalendarDayCell;
