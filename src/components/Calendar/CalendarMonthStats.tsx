import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BarChart3, Calendar, Wallet } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CalendarMonthStatsProps {
  currentDate: Date;
  showCount: number;
  totalFee: number;
}

const CalendarMonthStats: React.FC<CalendarMonthStatsProps> = ({
  currentDate,
  showCount,
  totalFee,
}) => {
  const monthTitle = format(currentDate, 'MMMM yyyy', { locale: ptBR });

  return (
    <Card
      as="article"
      className="border border-white/10 bg-gradient-to-br from-gray-800/90 to-gray-900/95 p-5 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6"
    >
      <header className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
          <BarChart3 className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Resumo do mês</h3>
          <p className="text-xs capitalize text-gray-500">{monthTitle}</p>
        </div>
      </header>

      <dl className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-black/20 px-3 py-3">
          <dt className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4 shrink-0 text-purple-400" aria-hidden />
            Total de shows
          </dt>
          <dd className="text-lg font-semibold tabular-nums text-white">{showCount}</dd>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl bg-black/20 px-3 py-3">
          <dt className="flex items-center gap-2 text-sm text-gray-400">
            <Wallet className="h-4 w-4 shrink-0 text-orange-400" aria-hidden />
            Faturamento
          </dt>
          <dd className="text-lg font-semibold tabular-nums text-orange-400">
            R$ {totalFee.toLocaleString('pt-BR')}
          </dd>
        </div>
      </dl>
    </Card>
  );
};

export default CalendarMonthStats;
