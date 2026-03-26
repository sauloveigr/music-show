import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Show } from '@/types/show';
import { capitalizeFirst } from '@/lib/utils';
import { ShowDeleteConfirmModal } from '@/components/Shared';
import { useShowDeleteModal } from '@/hooks/useShowDeleteModal';

interface ShowCardProps {
  show: Show;
  variant?: 'default' | 'compact';
  onDeleteRequest?: (show: Show) => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, variant = 'default', onDeleteRequest }) => {
  const {
    showToDelete,
    isDeleting,
    requestDelete,
    cancelDelete,
    confirmDelete,
  } = useShowDeleteModal();
  const showDate = new Date(`${show.date}T${show.time}`);

  return (
    <>
      <div className={`
      relative overflow-hidden rounded-2xl shadow-lg shadow-black/20
      bg-gradient-to-br from-card to-secondary/30
      hover:border-purple-400/35 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20
      ${variant === 'compact' ? 'pt-4 pr-4 pb-4 pl-4' : 'pt-6 pr-6 pb-4 pl-6'}
    `}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-700 rounded-l-2xl" />

      <div className="pl-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <h3 className={`font-bold text-foreground truncate ${variant === 'compact' ? 'text-base' : 'text-lg'
              }`}>
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
                <span>{format(showDate, "EEE, dd MMM", { locale: ptBR })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{format(showDate, 'HH:mm')}</span>
              </div>
            </div>
          </div>
        </div>

        {show.notes && (
          <p className="mt-3 text-sm text-muted-foreground/80 line-clamp-2">{show.notes}</p>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute bottom-3 right-2 text-red-300 hover:bg-red-500/10 hover:text-red-200 py-1 px-2"
          onClick={() => {
            if (onDeleteRequest) {
              onDeleteRequest(show);
              return;
            }
            requestDelete(show);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

      </div>

      </div>

      {!onDeleteRequest && (
        <ShowDeleteConfirmModal
          isOpen={Boolean(showToDelete)}
          show={showToDelete}
          isLoading={isDeleting}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default ShowCard;
