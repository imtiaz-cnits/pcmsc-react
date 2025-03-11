import { useLogout } from "../hook/useLogout";
import axiosPrivate from "./axiosPrivate"

const setupInterceptor = (store)=>{

    axiosPrivate.interceptors.response.use(
      (response) => response, // Pass through successful responses
     async (error) => {

        if (error.response?.status === 401) {
          const { logout } = useLogout();
           logout();
        }
    
        return Promise.reject(error);
      }
    )
}

export default setupInterceptor;