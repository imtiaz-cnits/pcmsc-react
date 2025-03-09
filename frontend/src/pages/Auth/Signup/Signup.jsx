import { useState } from 'react';
import axiosPublic from '../../../components/axiosPublic';
import axios from 'axios';

const SignUp=()=>{

   const [name , setName] = useState('')
   const [username , setUsername] = useState('')
   const [mobile , setMobile] = useState('')
   const [email , setEmail] = useState('')
   const [password , setPassword] = useState('')
   const [error , setError] = useState('')
   const [loading , setLoading]=useState(false)

   const handleSubmit = async (e)=>{
    e.preventDefault(); 
    setLoading(true)
    setError('')
    const formData = {name ,username,mobile,email,password}

    try {
        
        const res = await axios.post('http://localhost:3000/api/v1/auth/sign-up',formData)
        console.log(res.data)

        setLoading(false)

    } catch (error) {
        setLoading(true)
        setError('error')
        console.log(error)
    }

    // clear form 
    setName('')
    setUsername('')
    setPassword('')
    setMobile('')
    setEmail('')
    setPassword('')


    console.log(formData)
   }


   if(loading){
    return <>awaitinggggg .............</>
   }

    return(

        <>
       
    <form action="" onSubmit={handleSubmit}>

        <input type="text" name="name" placeholder='name' onChange={(e)=> setName(e.target.value)} />
        
        <input type="text" name='username' placeholder='username' onChange={(e)=> setUsername(e.target.value)} />
        <input type="email" name='email' placeholder='email' onChange={(e)=> setEmail(e.target.value)} />

        <input type="password" name="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} />


        <input type="submit" value="submit" />

    </form>
     
        </>
    )
}

export default SignUp;