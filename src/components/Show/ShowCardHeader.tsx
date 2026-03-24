import React from 'react';
import { StatusBadge } from '@/components/Shared';

interface ShowCardHeaderProps {
  title: string;
  isUpcoming: boolean;
}

const ShowCardHeader: React.FC<ShowCardHeaderProps> = ({ title, isUpcoming }) => {
  return (
    <header className="flex items-start justify-between gap-2">
      <div>
        <h3 className="font-semibold text-white text-lg truncate">
          {title}
        </h3>
      </div>
      <StatusBadge status={isUpcoming ? 'upcoming' : 'past'} />
    </header>
  );
};

export default ShowCardHeader;
