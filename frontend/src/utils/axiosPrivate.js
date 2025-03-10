import axios from 'axios';

// Create Axios instance for private requests
const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Replace with your backend API URL
});

// Request interceptor to add JWT token to headers
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;
