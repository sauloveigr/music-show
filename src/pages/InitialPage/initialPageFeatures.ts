import { CalendarDays, DollarSign, BarChart3, type LucideIcon } from 'lucide-react';

export interface InitialPageFeature {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export const INITIAL_PAGE_FEATURES: InitialPageFeature[] = [
  {
    icon: CalendarDays,
    title: 'Agenda inteligente',
    subtitle: 'Visualize todos os seus shows em um calendário organizado.',
  },
  {
    icon: DollarSign,
    title: 'Controle financeiro',
    subtitle: 'Acompanhe cachês e faturamento mês a mês.',
  },
  {
    icon: BarChart3,
    title: 'Visão geral',
    subtitle: 'Estatísticas e insights sobre sua carreira musical.',
  },
];
