import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username , setUsername]=useState('')
  const {signup , loader,error } = useContext(AuthContext)
  const signupRef = useRef()
  // const {setUser, user,setIsAuthenticated,isAuthenticated} = useAuth(); 


  // useEffect(()=>{
  //   console.log('user value',user)
  //   localStorage.setItem('user',JSON.stringify(user))
  //   localStorage.setItem('isAuthenticated',JSON.stringify(isAuthenticated))
  // },[setUser , setIsAuthenticated,user ,isAuthenticated])



  // useEffect(()=>{

  //   console.log('user of value',user)
  //   console.log('authenticated value',isAuthenticated)
  // },[])

   // to reset the form fields 



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoader(true);
  //   setError("");  // clear previous errors
  //   const formData = { name,username,  email, mobile, password };

  //   try {
  //     const res = await axiosPublic.post(
  //       "/auth/sign-up",
  //       formData,
  //     );
  //     console.log("✅ Response received:", res.data);
      
  //     // setUser(res.data?.data)
  //     // setIsAuthenticated(true)
  //     // reset the form fields
  //     resetForm()
  //     setLoader(false)
  //   } catch (error) {
  //     setLoader(false)
  //     const errorMessage = error.response?.data?.message || 'An error occured!'
  //     setError(errorMessage);
  //     console.error(error);
  //   }
  //   console.log(formData);

    
  // };

  const handleSubmit = async (e)=>{
    const formData = { name,username,  email, mobile, password };

    e.preventDefault(); 
    await signup(formData)
  }

  return (
    <>
      <form onSubmit={handleSubmit} ref={signupRef}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <br /> <br />


    <input type="text" name="username"  placeholder="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>

    <br /> <br />

        <input
          type="text"
          name="mobile"
          placeholder="mobile"
          value={mobile}
          required
          onChange={(e) => setMobile(e.target.value)}
        />

        <br /> <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /> <br />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /> <br />

        <input type="submit" value="submit"/>
      </form>

    {/* 🚀 Better error display */}
    {loader && <span style={{ color: "blue" }} aria-live="polite">🔄 Loading...</span>}
      {error && <span style={{ color: "red" }} aria-live="assertive">❌ {error}</span>}
    </>
  );
};

export default SignUp;
