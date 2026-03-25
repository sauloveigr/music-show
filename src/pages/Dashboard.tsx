import React from 'react';
import { useAuthStore, useShowStore } from '@/stores';
import { getUserDisplayName } from '@/lib/userDisplay';
import DashboardHero from '@/components/Dashboard/DashboardHero';
import UpcomingShowsList from '@/components/Dashboard/UpcomingShowsList';
import StatsSection from '@/components/Dashboard/StatsSection';

const Dashboard: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const { shows, getUpcomingShows } = useShowStore();

  const userName = getUserDisplayName(user);

  const upcomingShows = getUpcomingShows(3);
  const today = new Date();

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
      <DashboardHero
        userName={userName}
        upcomingCount={upcomingShows.length}
        todayDate={today}
      />
      <UpcomingShowsList shows={upcomingShows} />
      <StatsSection
        thisMonthShowsCount={thisMonthShows.length}
        thisMonthEarnings={thisMonthEarnings}
        totalShowsCount={shows.length}
      />
    </div>
  );
};

export default Dashboard;
