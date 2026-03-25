import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginHeader, SignupForm, OAuthSection, AuthFooter } from '@/components/Auth';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate('/login', { replace: true });
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="w-full max-w-md" aria-labelledby="signup-heading">
        <LoginHeader title="Show Manager" subtitle="Crie sua conta" />
        <article className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl">
          <SignupForm onSuccess={handleSignupSuccess} />
          <OAuthSection label="Criar conta com Google" />
          <AuthFooter variant="signup" />
        </article>
      </section>
    </main>
  );
};

export default Signup;

