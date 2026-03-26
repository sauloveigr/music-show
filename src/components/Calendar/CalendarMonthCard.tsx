import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CalendarWeekdayLabels from './CalendarWeekdayLabels';
import CalendarDayCell from './CalendarDayCell';

interface CalendarMonthCardProps {
  currentDate: Date;
  selectedDate: Date | null;
  daysInMonth: Date[];
  getShowCountForDate: (date: Date) => number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: Date) => void;
  onGoToToday: () => void;
}

const CalendarMonthCard: React.FC<CalendarMonthCardProps> = ({
  currentDate,
  selectedDate,
  daysInMonth,
  getShowCountForDate,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
  onGoToToday,
}) => {
  return (
    <Card
      as="article"
      className="p-5 sm:p-6"
    >
      <header className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/20 text-purple-300">
            <CalendarDays className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold capitalize text-white sm:text-xl">
              {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
            </h2>
            <p className="text-xs text-gray-500">Clique em um dia para ver os detalhes</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onGoToToday}
            className="border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            Hoje
          </Button>
          <nav
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 p-0.5"
            aria-label="Navegar entre meses"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onPrevMonth}
              className="h-9 w-9 text-white hover:bg-white/10"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onNextMonth}
              className="h-9 w-9 text-white hover:bg-white/10"
              aria-label="Próximo mês"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      <CalendarWeekdayLabels />

      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Dias do mês">
        {daysInMonth.map((day) => (
          <CalendarDayCell
            key={day.toISOString()}
            day={day}
            currentMonth={currentDate}
            selectedDate={selectedDate}
            showCount={getShowCountForDate(day)}
            onSelect={onSelectDay}
          />
        ))}
      </div>
    </Card>
  );
};

export default CalendarMonthCard;
