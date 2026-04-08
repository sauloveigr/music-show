import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Home, Plus } from 'lucide-react';
import Header from '@/components/Layout/Header';
import MobileNav from '@/components/Layout/MobileNav';
import { useShowStore } from '@/stores';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const fetchShows = useShowStore((s) => s.fetchShows);

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  const navItems = [
    { path: '/app', icon: Home, label: 'Início' },
    { path: '/add-show', icon: Plus, label: 'Adicionar Show' },
    { path: '/calendar', icon: Calendar, label: 'Calendário' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header navItems={navItems} currentPath={location.pathname} />

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      <MobileNav navItems={navItems} currentPath={location.pathname} />

      <div className="h-14 md:hidden" />
    </div>
  );
};

export default Layout;
