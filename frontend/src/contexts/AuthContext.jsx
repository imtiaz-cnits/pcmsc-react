// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import {useNavigate} from 'react-router-dom'

// // 1. Create Context for Authentication 🤝
// const AuthContext = createContext();

// // 2. Custom Hook to use AuthContext 🔑
// export const useAuth=()=> useContext(AuthContext)

// // 3. Auth Provider 💼
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); 
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Authenticated state ✅
//   const [loader, setLoader] = useState(false); 
//   const [error, setError] = useState(''); 
//   const [token, setToken] = useState(localStorage.getItem('access_token') || null);
  

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers['Authorization'] = `Bearer ${token}`; 
//       setIsAuthenticated(true); 
//     }
//   }, [token]);


//   const setAuthToken = (newToken) => {
//     setToken(newToken); 
//     localStorage.setItem('access_token', newToken); 
//     axios.defaults.headers['Authorization'] = `Bearer ${newToken}`; 
//   };

//   // 5. Clear token and user data on logout 🚪
//   const clearAuthToken = () => {
//     setToken(null);
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('access_token');
//     delete axios.defaults.headers['Authorization']; 

//   };


  
//   const authState = {
//     user,
//     setUser,
//     isAuthenticated,
//     setIsAuthenticated,
//     loader,
//     setLoader,
//     error,
//     setError,
//     token,
//     setAuthToken, 
//     clearAuthToken, 
//   };

 
//   return (
//     <AuthContext.Provider value={authState}>
//       {!loader && children} {/* Avoid showing the children components when loader ⏳ */}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState } from 'react';
import axiosPublic from '../utils/axiosPublic';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error , setError] = useState('')
  const [isAuthenticated , setIsAuthenticated] = useState(false)



  // sign-up function 
  const signup = async (userData)=>{

    setLoader(true); 
    setError('') // clear previous errors
    console.log("📦 Sending form data:", userData);  // debugging

    try {

      const res = await axiosPublic.post("/auth/sign-up" , userData)
      console.log("✅ Response received:", res.data);
      // setUser(res.data.data)
      setIsAuthenticated(true); 

      // signupRef?.current?.reset(); 
      window.location.href = '/admin-panel/sign-in';
      setLoader(false)


    } catch (error) {
      setLoader(false)
      const errorMessage = error.response?.data?.message || 'An error occured'
      setError(errorMessage)
      console.error(error)
    }

  }


  const login = async (userData) => {
    setLoader(true)
    setError('')
    console.log("📦 Sending form data:", userData);  // debugging
    try {
      const res = await axiosPublic.post('/auth/login', userData);
      console.log("✅ Response received:", res.data);      // debugging
      localStorage.setItem('access_token', res.data.access_token);
      setIsAuthenticated(true); 
      window.location.href = '/test'; // Successful login ke baad redirect

      setLoader(false)
    } catch (error) {
      setLoader(false)
      const errorMessage = error.response?.data?.message || 'Invalid Credentials!'
      setError(errorMessage)
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setIsAuthenticated(false)
    window.location.href = '/login'; // Logout hone pe login page pe redirect
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isAuthenticated, loader , error  }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
