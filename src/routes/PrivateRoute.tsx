import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { ReactNode } from 'react';
import type { RootState } from '../store';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
}
