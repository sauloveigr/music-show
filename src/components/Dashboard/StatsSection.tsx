import React from 'react';
import { Music, TrendingUp, Calendar } from 'lucide-react';
import StatCard from './StatCard';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsProps {
  thisMonthShowsCount: number;
  thisMonthEarnings: number;
  totalShowsCount: number;
  isLoading?: boolean;
}

const StatsSection: React.FC<StatsProps> = ({
  thisMonthShowsCount,
  thisMonthEarnings,
  totalShowsCount,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Card
            key={idx}
            as="article"
            className="relative overflow-hidden border-white/10 bg-gradient-to-br from-card to-secondary/40 p-5"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500/15 via-purple-500/60 to-purple-700/20" />
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-9 w-28" />
              </div>
              <Skeleton className="h-11 w-11 rounded-xl" />
            </div>
          </Card>
        ))}
      </section>
    );
  }

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
