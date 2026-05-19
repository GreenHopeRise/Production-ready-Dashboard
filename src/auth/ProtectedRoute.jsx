import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading)
  return (
    <div className="h-screen flex items-center justify-center">
      <p className="animate-pulse">Checking authentication...</p>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;