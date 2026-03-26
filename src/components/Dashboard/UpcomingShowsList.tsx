import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ShowCard from '@/components/ShowCard';
import { EmptyState } from '@/components/Shared';
import { Show } from '@/types/show';

interface UpcomingShowsListProps {
  shows: Show[];
  isLoading?: boolean;
}

const UpcomingShowsList: React.FC<UpcomingShowsListProps> = ({ shows, isLoading = false }) => {
  const navigate = useNavigate();

  return (
    <section>
      <header className="flex justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Próximos Shows</h2>
        <Button variant="ghost" size="sm" onClick={() => navigate('/calendar')}>
          <span className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              Ver calendário
            </span>
          </span>
        </Button>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-card to-secondary/30 p-4"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-purple-700" />

              <div className="relative pl-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <Skeleton className="h-5 w-56" />
                    <div className="mt-6 flex items-center gap-2">
                      <Skeleton className="h-3 w-3.5 rounded-full" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3.5" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3.5" />
                    <Skeleton className="h-3 w-14" />
                  </div>
                  <Skeleton className="ml-auto h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : shows.length > 0 ? (
        <div className="space-y-4">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} variant="compact" />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Music}
          title="Nenhum show agendado"
          description="Comece adicionando seu primeiro show"
          action={
            <Button
              variant="musical"
              className="w-full sm:w-auto mx-auto inline-flex"
              onClick={() => navigate('/add-show')}
            >
              <span className="flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Show
              </span>
            </Button>
          }
        />
      )}
    </section>
  );
};

export default UpcomingShowsList;
