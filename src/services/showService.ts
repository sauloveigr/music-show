import {supabase} from '@/lib/supabaseClient';
import type {Show, ShowFormData} from '@/types/show';

export async function fetchUserShows(userId: string): Promise<Show[]> {
    const {data, error} = await supabase
        .from('shows')
        .select('*')
        .eq('user_id', userId)
        .order('date', {ascending: true});

    if (error) throw error;
    return data ?? [];
}

export async function createShow(userId: string, showData: ShowFormData): Promise<Show> {
    const {data, error} = await supabase
        .from('shows')
        .insert([{...showData, user_id: userId}])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateShow(id: string, showData: ShowFormData): Promise<Show> {
    const {data, error} = await supabase
        .from('shows')
        .update(showData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteShow(id: string): Promise<void> {
    const {error} = await supabase.from('shows').delete().eq('id', id);
    if (error) throw error;
}
