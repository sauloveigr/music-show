import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, bgColor, textColor }) => {
  return (
    <Card
      as="article"
      className="relative overflow-hidden border-white/10 bg-gradient-to-br from-card to-secondary/40 p-5 transition-colors hover:border-white/20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500/15 via-purple-500/60 to-purple-700/20" />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground/90">
            {label}
          </p>
          <p className="text-3xl font-semibold leading-none text-foreground">{value}</p>
        </div>
        <div className={`h-11 w-11 shrink-0 ${bgColor} rounded-xl flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${textColor}`} />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
