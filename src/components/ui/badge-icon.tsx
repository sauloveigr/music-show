import { LucideIcon } from 'lucide-react';

interface BadgeIconProps {
  bgColor: string;
  textColor: string;
  icon: LucideIcon;
}

export const BadgeIcon = ({ icon: Icon, bgColor, textColor }: BadgeIconProps) => (
  <div className={`h-11 w-11 shrink-0 ${bgColor} rounded-xl flex items-center justify-center`}>
    <Icon className={`h-5 w-5 ${textColor}`} />
  </div>
)