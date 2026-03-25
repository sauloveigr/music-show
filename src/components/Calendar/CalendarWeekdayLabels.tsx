import React from 'react';
import { CALENDAR_WEEKDAY_LABELS } from './calendarConstants';

const CalendarWeekdayLabels: React.FC = () => {
  return (
    <div
      className="mb-2 grid grid-cols-7 gap-1"
      role="row"
      aria-hidden
    >
      {CALENDAR_WEEKDAY_LABELS.map((day) => (
        <div
          key={day}
          className="p-2 text-center text-xs font-medium uppercase tracking-wide text-gray-500 sm:text-sm"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarWeekdayLabels;
