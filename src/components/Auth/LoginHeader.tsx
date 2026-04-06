import React from 'react';
import logoUrl from '@src/assets/logo.png';

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="text-center mb-8">
      <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 sm:hidden">
        <img
          src={logoUrl}
          alt="Music Show logo"
          className="w-14 h-14 object-contain"
        />
      </div>
      <h1 id="login-heading" className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground mt-1">{subtitle}</p>
    </header>
  );
};

export default LoginHeader;