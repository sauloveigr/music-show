import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardHeroProps {
  userName: string;
  upcomingCount: number;
  todayDate: Date;
  isShowsLoading?: boolean;
  onNewShowClick?: () => void;
}

const DashboardHero: React.FC<DashboardHeroProps> = ({
  userName,
  upcomingCount,
  todayDate,
  isShowsLoading = false,
  onNewShowClick,
}) => {
  const navigate = useNavigate();
  const pluralSuffix = upcomingCount > 1 ? 's' : '';

  const handleNewShow = () => {
    if (onNewShowClick) {
      onNewShowClick();
      return;
    }

    navigate('/add-show');
  };

  return (
    <section className="relative overflow-hidden" aria-label="Dashboard hero">
      <div
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-purple-900/20 border border-white/20 ring-1 ring-white/10 bg-gradient-to-br from-purple-600/35 to-purple-800/40 backdrop-blur-xl backdrop-saturate-150"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-fuchsia-400/15 blur-3xl" />
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/5 translate-y-12 -translate-x-12" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <header className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Olá, {userName}
              </h1>

              <p className="mt-2 text-white/65 text-xs md:text-base">
                {format(todayDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>

              {isShowsLoading ? (
                <div className="mt-3 inline-flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-48 md:w-64" />
                </div>
              ) : (
                upcomingCount > 0 && (
                  <p className="mt-3 inline-flex items-center justify-center md:justify-start gap-2 text-green-400 text-sm">
                    <Music className="h-4 w-4 text-green-400" />
                    Você tem {upcomingCount} show{pluralSuffix} próximo{pluralSuffix}
                  </p>
                )
              )}

              <p className="mt-4 text-white/60 text-sm md:text-base">
                Planeje sua agenda de shows em um só lugar.
              </p>
            </header>

            <div className="flex justify-center md:justify-end">
              <Button onClick={handleNewShow} type="button" variant="musical" size="lg" className="w-full md:w-auto">
                <span className="flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" />
                  Novo Show
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
