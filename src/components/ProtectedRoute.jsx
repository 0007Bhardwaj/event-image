import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If admin role is required but user is not admin
  if (requireAdmin && (!user || user.role !== 'admin')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
