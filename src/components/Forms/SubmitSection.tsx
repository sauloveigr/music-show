import React from 'react';
import { Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubmitSectionProps {
  isSubmitting: boolean;
  onCancel: () => void;
  submitLabel?: string;
  /** When true, uses Save icon instead of Plus (e.g. edit form). */
  isEdit?: boolean;
}

const SubmitSection: React.FC<SubmitSectionProps> = ({
  isSubmitting,
  onCancel,
  submitLabel = 'Adicionar Show',
  isEdit = false,
}) => {
  const icon = isEdit ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />;
  return (
    <footer className="flex flex-col sm:flex-row gap-3 pt-4">
      <Button
        type="submit"
        variant="musical"
        size="lg"
        disabled={isSubmitting}
        className="flex-1"
        label={submitLabel}
        iconLeft={icon}
      />

      <Button
        type="button"
        variant="outline"
        size="md"
        onClick={onCancel}
        className="sm:w-auto"
        label="Cancelar"
      />
    </footer>
  );
};

export default SubmitSection;
