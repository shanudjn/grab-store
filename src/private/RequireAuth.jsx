import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
export function RequireAuth({ children }) {
  const { login } = useAuth();
  const location = useLocation();

  if (!login) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
