import {create} from 'zustand';
import {Show, ShowFormData} from '@/types/show';
import {supabase} from '@/lib/supabaseClient';

interface ShowState {
  shows: Show[];
  loading: boolean;
  error: string | null;

  clearShows: () => void;
  fetchShows: () => Promise<void>;
  addShow: (showData: ShowFormData) => Promise<void>;
  updateShow: (id: string, showData: ShowFormData) => Promise<void>;
  deleteShow: (id: string) => Promise<void>;
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

          const {data, error} = await supabase
            .from('shows')
            .select('*')
            .eq('user_id', user.id)
            .order('date', {ascending: true});

          if (error) throw error;

          set({shows: data || [], loading: false});
        } catch (error) {
          set({error: (error as Error).message, loading: false});
        }
      },

      addShow: async (showData: ShowFormData) => {
        set({loading: true, error: null});
        try {
          const {
            data: {user},
          } = await supabase.auth.getUser();
          if (!user) throw new Error('User not authenticated');

          const {data, error} = await supabase
            .from('shows')
            .insert([{...showData, user_id: user.id}])
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            shows: [...state.shows, data],
            loading: false,
          }));
        } catch (error) {
          set({error: (error as Error).message, loading: false});
        }
      },

      updateShow: async (id: string, showData: ShowFormData) => {
        set({loading: true, error: null});
        try {
          const {data, error} = await supabase
            .from('shows')
            .update(showData)
            .eq('id', id)
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            shows: state.shows.map((show) => (show.id === id ? data : show)),
            loading: false,
          }));
        } catch (error) {
          set({error: (error as Error).message, loading: false});
        }
      },

      deleteShow: async (id: string) => {
        set({loading: true, error: null});
        try {
          const {error} = await supabase.from('shows').delete().eq('id', id);

          if (error) throw error;

          set((state) => ({
            shows: state.shows.filter((show) => show.id !== id),
            loading: false,
          }));
        } catch (error) {
          set({error: (error as Error).message, loading: false});
        }
      },

      getUpcomingShows: (limit?: number) => {
        const now = new Date();
        const upcomingShows = get()
          .shows.filter((show) => new Date(show.date) > now)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        return limit ? upcomingShows.slice(0, limit) : upcomingShows;
      },

      getShowsByDate: (date: Date) => {
        return get().shows.filter((show) => {
          const showDate = new Date(show.date);
          return (
            showDate.getFullYear() === date.getFullYear() &&
            showDate.getMonth() === date.getMonth() &&
            showDate.getDate() === date.getDate()
          );
        });
      },
}));
