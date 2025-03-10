import { useState } from 'react';
import axiosPublic from '../../../components/axiosPublic';

const Login = () => {

  const [userIdentifier,setuserIdentifier] = useState('')
  const [password , setPassword] = useState('')
  const [loader , setLoader] = useState(false)
  const [error , setError] = useState('')

  // 🔄  to reset the fields
  function resetForm(){
    setuserIdentifier('')
    setPassword('')
  }

  // to handlesubmit
  async function handleSubmit(e){
    e.preventDefault(); 
    setLoader(true)
    setError('')

    const formData = {userIdentifier , password}

    console.log("📦 Sending form data:", formData);  // debugging

    try {

      const res = await axiosPublic.post('/auth/login', formData)
      console.log("✅ Response received:", res.data);

      // reset fields 
      resetForm(); 

    } catch (error) {
      const errorMessage = error.response?.data?.message || "⚠️ An error occurred!";
      setError(errorMessage)
      console.error("❌ Error:", error);
    }finally{
      setLoader(false)
    }
    console.log('form data : ' , formData)
  }




  return(

    <>
    <form action="" onSubmit={handleSubmit}>

    <input type="text" placeholder='phone or username or email' required value={userIdentifier}  onChange={(e)=> setuserIdentifier(e.target.value)} /> <br /> <br />

    <input type="password" placeholder='password' value={password} required onChange={(e) => setPassword(e.target.value)} /> <br /> <br />

    <input type="submit" value="submit"/>

    </form>

   {/* 🚀 Better error display */}
   {loader && <span style={{ color: "blue" }} aria-live="polite">🔄 Loading...</span>}
      {error && <span style={{ color: "red" }} aria-live="assertive">❌ {error}</span>}
   
    
    </>
  )




};

export default Login;
