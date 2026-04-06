import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { LoginHeader, LoginForm, OAuthSection, AuthFooter, SignupForm } from '@/components/Auth';

export const InitialPageLoginPanel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleLoginSuccess = () => {
    const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/app';
    navigate(from, { replace: true });
  };

  const handleSignupSuccess = () => {
    setMode('login');
  };

  const isLogin = mode === 'login';

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <LoginHeader
        title={isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
        subtitle={isLogin ? 'Entre na sua conta para continuar' : 'Preencha os dados para começar'}
      />
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-md">
        <OAuthSection label={isLogin ? undefined : 'Criar conta com Google'} />
        {isLogin ? (
          <LoginForm onSuccess={handleLoginSuccess} />
        ) : (
          <SignupForm onSuccess={handleSignupSuccess} />
        )}
        <AuthFooter
          variant={isLogin ? 'login' : 'signup'}
          onSignupClick={() => setMode('signup')}
          onLoginClick={() => setMode('login')}
        />
      </div>
    </div>
  );
};
