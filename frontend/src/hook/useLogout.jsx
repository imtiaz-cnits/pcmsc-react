import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useAuth from "./useAuth";
import { removeToken } from "../utils/token";


export const useLogout = ()=>{

    const navigate = useNavigate()
    const {setIsAuthenticated, setIsToken , setIsLoading} = useAuth()

    const logout = ()=>{

        try {
          setIsLoading(true)
          removeToken(); 
          setIsToken(null); 
            setIsAuthenticated(false);
      
            navigate('/admin-panel/sign-in');
          } catch (error) {
            console.error('Error logging out', error);
          }finally{
            setIsLoading(false)
          }

    }

    return {logout}
}

