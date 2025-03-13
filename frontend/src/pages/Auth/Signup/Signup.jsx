import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosPublic from '../../../utils/axiosPublic';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile : '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPublic.post('/auth/sign-up', formData);
      console.log(response.data)
      navigate('/admin-panel/sign-in' , {replace : true});
    } catch (error) {
      console.error(error.response?.data)
      setError(`Sign-up failed. ${error.response?.data?.message}`);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input 
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder='mobile !!!'
        required
        
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link to='/admin-panel/sign-in' >Login</Link  >
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUpPage;
