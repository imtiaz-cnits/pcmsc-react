import axios from "axios";
import { useAuth } from "../contexts/AuthContext";


const API_URL = 'http://localhost:3000/api/v1';


// create instance
const axiosPublic = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});


// 2. Axios request interceptor to add JWT token to every request 🔑
axiosPublic.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; 
    }
    return config; 
  },
  (error) => Promise.reject(error) // Handle request error ⚠️
);


// auto logout on 401



export default axiosPublic;
