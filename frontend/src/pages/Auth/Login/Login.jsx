// import { useState } from 'react';
// import axiosPublic from '../../../components/axiosPublic';
// import { useAuth } from '../../../contexts/AuthContext';

// const Login = () => {

//   const [userIdentifier,setuserIdentifier] = useState('')
//   const [password , setPassword] = useState('')
//   const [loader , setLoader] = useState(false)
//   const [error , setError] = useState('')
//   const { setAuthToken, setIsAuthenticated } = useAuth();

//   // 🔄  to reset the fields
//   function resetForm(){
//     setuserIdentifier('')
//     setPassword('')
//   }

//   // to handlesubmit
//   async function handleSubmit(e){
//     e.preventDefault(); 
//     setLoader(true)
//     setError('')

//     const formData = {userIdentifier , password}

//     console.log("📦 Sending form data:", formData);  // debugging

//     try {

//       const res = await axiosPublic.post('/auth/login', formData)
//       console.log("✅ Response received:", res.data);
//       setAuthToken(res.data?.access_token)
//       setIsAuthenticated(true)
    

//       // reset fields 
//       resetForm(); 
//       setLoader(false)

//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "⚠️ An error occurred!";
//       setError(errorMessage)
//       console.error("❌ Error:", error);
//     }finally{
//       setLoader(false)
//     }
//     console.log('form data : ' , formData)
//   }





//   return(

//     <>
//     <form onSubmit={handleSubmit}>

//     <input type="text" placeholder='phone or username or email' required value={userIdentifier}  onChange={(e)=> setuserIdentifier(e.target.value)} /> <br /> <br />

//     <input type="password" placeholder='password' value={password} required onChange={(e) => setPassword(e.target.value)} /> <br /> <br />

//     <button type='submit'>
//       {loader ? 'siginggg....' : 'sign up'}
//     </button>

//     </form>

//    {/* 🚀 Better error display */}
//    {loader && <span style={{ color: "blue" }} aria-live="polite">🔄 Loading...</span>}
//       {error && <span style={{ color: "red" }} aria-live="assertive">❌ {error}</span>}
   
    
//     </>
//   )




// };

// export default Login;


import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

const LoginPage = () => {
  const { login  , loader, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({ userIdentifier: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="text" name="userIdentifier" value={formData.userIdentifier} onChange={handleChange} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

      <input type="submit" value="submit" />
        {/* 🚀 Better error display */}
    {loader && <span style={{ color: "blue" }} aria-live="polite">🔄 Loading...</span>}
      {error && <span style={{ color: "red" }} aria-live="assertive">❌ {error}</span>}
      </form>
    </div>
  );  
};

export default LoginPage;
