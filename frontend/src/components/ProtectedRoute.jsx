import { Navigate, Outlet } from 'react-router-dom';
import useAppStore from '@/store/useAppStore';

export default function ProtectedRoute() {
  const { user } = useAppStore();

  if (!user || !user._id) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
