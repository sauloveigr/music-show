import React from 'react';
import { Music, TrendingUp, Calendar } from 'lucide-react';
import StatCard from './StatCard';

interface StatsProps {
  thisMonthShowsCount: number;
  thisMonthEarnings: number;
  totalShowsCount: number;
}

const StatsSection: React.FC<StatsProps> = ({
  thisMonthShowsCount,
  thisMonthEarnings,
  totalShowsCount,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={Music}
        label="Shows este mês"
        value={thisMonthShowsCount}
        bgColor="bg-purple-500/20"
        textColor="text-purple-400"
      />

      <StatCard
        icon={TrendingUp}
        label="Faturamento"
        value={`R$ ${thisMonthEarnings.toLocaleString('pt-BR')}`}
        bgColor="bg-green-500/20"
        textColor="text-green-400"
      />

      <StatCard
        icon={Calendar}
        label="Total de shows"
        value={totalShowsCount}
        bgColor="bg-orange-500/20"
        textColor="text-orange-400"
      />
    </section>
  );
};

export default StatsSection;
