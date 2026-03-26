import React from 'react';
import { toast } from 'sonner';
import { useShowStore } from '@/stores/showStore';
import type { Show } from '@/types/show';

export function useShowDeleteModal() {
  const { deleteShow } = useShowStore();
  const [showToDelete, setShowToDelete] = React.useState<Show | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const requestDelete = React.useCallback((show: Show) => {
    setShowToDelete(show);
  }, []);

  const cancelDelete = React.useCallback(() => {
    setShowToDelete(null);
  }, []);

  const confirmDelete = React.useCallback(async () => {
    if (!showToDelete) return;

    setIsDeleting(true);
    await deleteShow(showToDelete.id);
    setIsDeleting(false);

    const storeError = useShowStore.getState().error;
    if (storeError) {
      toast.error('Erro ao excluir show', { description: storeError });
      return;
    }

    toast.success('Show excluído com sucesso!');
    setShowToDelete(null);
  }, [deleteShow, showToDelete]);

  return {
    showToDelete,
    isDeleting,
    requestDelete,
    cancelDelete,
    confirmDelete,
  };
}
