import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleRoute = ({ children, allow }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Checking...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (!allow.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;