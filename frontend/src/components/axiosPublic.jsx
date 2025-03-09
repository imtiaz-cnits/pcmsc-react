import axios from 'axios'


// create instance 
const axiosPublic = axios.create({

    baseURL : ' http://localhost:4000/api',
    timeout : 5000 , 
})

export default axiosPublic; 