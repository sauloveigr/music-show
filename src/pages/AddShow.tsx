import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Trash2} from 'lucide-react';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {PageHeader, FormFieldGroup, ShowFormSkeleton, SubmitSection} from '@/components/Forms';
import {ShowDeleteConfirmModal} from '@/components/Shared';
import {useShowDeleteModal} from '@/hooks/useShowDeleteModal';
import {useShowForm} from '@/hooks/useShowForm';

const NOTES_MAX_LENGTH = 100;

const INPUT_CLASS =
    'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500 focus-visible:ring-purple-500';

const AddShow: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const {register, handleSubmit, errors, isSubmitting, currentShow, isLoading, isEditMode, onSubmit} =
        useShowForm(id);

    const {showToDelete, isDeleting, requestDelete, cancelDelete, confirmDelete} =
        useShowDeleteModal();

    const handleConfirmDelete = async () => {
        const success = await confirmDelete();
        if (success) navigate('/app');
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
                    {isEditMode && !currentShow && isLoading ? (
                        <ShowFormSkeleton />
                    ) : isEditMode && !currentShow ? (
                        <p className="text-sm text-red-400">Show não encontrado.</p>
                    ) : null}

                    {(!isEditMode || currentShow) && (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <FormFieldGroup label="Título do Show *" error={errors.title?.message}>
                                <Input
                                    id="title"
                                    {...register('title', {required: 'Título do show é obrigatório'})}
                                    placeholder="Ex: Floresta, Turatti..."
                                    className={INPUT_CLASS}
                                />
                            </FormFieldGroup>

                            <FormFieldGroup label="Local" error={errors.venue?.message}>
                                <Input
                                    id="venue"
                                    {...register('venue')}
                                    placeholder="Ex: Varjota, Rua das Flores..."
                                    className={INPUT_CLASS}
                                />
                            </FormFieldGroup>

                            <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormFieldGroup label="Data *" error={errors.date?.message}>
                                    <Input
                                        id="date"
                                        type="date"
                                        {...register('date', {required: 'Data é obrigatória'})}
                                        className={INPUT_CLASS}
                                    />
                                </FormFieldGroup>

                                <FormFieldGroup label="Horário *" error={errors.time?.message}>
                                    <Input
                                        id="time"
                                        type="time"
                                        {...register('time', {required: 'Horário é obrigatório'})}
                                        className={INPUT_CLASS}
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
                                        min: {value: 0, message: 'Cachê deve ser positivo'},
                                    })}
                                    placeholder="Ex: 800.00"
                                    className={INPUT_CLASS}
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
                                    className={`${INPUT_CLASS} min-h-[100px]`}
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
