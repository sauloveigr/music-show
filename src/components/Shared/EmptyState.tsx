import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
}) => {
  return (
    <Card as="article" className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 p-6 md:p-8 text-center">
      <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-400 mb-4">
        {description}
      </p>
      {action}
    </Card>
  );
};

export default EmptyState;
