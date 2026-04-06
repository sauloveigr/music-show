import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Renders children only when the user is NOT authenticated.
 * Redirects to /app when already logged in, preventing authenticated
 * users from ever seeing the landing page, login, or signup screens.
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
