import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type RouteGuardProps = {
  isProtected?: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
};

export const RouteGuard = ({ 
  isProtected = false,
  redirectPath,
  children 
}: RouteGuardProps) => {
  const { isAuthenticated } = useAuth();
  
  // For protected routes: redirect to login if not authenticated
  // For public routes: redirect to home if authenticated
  const shouldRedirect = isProtected ? !isAuthenticated : isAuthenticated;
  const defaultRedirect = isProtected ? '/login' : '/home';
  
  if (shouldRedirect) {
    return <Navigate to={redirectPath || defaultRedirect} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

// Keep the original components for backward compatibility
export const ProtectedRoute = (props: Omit<RouteGuardProps, 'isProtected'>) => (
  <RouteGuard {...props} isProtected={true} />
);

export const PublicRoute = (props: Omit<RouteGuardProps, 'isProtected'>) => (
  <RouteGuard {...props} isProtected={false} />
);
