/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function RequireAuth({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={'/login'} replace />;
  } else if (user && !allowedRoles.includes(user.role[0].authority)) {
    return <Navigate to={'/unauthorized'} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
