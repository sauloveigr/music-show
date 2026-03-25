import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader, FormFieldGroup, SubmitSection } from '@/components/Forms';
import { ShowFormData } from '@/types/show';
import { useShowStore } from '@/stores/showStore';

const AddShow: React.FC = () => {
  const navigate = useNavigate();
  const { addShow } = useShowStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ShowFormData>();

  const onSubmit = async (data: ShowFormData) => {
    try {
      await addShow(data);
      const storeError = useShowStore.getState().error;
      if (storeError) {
        toast.error('Erro ao adicionar show', { description: storeError });
        return;
      }
      toast.success('Show adicionado com sucesso!', {
        description: `"${data.title}"`,
      });
      reset();
      navigate('/');
    } catch (error) {
      toast.error('Erro ao adicionar show. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Adicionar Show"
        description="Preencha os detalhes do seu próximo show"
        onBack={() => navigate(-1)}
      />

      <section>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormFieldGroup label="Título do Show *" error={errors.title?.message}>
              <Input
                id="title"
                {...register('title', { required: 'Título do show é obrigatório' })}
                placeholder="Ex: Jazz Night, Wedding Reception..."
                className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
              />
            </FormFieldGroup>

            <FormFieldGroup label="Local" error={errors.venue?.message}>
              <Input
                id="venue"
                {...register('venue')}
                placeholder="Ex: Teatro Municipal, Rua das Flores, 123..."
                className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
              />
            </FormFieldGroup>

            <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormFieldGroup label="Data *" error={errors.date?.message}>
                <Input
                  id="date"
                  type="date"
                  {...register('date', { required: 'Data é obrigatória' })}
                  className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                />
              </FormFieldGroup>

              <FormFieldGroup label="Horário *" error={errors.time?.message}>
                <Input
                  id="time"
                  type="time"
                  {...register('time', { required: 'Horário é obrigatório' })}
                  className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
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
                className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
              />
            </FormFieldGroup>

            <FormFieldGroup label="Anotações" error={errors.notes?.message}>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Informações adicionais sobre o show..."
                className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white min-h-[100px]"
              />
            </FormFieldGroup>

            <SubmitSection
              isSubmitting={isSubmitting}
              onCancel={() => navigate(-1)}
              submitLabel="Adicionar Show"
            />
          </form>
        </Card>
      </section>
    </div>
  );
};

export default AddShow;
