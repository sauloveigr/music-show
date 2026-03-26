import React from 'react';
import { PageHeader } from '@/components/Forms';

interface CalendarPageHeaderProps {
  onBack: () => void;
}

const CalendarPageHeader: React.FC<CalendarPageHeaderProps> = ({ onBack }) => {
  return (
    <PageHeader
      title="Calendário"
      description="Visualize e planeje seus shows por mês"
      onBack={onBack}
    />
  );
};

export default CalendarPageHeader;
