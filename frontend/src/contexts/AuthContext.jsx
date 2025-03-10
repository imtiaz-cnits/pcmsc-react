import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

// 1. Create Context for Authentication 🤝
const AuthContext = createContext();

// 2. Custom Hook to use AuthContext 🔑
export const useAuth=()=> useContext(AuthContext)

// 3. Auth Provider 💼
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authenticated state ✅
  const [loader, setLoader] = useState(false); 
  const [error, setError] = useState(''); 
  const [token, setToken] = useState(localStorage.getItem('access_token') || null);
  

  useEffect(() => {
    if (token) {
      axios.defaults.headers['Authorization'] = `Bearer ${token}`; 
      setIsAuthenticated(true); 
    }
  }, [token]);


  const setAuthToken = (newToken) => {
    setToken(newToken); 
    localStorage.setItem('access_token', newToken); 
    axios.defaults.headers['Authorization'] = `Bearer ${newToken}`; 
  };

  // 5. Clear token and user data on logout 🚪
  const clearAuthToken = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
    delete axios.defaults.headers['Authorization']; 

  };


  
  const authState = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loader,
    setLoader,
    error,
    setError,
    token,
    setAuthToken, 
    clearAuthToken, 
  };

 
  return (
    <AuthContext.Provider value={authState}>
      {!loader && children} {/* Avoid showing the children components when loading ⏳ */}
    </AuthContext.Provider>
  );
};
