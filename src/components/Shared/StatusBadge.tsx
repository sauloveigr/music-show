import React from 'react';

interface StatusBadgeProps {
  status: 'upcoming' | 'past';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    upcoming: 'bg-green-500/20 text-green-400',
    past: 'bg-gray-600 text-gray-400',
  };

  const labels = {
    upcoming: 'Próximo',
    past: 'Passado',
  };

  return (
    <div className={`
      px-3 py-1 rounded-full text-xs font-medium
      ${styles[status]}
    `}>
      {labels[status]}
    </div>
  );
};

export default StatusBadge;
