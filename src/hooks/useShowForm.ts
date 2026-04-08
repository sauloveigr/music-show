import React from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';
import {useShowStore} from '@/stores/showStore';
import type {Show, ShowFormData} from '@/types/show';

const NOTES_MAX_LENGTH = 100;

interface UseShowFormReturn {
    register: ReturnType<typeof useForm<ShowFormData>>['register'];
    handleSubmit: ReturnType<typeof useForm<ShowFormData>>['handleSubmit'];
    errors: ReturnType<typeof useForm<ShowFormData>>['formState']['errors'];
    isSubmitting: boolean;
    currentShow: Show | undefined;
    isLoading: boolean;
    isEditMode: boolean;
    onSubmit: (data: ShowFormData) => Promise<void>;
}

export function useShowForm(id?: string): UseShowFormReturn {
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const {addShow, updateShow, shows, fetchShows, loading} = useShowStore();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ShowFormData>();

    React.useEffect(() => {
        if (!isEditMode || !id) return;
        if (shows.length === 0) fetchShows();
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
        const {error} = isEditMode && id
            ? await updateShow(id, data)
            : await addShow(data);

        if (error) {
            toast.error(
                isEditMode ? 'Erro ao atualizar show' : 'Erro ao adicionar show',
                {description: error},
            );
            return;
        }

        toast.success(
            isEditMode ? 'Show atualizado com sucesso!' : 'Show adicionado com sucesso!',
            {description: `"${data.title}"`},
        );

        if (!isEditMode) reset();
        navigate('/app');
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        currentShow,
        isLoading: loading,
        isEditMode,
        onSubmit,
    };
}
