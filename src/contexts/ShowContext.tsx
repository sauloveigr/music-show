import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Show, ShowFormData } from '@/types/show';

interface ShowContextType {
  shows: Show[];
  addShow: (showData: ShowFormData) => void;
  updateShow: (id: string, showData: ShowFormData) => void;
  deleteShow: (id: string) => void;
  getUpcomingShows: (limit?: number) => Show[];
  getShowsByDate: (date: Date) => Show[];
}

const ShowContext = createContext<ShowContextType | undefined>(undefined);

interface ShowProviderProps {
  children: ReactNode;
}

export const ShowProvider: React.FC<ShowProviderProps> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>(() => {
    const savedShows = localStorage.getItem('shows');
    return savedShows ? JSON.parse(savedShows) : [];
  });

  useEffect(() => {
    localStorage.setItem('shows', JSON.stringify(shows));
  }, [shows]);

  const addShow = (showData: ShowFormData) => {
    const newShow: Show = {
      id: Date.now().toString(),
      ...showData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setShows(prev => [...prev, newShow]);
  };

  const updateShow = (id: string, showData: ShowFormData) => {
    setShows(prev => prev.map(show =>
      show.id === id
        ? { ...show, ...showData, updatedAt: new Date().toISOString() }
        : show
    ));
  };

  const deleteShow = (id: string) => {
    setShows(prev => prev.filter(show => show.id !== id));
  };

  const getUpcomingShows = (limit?: number) => {
    const now = new Date();
    const upcoming = shows
      .filter(show => new Date(`${show.date}T${show.time}`) >= now)
      .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());

    return limit ? upcoming.slice(0, limit) : upcoming;
  };

  const getShowsByDate = (date: Date) => {
    return shows.filter(show => {
      const showDate = new Date(show.date);
      return showDate.toDateString() === date.toDateString();
    });
  };

  return (
    <ShowContext.Provider value={{
      shows,
      addShow,
      updateShow,
      deleteShow,
      getUpcomingShows,
      getShowsByDate,
    }}>
      {children}
    </ShowContext.Provider>
  );
};

export const useShows = () => {
  const context = useContext(ShowContext);
  if (context === undefined) {
    throw new Error('useShows must be used within a ShowProvider');
  }
  return context;
};
