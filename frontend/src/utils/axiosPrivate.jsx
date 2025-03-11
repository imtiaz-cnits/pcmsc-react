import axios from 'axios';
import { useLogout } from '../hook/useLogout';
import { getToken } from './token';


// Replace with your backend API URL
const API_URL = 'http://localhost:3000/api/v1';


// Create Axios instance for private requests
const axiosPrivate = axios.create({
  baseURL: API_URL, 
});

// Request interceptor to add JWT token to headers
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Response interceptor to handle JWT error or expired
axiosPrivate.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      const { logout } = useLogout();
      logout();
    }

    return Promise.reject(error);
  }
)


export default axiosPrivate;
