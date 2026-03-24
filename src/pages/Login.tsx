import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginHeader, LoginForm, OAuthSection, AuthFooter } from '@/components/Auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = () => {
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="w-full max-w-md" aria-labelledby="login-heading">
        <LoginHeader title="Show Manager" subtitle="Entre na sua conta" />
        <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl">
          <LoginForm onSuccess={handleLoginSuccess} />
          <OAuthSection />
          <AuthFooter />
        </article>
      </section>
    </main>
  );
};

export default Login;