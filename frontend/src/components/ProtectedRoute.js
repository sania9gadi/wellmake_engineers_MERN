import { Navigate } from "react-router-dom";

// Accepts: element to render, and optional role check
const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but wrong role
    return <Navigate to="/" replace />;
  }

  // Authenticated and authorized
  return children;
};

export default ProtectedRoute;
