import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubmitSectionProps {
  isSubmitting: boolean;
  onCancel: () => void;
  submitLabel?: string;
}

const SubmitSection: React.FC<SubmitSectionProps> = ({
  isSubmitting,
  onCancel,
  submitLabel = 'Adicionar Show',
}) => {
  return (
    <footer className="flex flex-col sm:flex-row gap-3 pt-4">
      <Button
        type="submit"
        variant="musical"
        size="lg"
        disabled={isSubmitting}
        className="flex-1"
      >
        <Plus className="w-5 h-5" />
        {isSubmitting ? `${submitLabel.split(' ')[0]}...` : submitLabel}
      </Button>

      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onCancel}
        className="sm:w-auto"
      >
        Cancelar
      </Button>
    </footer>
  );
};

export default SubmitSection;
