import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ProtectedRoute } from '@/components/Auth';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import AddShow from '@/pages/AddShow';
import Calendar from '@/pages/Calendar';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-show"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddShow />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Layout>
                  <Calendar />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/shows/:id/edit"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddShow />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
