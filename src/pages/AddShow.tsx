import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader, FormFieldGroup, ShowFormSkeleton, SubmitSection } from '@/components/Forms';
import { Show, ShowFormData } from '@/types/show';
import { useShowStore } from '@/stores/showStore';
import { ShowDeleteConfirmModal } from '@/components/Shared';
import { useShowDeleteModal } from '@/hooks/useShowDeleteModal';

const NOTES_MAX_LENGTH = 100;

const AddShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { addShow, updateShow, shows, fetchShows, loading } = useShowStore();
  const {
    showToDelete,
    isDeleting,
    requestDelete,
    cancelDelete,
    confirmDelete,
  } = useShowDeleteModal();

  const showInputClassName =
    'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500 focus-visible:ring-purple-500';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ShowFormData>();

  React.useEffect(() => {
    if (!isEditMode || !id) return;
    if (shows.length === 0) {
      fetchShows();
    }
  }, [fetchShows, id, isEditMode, shows.length]);

  const currentShow = React.useMemo<Show | undefined>(
    () => (id ? shows.find((s) => s.id === id) : undefined),
    [id, shows],
  );

  React.useEffect(() => {
    if (!currentShow) return;
    reset({
      title: currentShow.title,
      venue: currentShow.venue ?? '',
      date: currentShow.date,
      time: currentShow.time,
      fee: currentShow.fee,
      notes: (currentShow.notes ?? '').slice(0, NOTES_MAX_LENGTH),
    });
  }, [currentShow, reset]);

  const onSubmit = async (data: ShowFormData) => {
    try {
      if (isEditMode && id) {
        await updateShow(id, data);
      } else {
        await addShow(data);
      }

      const storeError = useShowStore.getState().error;
      if (storeError) {
        toast.error(
          isEditMode ? 'Erro ao atualizar show' : 'Erro ao adicionar show',
          { description: storeError },
        );
        return;
      }

      toast.success(
        isEditMode ? 'Show atualizado com sucesso!' : 'Show adicionado com sucesso!',
        { description: `"${data.title}"` },
      );

      if (!isEditMode) {
        reset();
      }
      navigate('/');
    } catch (error) {
      toast.error(
        isEditMode
          ? 'Erro ao atualizar show. Tente novamente.'
          : 'Erro ao adicionar show. Tente novamente.',
      );
      console.error(error);
    }
  };

  const handleConfirmDelete = async () => {
    await confirmDelete();
    if (!useShowStore.getState().error) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title={isEditMode ? 'Editar Show' : 'Adicionar Show'}
        description={
          isEditMode
            ? 'Atualize os detalhes do seu show'
            : 'Preencha os detalhes do seu próximo show'
        }
        onBack={() => navigate(-1)}
      />

      <section>
        <Card className="p-8">
          {isEditMode && !currentShow && loading ? (
            <ShowFormSkeleton />
          ) : isEditMode && !currentShow ? (
            <p className="text-sm text-red-400">Show não encontrado.</p>
          ) : null}

          {(!isEditMode || currentShow) && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormFieldGroup label="Título do Show *" error={errors.title?.message}>
                <Input
                  id="title"
                  {...register('title', { required: 'Título do show é obrigatório' })}
                  placeholder="Ex: Floresta, Turatti..."
                  className={showInputClassName}
                />
              </FormFieldGroup>

              <FormFieldGroup label="Local" error={errors.venue?.message}>
                <Input
                  id="venue"
                  {...register('venue')}
                  placeholder="Ex: Varjota, Rua das Flores..."
                  className={showInputClassName}
                />
              </FormFieldGroup>

              <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormFieldGroup label="Data *" error={errors.date?.message}>
                  <Input
                    id="date"
                    type="date"
                    {...register('date', { required: 'Data é obrigatória' })}
                    className={showInputClassName}
                  />
                </FormFieldGroup>

                <FormFieldGroup label="Horário *" error={errors.time?.message}>
                  <Input
                    id="time"
                    type="time"
                    {...register('time', { required: 'Horário é obrigatório' })}
                    className={showInputClassName}
                  />
                </FormFieldGroup>
              </fieldset>

              <FormFieldGroup label="Cachê (R$) *" error={errors.fee?.message}>
                <Input
                  id="fee"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('fee', {
                    required: 'Cachê é obrigatório',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Cachê deve ser positivo' },
                  })}
                  placeholder="Ex: 800.00"
                  className={showInputClassName}
                />
              </FormFieldGroup>

              <FormFieldGroup label="Anotações" error={errors.notes?.message}>
                <Textarea
                  id="notes"
                  maxLength={NOTES_MAX_LENGTH}
                  {...register('notes', {
                    maxLength: {
                      value: NOTES_MAX_LENGTH,
                      message: `Máximo de ${NOTES_MAX_LENGTH} caracteres`,
                    },
                  })}
                  placeholder="Informações adicionais sobre o show..."
                  className={`${showInputClassName} min-h-[100px]`}
                />
              </FormFieldGroup>

              <SubmitSection
                isSubmitting={isSubmitting}
                onCancel={() => navigate(-1)}
                submitLabel={isEditMode ? 'Salvar alterações' : 'Adicionar Show'}
                isEdit={isEditMode}
              />

              {isEditMode && currentShow && (
                <div className="flex w-full justify-center sm:justify-end">
                  <Button
                    type="button"
                    size="md"
                    className="w-full border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200 sm:w-auto"
                    label="Excluir show"
                    iconLeft={<Trash2 className="h-4 w-4" />}
                    onClick={() => requestDelete(currentShow)}
                  />
                </div>
              )}
            </form>
          )}
        </Card>
      </section>

      <ShowDeleteConfirmModal
        isOpen={Boolean(showToDelete)}
        show={showToDelete}
        isLoading={isDeleting}
        onCancel={cancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AddShow;
