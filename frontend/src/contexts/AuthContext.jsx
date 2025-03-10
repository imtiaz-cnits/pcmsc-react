import { createContext, useContext, useState } from 'react';
import axiosPublic from '../components/axiosPublic';

// create context 
const AuthContext = createContext(); 

//custom hook for using the auth context
export function useAuth(){

    return useContext(AuthContext)
}


// create provider 

export const AuthProvider = ({children})=>{

    const [user , setUser] = useState(null); 
    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const [loader , setLoader] = useState(false)
    const [error , setError] = useState('')

   
    // sign-up

    const signup =async (credentials,resetForm)=>{

        console.log('clicked 2')
        console.log('reset form function : ' , resetForm)
        setLoader(true)
        setError('') //clear previous errors

        try {
            const res = await axiosPublic.post( "/auth/sign-up",credentials)
            console.log("✅ Response received:", res.data);
            setUser(res.data)
            setIsAuthenticated(true); 
        } catch (error) {
            const errorMessage = error.response?.data?.message || "⚠️ An error occurred!";
            setError(errorMessage)
            console.error("❌ Error:", error);

        }finally{
            setLoader(false)
        }
    }

    const login = async (credentials)=>{

        setLoader(true); 
        setError('')
        try {
             const res = await axiosPublic.post('/auth/login', credentials)
                 console.log("✅ Response received:", res.data);
            setUser(res.data)
            setIsAuthenticated(true); 
        } catch (error) {
            const errorMessage = error.response?.data?.message || "⚠️ An error occurred!";
      setError(errorMessage)
      
      console.error("❌ Error:", error);
        }finally{
            setLoader(false)
        }
    }

    


    // provider value 
   const  authState = {
            user,
            login,
            signup,
            loader,
            error,
            isAuthenticated
    }
    return(

        <AuthContext.Provider value={authState}>
                {!loader && children}
        </AuthContext.Provider>
    )
}