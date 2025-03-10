import axios from "axios";


const API_URL = 'http://localhost:3000/api/v1';


// create instance
const axiosPublic = axios.create({
  baseURL: API_URL,
//   timeout: 5000,
});

export default axiosPublic;