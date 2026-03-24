import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Music2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShowStore } from '@/stores';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const { shows } = useShowStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getShowsForDate = (date: Date) => {
    return shows.filter(show => isSameDay(new Date(show.date), date));
  };

  const selectedDateShows = selectedDate ? getShowsForDate(selectedDate) : [];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">Calendário</h1>
          <p className="text-gray-400">Visualize seus shows mensais</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <section className="lg:col-span-2">
          <Card as="article" className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 p-6">
            {/* Calendar Header */}
            <header className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
              </h2>
              <nav className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth('prev')}
                  aria-label="Mês anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth('next')}
                  aria-label="Próximo mês"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </nav>
            </header>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {daysInMonth.map(day => {
                const dayShows = getShowsForDate(day);
                const hasShows = dayShows.length > 0;
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isDayToday = isToday(day);
                const isSelected = selectedDate && isSameDay(day, selectedDate);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      relative p-2 h-12 text-sm font-medium rounded-lg transition-all duration-200
                      ${isCurrentMonth ? 'text-white' : 'text-gray-600'}
                      ${isDayToday ? 'bg-purple-600 text-white' : ''}
                      ${isSelected ? 'bg-purple-400 text-white' : ''}
                      ${!isDayToday && !isSelected ? 'hover:bg-gray-700' : ''}
                      ${hasShows && !isDayToday && !isSelected ? 'bg-purple-600/20 text-purple-400' : ''}
                    `}
                    aria-label={`${format(day, 'dd/MM/yyyy')}${hasShows ? ` - ${dayShows.length} show(s)` : ''}`}
                  >
                    {format(day, 'd')}
                    {hasShows && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className={`
                          w-1.5 h-1.5 rounded-full
                          ${isDayToday || isSelected ? 'bg-white' : 'bg-purple-400'}
                        `} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </section>

        {/* Shows for Selected Date */}
        <aside className="space-y-6">
          <Card as="article" className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 p-6">
            <header>
              <h3 className="text-lg font-semibold text-white mb-4">
                {selectedDate ? (
                  <>Shows em {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}</>
                ) : (
                  'Selecione uma data'
                )}
              </h3>
            </header>

            {selectedDate ? (
              selectedDateShows.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateShows.map(show => (
                    <section key={show.id} className="border border-gray-700/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Music2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white">{show.title}</h4>
                          <p className="text-sm text-gray-400">{show.venue}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-gray-400">{show.time}</span>
                            <span className="text-orange-400 font-medium">
                              R$ {show.fee.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Music2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">Nenhum show nesta data</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <Music2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400">
                  Clique em uma data para ver os shows
                </p>
              </div>
            )}
          </Card>

          {/* Stats */}
          <Card as="article" className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 p-6">
            <header>
              <h3 className="text-lg font-semibold text-white mb-4">
                Estatísticas do Mês
              </h3>
            </header>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total de shows</span>
                <span className="font-medium text-white">
                  {shows.filter(show => isSameMonth(new Date(show.date), currentDate)).length}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Faturamento</span>
                <span className="font-medium text-orange-400">
                  R$ {shows
                    .filter(show => isSameMonth(new Date(show.date), currentDate))
                    .reduce((total, show) => total + show.fee, 0)
                    .toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default Calendar;
