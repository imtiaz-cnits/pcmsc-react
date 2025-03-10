import axios from "axios";
import { logout } from "../contexts/AuthContext"; // 🔥 Import logout function

const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // 🔗 Backend API URL
});

// ✅ Request Interceptor – Token har request me auto add karega
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor – Agar token invalid ya expire ho to auto logout
axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout(); // 🔥 Auto logout
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
