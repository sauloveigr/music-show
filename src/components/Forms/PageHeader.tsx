import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description: string;
  onBack: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, onBack }) => {
  return (
    <header className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="hover:bg-gray-800"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
    </header>
  );
};

export default PageHeader;
