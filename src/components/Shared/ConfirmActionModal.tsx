import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmActionModalProps {
  isOpen: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-dvh w-screen items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
      onClick={() => !isLoading && onCancel()}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-gray-800/95 to-gray-900/95 p-6 shadow-2xl shadow-purple-900/30 backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-16 h-48 w-48 rounded-full bg-purple-500/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-3xl" />
        </div>

        <div className="relative z-10">
          <button
            type="button"
            className="absolute right-0 top-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Fechar modal"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-300 ring-1 ring-red-400/20">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">{title}</h4>
              <p className="mt-0.5 text-xs text-purple-200/70">Atenção: ação destrutiva</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-gray-300">
            {description}
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:bg-white/10 hover:text-white"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              size="md"
              className="bg-red-500/15 text-red-300 ring-1 ring-red-400/25 hover:bg-red-500/25 hover:text-red-200"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
