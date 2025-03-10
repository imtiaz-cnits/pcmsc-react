import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log('isauthenticated value ' , isAuthenticated)
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin-panel/sign-in", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // if (loading) return <p>Loading...</p>; // Prevents flashing

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
