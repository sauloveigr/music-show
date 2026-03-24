import React from 'react';
import { Music, LogOut } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useAuthStore } from '@/stores';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DesktopNav from './DesktopNav';

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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Show Manager</h1>
              <p className="text-sm text-gray-400">Gerencie seus shows</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DesktopNav navItems={navItems} currentPath={currentPath} />

            {user && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300 hidden sm:block">
                  Olá, {user.email?.split('@')[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
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
