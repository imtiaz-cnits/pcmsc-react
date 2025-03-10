import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1'; // Replace with your backend API URL

// Create an Axios instance for public requests
const axiosPublic = axios.create({
  baseURL: API_URL,
});

export default axiosPublic;
