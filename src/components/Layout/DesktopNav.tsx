import React from 'react';
import { LucideIcon } from 'lucide-react';
import NavItem from './NavItem';

interface NavItemType {
  path: string;
  icon: LucideIcon;
  label: string;
}

interface DesktopNavProps {
  navItems: NavItemType[];
  currentPath: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems, currentPath }) => {
  return (
    <nav className="hidden md:flex items-center gap-2" aria-label="Navegação principal">
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          item={item}
          isActive={currentPath === item.path}
          variant="desktop"
        />
      ))}
    </nav>
  );
};

export default DesktopNav;
