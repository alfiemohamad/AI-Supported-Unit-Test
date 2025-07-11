import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../api/auth';

export default function ProtectedRoute() {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
