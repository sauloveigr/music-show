import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginHeader, LoginForm, OAuthSection, AuthFooter } from '@/components/Auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = () => {
    const from = location.state?.from?.pathname || '/app';
    navigate(from, { replace: true });
  };

  return (
    <main className="min-h-[100svh] bg-background flex items-start md:items-center justify-center px-4 py-4 md:py-0">
      <section className="w-full max-w-md" aria-labelledby="login-heading">
        <LoginHeader title="Show Time" subtitle="Entre na sua conta" />
        <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl">
          <OAuthSection />
          <LoginForm onSuccess={handleLoginSuccess} />
          <AuthFooter />
        </article>
      </section>
    </main>
  );
};

export default Login;