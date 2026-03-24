import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, DollarSign } from 'lucide-react';

interface ShowCardDetailsProps {
  date: Date;
  time: string;
  fee: number;
  variant?: 'default' | 'compact';
}

const ShowCardDetails: React.FC<ShowCardDetailsProps> = ({
  date,
  time,
  fee,
  variant = 'default',
}) => {
  return (
    <div className={`
      grid gap-2 mt-4
      ${variant === 'compact' ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}
    `}>
      <div className="flex items-center gap-2 text-gray-400">
        <Calendar className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm">
          {format(date, 'dd/MM/yyyy', { locale: ptBR })}
        </span>
      </div>

      <div className="flex items-center gap-2 text-gray-400">
        <Clock className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm">
          {time}
        </span>
      </div>

      <div className={`
        flex items-center gap-2 text-orange-400 font-medium
        ${variant === 'compact' ? 'col-span-2' : ''}
      `}>
        <DollarSign className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm">
          R$ {fee.toLocaleString('pt-BR')}
        </span>
      </div>
    </div>
  );
};

export default ShowCardDetails;
