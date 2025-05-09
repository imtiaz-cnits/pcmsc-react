import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  console.log("isAuthenticated value:", isAuthenticated);
  console.log("isLoading value before:", isLoading);

  if (isLoading) return <></>;

  console.log("is loading value after : ", isLoading);

  if (!isAuthenticated) {
    return <Navigate to="/admin-panel/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
