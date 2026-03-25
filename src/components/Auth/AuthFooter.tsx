import React from 'react';
import { Link } from 'react-router-dom';

type AuthFooterVariant = 'login' | 'signup';

interface AuthFooterProps {
  variant?: AuthFooterVariant;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ variant = 'login' }) => {
  const content =
    variant === 'signup' ? (
      <>
        Já tem uma conta?{' '}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Entrar
        </Link>
      </>
    ) : (
      <>
        Não tem uma conta?{' '}
        <Link to="/signup" className="text-primary hover:underline font-medium">
          Criar conta
        </Link>
      </>
    );

  return (
    <footer className="text-center text-sm text-muted-foreground mt-6">
      {content}
    </footer>
  );
};

export default AuthFooter;