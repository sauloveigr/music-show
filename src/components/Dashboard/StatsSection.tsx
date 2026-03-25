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
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 p-6"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-7 w-28" />
              </div>
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
