import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isToken, setIsToken] = useState(localStorage.getItem("access_token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token")); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          setIsToken(token);
          setIsAuthenticated(true);
        } else {
          setIsToken(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error accessing localStorage", error);
        setIsToken(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchAuthStatus();
  }, []);

  if (isLoading) return null; 

  return (
    <AuthContext.Provider
      value={{ isToken, setIsToken, isAuthenticated, setIsAuthenticated, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
