import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Music2 } from 'lucide-react';
import ShowCard from '@/components/ShowCard';
import { Card } from '@/components/ui/card';
import type { Show } from '@/types/show';

interface CalendarDayDetailsPanelProps {
  selectedDate: Date | null;
  shows: Show[];
}

const CalendarDayDetailsPanel: React.FC<CalendarDayDetailsPanelProps> = ({
  selectedDate,
  shows,
}) => {
  return (
    <Card
      as="article"
      className="border border-white/10 bg-gradient-to-br from-gray-800/90 to-gray-900/95 p-5 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6"
    >
      <header className="mb-4 border-b border-white/10 pb-4">
        <h3 className="text-lg font-semibold text-white">
          {selectedDate ? (
            <>
              Shows em{' '}
              <span className="text-purple-300">
                {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
              </span>
            </>
          ) : (
            'Selecione uma data'
          )}
        </h3>
        {selectedDate && (
          <p className="mt-1 text-sm text-gray-500">
            {format(selectedDate, 'EEEE', { locale: ptBR })}
          </p>
        )}
      </header>

      {selectedDate ? (
        shows.length > 0 ? (
          <ul className="space-y-4">
            {shows.map((show) => (
              <li key={show.id}>
                <ShowCard show={show} variant="compact" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-10 text-center">
            <Music2 className="mb-3 h-12 w-12 text-gray-600" aria-hidden />
            <p className="text-sm text-gray-400">Nenhum show nesta data</p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-10 text-center">
          <Music2 className="mb-3 h-12 w-12 text-gray-600" aria-hidden />
          <p className="max-w-[220px] text-sm text-gray-400">
            Clique em um dia no calendário para ver os shows
          </p>
        </div>
      )}
    </Card>
  );
};

export default CalendarDayDetailsPanel;
