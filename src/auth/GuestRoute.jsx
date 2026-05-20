import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const GuestRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return children;
};

export default GuestRoute;