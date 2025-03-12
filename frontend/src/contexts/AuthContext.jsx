import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated on component mount (via localStorage)
  useEffect(() => {
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        setUser({ token }); 
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error accessing localStorage', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);




  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated , loading  }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
