// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Replace this with your actual auth check (e.g., check localStorage, context, or state)
  const isAuthenticated = !!localStorage.getItem("token"); // Example: check for a token

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
