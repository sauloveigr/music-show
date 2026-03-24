import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PageHeader, FormFieldGroup, SubmitSection } from '@/components/Forms';

interface ShowFormData {
  name: string;
  date: string;
  time: string;
  value: number;
}

const AddShow: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ShowFormData>();

  const onSubmit = async (data: ShowFormData) => {
    try {
      const { error } = await supabase.from('shows').insert({
        name: data.name,
        date: data.date,
        time: data.time,
        value: data.value,
      });

      if (error) {
        alert(`Erro ao adicionar show: ${error.message}`);
        return;
      }

      alert(`Show "${data.name}" adicionado com sucesso!`);
      reset();
      navigate('/');
    } catch (error) {
      alert('Erro ao adicionar show. Tente novamente.');
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
            {/* Name */}
            <FormFieldGroup label="Nome do Show *" error={errors.name?.message}>
              <Input
                id="name"
                {...register('name', { required: 'Nome do show é obrigatório' })}
                placeholder="Ex: Jazz Night, Wedding Reception..."
                className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
              />
            </FormFieldGroup>

            {/* Date and Time */}
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

            {/* Value */}
            <FormFieldGroup label="Cachê (R$) *" error={errors.value?.message}>
              <Input
                id="value"
                type="number"
                step="0.01"
                min="0"
                {...register('value', {
                  required: 'Cachê é obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Cachê deve ser positivo' },
                })}
                placeholder="Ex: 800.00"
                className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
              />
            </FormFieldGroup>

            {/* Submit Buttons */}
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
