import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, bgColor, textColor }) => {
  return (
    <Card as="article" className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${textColor}`} />
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
