import React from 'react';
import { Music } from 'lucide-react';

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-musical rounded-2xl flex items-center justify-center shadow-glow mx-auto mb-4">
        <Music className="w-10 h-10 text-white" aria-hidden="true" />
      </div>
      <h1 id="login-heading" className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground mt-1">{subtitle}</p>
    </header>
  );
};

export default LoginHeader;