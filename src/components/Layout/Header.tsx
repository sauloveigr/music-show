import React from 'react';
import { LogOut } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useAuthStore } from '@/stores';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DesktopNav from './DesktopNav';
import logoUrl from '@src/assets/logo.png';

interface NavItemType {
  path: string;
  icon: LucideIcon;
  label: string;
}

interface HeaderProps {
  navItems: NavItemType[];
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ navItems, currentPath }) => {
  const { signOut, user } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
              <img src={logoUrl} alt="Music Show logo" className="h-6 w-6 object-contain md:h-8 md:w-8" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white md:text-xl">Show Time</h1>
              <p className="hidden text-sm text-gray-400 md:block">Gerencie seus shows</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <DesktopNav navItems={navItems} currentPath={currentPath} />

            {user && (
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-gray-300 lg:block">
                  {user.email?.split('@')[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="px-2 py-1 text-gray-300 hover:bg-gray-700 hover:text-white md:px-4 md:py-2"
                  aria-label="Sair da conta"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
