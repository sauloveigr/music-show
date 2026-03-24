import React, { useEffect, useState } from 'react';
import { useShows } from '@/contexts/ShowContext';
import { supabase } from '@/lib/supabaseClient';
import DashboardHero from '@/components/Dashboard/DashboardHero';
import UpcomingShowsList from '@/components/Dashboard/UpcomingShowsList';
import StatsSection from '@/components/Dashboard/StatsSection';

interface ShowData {
  id: number;
  created_at: string;
  name: string;
  date: string;
  value: number;
  time: string;
}

const Dashboard: React.FC = () => {
  const { shows, getUpcomingShows } = useShows();
  const [data, setData] = useState<ShowData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase.from('shows').select();

    if (error) {
      console.error(error);
    } else {
      setData(data || []);
    }
  }

  const upcomingShows = getUpcomingShows(3);
  const today = new Date();

  // Calculate stats
  const thisMonthShows = shows.filter((show) => {
    const showDate = new Date(show.date);
    return (
      showDate.getMonth() === today.getMonth() &&
      showDate.getFullYear() === today.getFullYear()
    );
  });

  const thisMonthEarnings = thisMonthShows.reduce((total, show) => total + show.fee, 0);

  return (
    <div className="space-y-8">
      <DashboardHero upcomingCount={upcomingShows.length} todayDate={today} />
      <UpcomingShowsList shows={data} />
      <StatsSection
        thisMonthShowsCount={thisMonthShows.length}
        thisMonthEarnings={thisMonthEarnings}
        totalShowsCount={shows.length}
      />
    </div>
  );
};

export default Dashboard;
