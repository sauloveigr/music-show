import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  if (variant === 'mobile') {
    return (
      <Button
        variant={isActive ? 'musical' : 'ghost'}
        size="sm"
        className="flex flex-col gap-1 h-auto py-2 px-3 transition-all duration-300"
        onClick={() => navigate(item.path)}
      >
        <span className='flex flex-col items-center gap-1'>
          <Icon className="w-4 h-4" />
          <span className="text-xs">{item.label}</span>
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant={isActive ? 'musical' : 'ghost'}
      size="sm"
      className="transition-all duration-300 py-1"
      onClick={() => navigate(item.path)}
    >
      <span className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {item.label}
      </span>
    </Button>
  );
};

export default NavItem;
