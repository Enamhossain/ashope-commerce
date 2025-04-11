import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";


const ProtectedRoute = ({ role, children }) => {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated || (role && user?.role !== role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
