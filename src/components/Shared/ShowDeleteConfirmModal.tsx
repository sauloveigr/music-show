import React from 'react';
import type { Show } from '@/types/show';
import ConfirmActionModal from './ConfirmActionModal';

interface ShowDeleteConfirmModalProps {
  isOpen: boolean;
  show: Show | null;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ShowDeleteConfirmModal: React.FC<ShowDeleteConfirmModalProps> = ({
  isOpen,
  show,
  isLoading = false,
  onCancel,
  onConfirm,
}) => {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      title="Excluir show"
      description={
        <>
          <p>
            Tem certeza que deseja excluir{' '}
            <span className="font-semibold">"{show?.title}"</span>?
          </p>
          <p className="mt-1 text-xs text-gray-400">Esta ação não pode ser desfeita.</p>
        </>
      }
      confirmLabel={isLoading ? 'Excluindo...' : 'Excluir'}
      cancelLabel="Cancelar"
      isLoading={isLoading}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ShowDeleteConfirmModal;
