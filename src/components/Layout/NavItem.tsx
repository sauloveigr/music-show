import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItemType {
  path: string;
  icon: LucideIcon;
  label: string;
}

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  variant?: 'desktop' | 'mobile';
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, variant = 'desktop' }) => {
  const Icon = item.icon;

  if (variant === 'mobile') {
    return (
      <Button
        asChild
        variant={isActive ? 'musical' : 'ghost'}
        size="sm"
        className="flex flex-col gap-1 h-auto py-2 px-3 transition-all duration-300"
      >
        <Link to={item.path} className='flex flex-col items-center gap-1'>
          <Icon className="w-4 h-4" />
          <span className="text-xs">{item.label}</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant={isActive ? 'musical' : 'ghost'}
      size="sm"
      className="transition-all duration-300 py-1"
    >
      <Link to={item.path} className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {item.label}
      </Link>
    </Button>
  );
};

export default NavItem;
