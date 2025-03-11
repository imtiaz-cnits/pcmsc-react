import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useAuth from "./useAuth";
import { removeToken } from "../utils/token";


export const useLogout = ()=>{

    const navigate = useNavigate()
    const {setIsAuthenticated, setUser} = useAuth()

    const logout = ()=>{

        try {
            removeToken(); 
            setIsAuthenticated(false);
            setUser(null); 
      
            navigate('/admin-panel/sign-in');
          } catch (error) {
            console.error('Error logging out', error);
          }

    }

    return {logout}
}

