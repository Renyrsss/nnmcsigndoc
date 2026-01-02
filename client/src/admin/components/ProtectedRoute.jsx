import { Navigate, useLocation } from 'react-router-dom';
import useAdminStore from '../store/useAdminStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdminStore();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
