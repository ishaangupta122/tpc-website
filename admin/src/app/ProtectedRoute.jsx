import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";

// Guards every route nested inside it. Signing in or out (or a session that
// expires) takes effect immediately, without a page reload.
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
