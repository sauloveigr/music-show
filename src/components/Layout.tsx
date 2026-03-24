import React from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Home, Plus } from 'lucide-react';
import Header from '@/components/Layout/Header';
import MobileNav from '@/components/Layout/MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/add-show', icon: Plus, label: 'Adicionar Show' },
    { path: '/calendar', icon: Calendar, label: 'Calendário' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header navItems={navItems} currentPath={location.pathname} />

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      <MobileNav navItems={navItems} currentPath={location.pathname} />

      <div className="md:hidden h-20" />
    </div>
  );
};

export default Layout;
