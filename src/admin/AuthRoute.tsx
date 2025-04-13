import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import useAuth from './hooks/useAuth';

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
