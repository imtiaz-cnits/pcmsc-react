import { useState } from "react";

const SignUp=()=>{

    const [username, setUserName]=useState('')
    const [emai,setEmai]=useState('')
    const [password, setPassword]=useState('')
    const [loading , setLoading]=useState(false);
    const [error,setError]=useState('')
    const [success,setSuccess]=useState(false); 

    

    return(

        <>
       
      <form action="">

      <input type="text"
      
      placeholder="username"
      value={username}
      
      />
      {username}

      </form>
        </>
    )
}

export default SignUp;