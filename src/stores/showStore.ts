import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {Show, ShowFormData} from '@/types/show';

interface ShowState {
  shows: Show[];

  addShow: (showData: ShowFormData) => void;
  updateShow: (id: string, showData: ShowFormData) => void;
  deleteShow: (id: string) => void;
  getUpcomingShows: (limit?: number) => Show[];
  getShowsByDate: (date: Date) => Show[];
}

export const useShowStore = create<ShowState>()(
  persist(
    (set, get) => ({
      shows: [],

      addShow: (showData: ShowFormData) => {
        const newShow: Show = {
          id: Date.now().toString(),
          ...showData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          shows: [...state.shows, newShow],
        }));
      },

      updateShow: (id: string, showData: ShowFormData) => {
        set((state) => ({
          shows: state.shows.map((show) =>
            show.id === id
              ? {...show, ...showData, updatedAt: new Date().toISOString()}
              : show,
          ),
        }));
      },

      deleteShow: (id: string) => {
        set((state) => ({
          shows: state.shows.filter((show) => show.id !== id),
        }));
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
    }),
    {
      name: 'show-storage',
      partialize: (state) => ({
        shows: state.shows,
      }),
    },
  ),
);
