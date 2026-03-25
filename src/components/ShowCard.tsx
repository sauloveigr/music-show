import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Show } from '@/types/show';
import { capitalizeFirst } from '@/lib/utils';

interface ShowCardProps {
  show: Show;
  variant?: 'default' | 'compact';
}

const ShowCard: React.FC<ShowCardProps> = ({ show, variant = 'default' }) => {
  const showDate = new Date(`${show.date}T${show.time}`);
  const isUpcoming = showDate >= new Date();

  return (
    <div className={`
      relative overflow-hidden rounded-2xl border border-border/30
      bg-gradient-to-br from-card to-secondary/30
      hover:border-primary/40 transition-all duration-300 hover:shadow-musical
      ${variant === 'compact' ? 'p-4' : 'p-6'}
    `}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-700 rounded-l-2xl" />

      <div className="pl-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <h3 className={`font-bold text-foreground truncate ${
              variant === 'compact' ? 'text-base' : 'text-lg'
            }`}>
              {capitalizeFirst(show.title)}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-sm truncate">{capitalizeFirst(show.venue) || '--'}</span>
            </div>
          </div>

          <span className={`
            shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase
            ${isUpcoming
              ? 'bg-emerald-500/15 text-emerald-400'
              : 'bg-muted text-muted-foreground'
            }
          `}>
            {isUpcoming ? 'Próximo' : 'Passado'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{format(showDate, "EEE, dd MMM", { locale: ptBR })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{format(showDate, 'HH:mm')}</span>
          </div>
          <span className="ml-auto text-base font-bold text-purple-400">
            R$ {show.fee.toLocaleString('pt-BR')}
          </span>
        </div>

        {show.notes && (
          <p className="mt-3 text-sm text-muted-foreground/80 line-clamp-2">{show.notes}</p>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
