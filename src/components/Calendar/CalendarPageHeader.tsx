import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarPageHeaderProps {
  onBack: () => void;
}

const CalendarPageHeader: React.FC<CalendarPageHeaderProps> = ({ onBack }) => {
  return (
    <header className="flex items-start gap-4">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="shrink-0 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        aria-label="Voltar"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div className="min-w-0">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Calendário
        </h1>
        <p className="mt-1 text-sm text-gray-400 sm:text-base">
          Visualize e planeje seus shows por mês
        </p>
      </div>
    </header>
  );
};

export default CalendarPageHeader;
