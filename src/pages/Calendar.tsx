import React, { useCallback, useMemo, useState } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useShowStore } from '@/stores';
import { parseLocalDate } from '@/lib/utils';
import {
  CalendarDayDetailsPanel,
  CalendarMonthCard,
  CalendarMonthStats,
  CalendarPageHeader,
} from '@/components/Calendar';

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const { shows } = useShowStore();
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  /** Aligns with CALENDAR_WEEKDAY_LABELS: column 0 = Sunday (getDay 0–6). */
  const calendarCells = useMemo((): (Date | null)[] => {
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const leadingEmpty = getDay(monthStart);
    const leading: (Date | null)[] = Array.from({ length: leadingEmpty }, () => null);
    const total = leading.length + days.length;
    const trailingEmpty = (7 - (total % 7)) % 7;
    const trailing: (Date | null)[] = Array.from({ length: trailingEmpty }, () => null);
    return [...leading, ...days, ...trailing];
  }, [monthStart, monthEnd]);

  const getShowsForDate = useCallback(
    (date: Date) =>
      shows.filter((show) => isSameDay(parseLocalDate(show.date), date)),
    [shows],
  );

  const getShowCountForDate = useCallback(
    (date: Date) => getShowsForDate(date).length,
    [getShowsForDate],
  );

  const selectedDateShows = selectedDate ? getShowsForDate(selectedDate) : [];

  const { monthShowCount, monthEarnings } = useMemo(() => {
    const inMonth = shows.filter((show) =>
      isSameMonth(parseLocalDate(show.date), currentDate),
    );
    return {
      monthShowCount: inMonth.length,
      monthEarnings: inMonth.reduce((total, show) => total + show.fee, 0),
    };
  }, [shows, currentDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      if (direction === 'prev') {
        next.setMonth(prev.getMonth() - 1);
      } else {
        next.setMonth(prev.getMonth() + 1);
      }
      return next;
    });
    setSelectedDate(null);
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <CalendarPageHeader onBack={() => navigate(-1)} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section aria-label="Calendário mensal">
            <CalendarMonthCard
              currentDate={currentDate}
              selectedDate={selectedDate}
              calendarCells={calendarCells}
              getShowCountForDate={getShowCountForDate}
              onPrevMonth={() => navigateMonth('prev')}
              onNextMonth={() => navigateMonth('next')}
              onSelectDay={setSelectedDate}
              onGoToToday={goToToday}
            />
          </section>
          <CalendarDayDetailsPanel selectedDate={selectedDate} shows={selectedDateShows} />
        </div>

        <aside className="lg:col-span-1">
          <CalendarMonthStats
            currentDate={currentDate}
            showCount={monthShowCount}
            totalFee={monthEarnings}
          />
        </aside>
      </div>
    </div>
  );
};

export default Calendar;
