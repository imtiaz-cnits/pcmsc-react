import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authState , setAuthState]=useState({isAuthenticated : false})
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated on component mount (via localStorage)
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      setUser({ token });
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false);
      setUser(null)
    }
    setLoading(false)
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href='/admin-panel/sign-in'  // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setIsAuthenticated ,authState , setAuthState, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
