import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Show } from '@/types/show';
import { capitalizeFirst } from '@/lib/utils';

interface ShowCardProps {
  show: Show;
  variant?: 'default' | 'compact';
}

const ShowCard: React.FC<ShowCardProps> = ({ show, variant = 'default' }) => {
  const navigate = useNavigate();
  const showDate = new Date(`${show.date}T${show.time}`);

  return (
    <div
      className={`
      relative overflow-hidden rounded-2xl shadow-lg shadow-black/20
      bg-gradient-to-br from-card to-secondary/30
      hover:border-purple-400/35 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20
      ${variant === 'compact' ? 'pt-4 pr-4 pb-4 pl-4' : 'pt-6 pr-6 pb-4 pl-6'}
    `}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-700 rounded-l-2xl" />

      <div className="min-w-0 pl-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <h3
              className={`font-bold text-foreground truncate ${variant === 'compact' ? 'text-base' : 'text-lg'
                }`}
            >
              {capitalizeFirst(show.title)}
            </h3>
          </div>

          <span className="ml-2 shrink-0 text-base font-bold text-emerald-400">
            R$ {show.fee.toLocaleString('pt-BR')}
          </span>
        </div>

        <div className="flex items-start gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{capitalizeFirst(show.venue) || '--'}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{format(showDate, 'EEE, dd MMM', { locale: ptBR })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{format(showDate, 'HH:mm')}</span>
              </div>
            </div>
          </div>
        </div>

        {show.notes && (
          <p className="mt-3 min-w-0 text-sm text-muted-foreground/80 max-sm:truncate sm:line-clamp-2">
            {show.notes}
          </p>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute bottom-3 right-2 text-purple-300 hover:bg-purple-500/15 py-2 hover:text-purple-100"
          onClick={() => navigate(`/shows/${show.id}/edit`)}
          aria-label="Editar show"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ShowCard;
