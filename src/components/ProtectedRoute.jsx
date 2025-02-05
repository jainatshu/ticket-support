import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!user && !storedUser) {
    return <Navigate to="/" replace />; // Redirect if no user is logged in
  }

  return children;
};

export default ProtectedRoute;
