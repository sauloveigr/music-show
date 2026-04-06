import React from 'react';
import { Link } from 'react-router-dom';

type AuthFooterVariant = 'login' | 'signup';

interface AuthFooterProps {
  variant?: AuthFooterVariant;
  /** When set, "Entrar" toggles in place instead of navigating to /login. */
  onLoginClick?: () => void;
  /** When set, "Criar conta" toggles in place instead of navigating to /signup. */
  onSignupClick?: () => void;
}

const linkClass = 'cursor-pointer text-primary hover:underline font-medium';

const AuthFooter: React.FC<AuthFooterProps> = ({
  variant = 'login',
  onLoginClick,
  onSignupClick,
}) => {
  const content =
    variant === 'signup' ? (
      <>
        Já tem uma conta?{' '}
        {onLoginClick != null ? (
          <button type="button" onClick={onLoginClick} className={linkClass}>
            Entrar
          </button>
        ) : (
          <Link to="/login" className={linkClass}>
            Entrar
          </Link>
        )}
      </>
    ) : (
      <>
        Não tem uma conta?{' '}
        {onSignupClick != null ? (
          <button type="button" onClick={onSignupClick} className={linkClass}>
            Criar conta
          </button>
        ) : (
          <Link to="/signup" className={linkClass}>
            Criar conta
          </Link>
        )}
      </>
    );

  return (
    <footer className="text-center text-sm text-muted-foreground mt-6">
      {content}
    </footer>
  );
};

export default AuthFooter;