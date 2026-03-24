import React from 'react';
import { LucideIcon } from 'lucide-react';
import NavItem from './NavItem';

interface NavItemType {
  path: string;
  icon: LucideIcon;
  label: string;
}

interface MobileNavProps {
  navItems: NavItemType[];
  currentPath: string;
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems, currentPath }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700/50 backdrop-blur-sm" aria-label="Navegação mobile">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isActive={currentPath === item.path}
            variant="mobile"
          />
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
