import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter: React.FC = () => {
  return (
    <footer className="text-center text-sm text-muted-foreground mt-6">
      Não tem uma conta?{' '}
      <Link to="/signup" className="text-primary hover:underline font-medium">
        Criar conta
      </Link>
    </footer>
  );
};

export default AuthFooter;