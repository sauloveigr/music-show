import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <section className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Oops! Página não encontrada</p>
        <Button asChild variant="musical">
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>
        </Button>
      </section>
    </main>
  );
};

export default NotFound;
