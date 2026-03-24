import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ShowProvider } from '@/contexts/ShowContext';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import AddShow from '@/pages/AddShow';
import Calendar from '@/pages/Calendar';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ShowProvider>
        <Toaster />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-show" element={<AddShow />} />
              <Route path="/calendar" element={<Calendar />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ShowProvider>
    </QueryClientProvider>
  );
}

export default App;
