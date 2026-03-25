import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShowCard from '@/components/ShowCard';
import { EmptyState } from '@/components/Shared';
import { Show } from '@/types/show';

interface UpcomingShowsListProps {
  shows: Show[];
}

const UpcomingShowsList: React.FC<UpcomingShowsListProps> = ({ shows }) => {
  return (
    <section>
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Próximos Shows</h2>
        <Button variant="ghost" size="md" className="w-full sm:w-auto">
          <Link to="/calendar" className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Ver calendário
          </Link>
        </Button>
      </header>

      {shows.length > 0 ? (
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
            <Button asChild variant="musical" className="w-full sm:w-auto mx-auto inline-flex">
              <Link to="/add-show" className="flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Show
              </Link>
            </Button>
          }
        />
      )}
    </section>
  );
};

export default UpcomingShowsList;
