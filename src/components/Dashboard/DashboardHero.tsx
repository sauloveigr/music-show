import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

interface DashboardHeroProps {
  upcomingCount: number;
  todayDate: Date;
  onNewShowClick?: () => void;
}

const DashboardHero: React.FC<DashboardHeroProps> = ({ upcomingCount, todayDate, onNewShowClick }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <header className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Bem-vindo de volta! 🎵
              </h1>
              <p className="text-white/90 text-base md:text-lg">
                {format(todayDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
              {upcomingCount > 0 && (
                <p className="text-white/80 mt-2">
                  Você tem {upcomingCount} show{upcomingCount > 1 ? 's' : ''} próximo{upcomingCount > 1 ? 's' : ''}
                </p>
              )}
            </header>

            <div className="flex justify-center md:justify-end">
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full md:w-auto">
                <Link to="/add-show" className="flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Novo Show
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
      </div>
    </section>
  );
};

export default DashboardHero;
