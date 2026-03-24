import React from 'react';
import { Music2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ShowCardHeader from '@/components/Show/ShowCardHeader';
import ShowCardDetails from '@/components/Show/ShowCardDetails';

interface ShowData {
  id: number;
  created_at: string;
  name: string;
  date: string;
  value: number;
  time: string;
}

interface ShowCardProps {
  show: ShowData;
  variant?: 'default' | 'compact';
}

const ShowCard: React.FC<ShowCardProps> = ({ show, variant = 'default' }) => {
  const showDate = new Date(`${show.date}T${show.time}`);
  const isUpcoming = showDate >= new Date();

  return (
    <Card className={`
      bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 hover:border-purple-500/50
      transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
      ${variant === 'compact' ? 'p-4' : 'p-6'}
    `}>
      <article className="flex items-start gap-4">
        <div className={`
          bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg
          ${variant === 'compact' ? 'w-12 h-12' : 'w-16 h-16'}
        `}>
          <Music2 className={`text-white ${variant === 'compact' ? 'w-6 h-6' : 'w-8 h-8'}`} />
        </div>

        <div className="flex-1 min-w-0">
          <ShowCardHeader title={show.name} isUpcoming={isUpcoming} />
          <ShowCardDetails date={showDate} time={show.time} fee={show.value} variant={variant} />
        </div>
      </article>
    </Card>
  );
};

export default ShowCard;
