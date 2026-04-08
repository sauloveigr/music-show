import {create} from 'zustand';
import {Show, ShowFormData} from '@/types/show';
import {supabase} from '@/lib/supabaseClient';
import {parseLocalDate, parseShowDateTime} from '@/lib/utils';
import {
    fetchUserShows,
    createShow,
    updateShow as updateShowService,
    deleteShow as deleteShowService,
} from '@/services/showService';

interface MutationResult {
    error: string | null;
}

interface ShowState {
    shows: Show[];
    loading: boolean;
    error: string | null;

    clearShows: () => void;
    fetchShows: () => Promise<void>;
    addShow: (showData: ShowFormData) => Promise<MutationResult>;
    updateShow: (id: string, showData: ShowFormData) => Promise<MutationResult>;
    deleteShow: (id: string) => Promise<MutationResult>;
    getUpcomingShows: (limit?: number) => Show[];
    getShowsByDate: (date: Date) => Show[];
}

export const useShowStore = create<ShowState>()((set, get) => ({
    shows: [],
    loading: false,
    error: null,

    clearShows: () => set({shows: [], error: null}),

    fetchShows: async () => {
        set({loading: true, error: null});
        try {
            const {
                data: {user},
            } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const shows = await fetchUserShows(user.id);
            set({shows, loading: false});
        } catch (error) {
            set({error: (error as Error).message, loading: false});
        }
    },

    addShow: async (showData: ShowFormData): Promise<MutationResult> => {
        set({loading: true, error: null});
        try {
            const {
                data: {user},
            } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const newShow = await createShow(user.id, showData);
            set((state) => ({shows: [...state.shows, newShow], loading: false}));
            return {error: null};
        } catch (error) {
            const message = (error as Error).message;
            set({error: message, loading: false});
            return {error: message};
        }
    },

    updateShow: async (id: string, showData: ShowFormData): Promise<MutationResult> => {
        set({loading: true, error: null});
        try {
            const updated = await updateShowService(id, showData);
            set((state) => ({
                shows: state.shows.map((show) => (show.id === id ? updated : show)),
                loading: false,
            }));
            return {error: null};
        } catch (error) {
            const message = (error as Error).message;
            set({error: message, loading: false});
            return {error: message};
        }
    },

    deleteShow: async (id: string): Promise<MutationResult> => {
        set({loading: true, error: null});
        try {
            await deleteShowService(id);
            set((state) => ({
                shows: state.shows.filter((show) => show.id !== id),
                loading: false,
            }));
            return {error: null};
        } catch (error) {
            const message = (error as Error).message;
            set({error: message, loading: false});
            return {error: message};
        }
    },

    getUpcomingShows: (limit?: number) => {
        const now = new Date();
        const upcomingShows = get()
            .shows.filter((show) => parseShowDateTime(show.date, show.time) > now)
            .sort(
                (a, b) =>
                    parseShowDateTime(a.date, a.time).getTime() -
                    parseShowDateTime(b.date, b.time).getTime(),
            );

        return limit ? upcomingShows.slice(0, limit) : upcomingShows;
    },

    getShowsByDate: (date: Date) => {
        return get().shows.filter((show) => {
            const showDate = parseLocalDate(show.date);
            return (
                showDate.getFullYear() === date.getFullYear() &&
                showDate.getMonth() === date.getMonth() &&
                showDate.getDate() === date.getDate()
            );
        });
    },
}));
