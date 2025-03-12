import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import axiosPublic from '../../../utils/axiosPublic';
import { Link } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';
import { setToken } from '../../../utils/token';

const LoginPage = () => {
  const [formData, setFormData] = useState({ userIdentifier: '', password: '' });
  const navigate = useNavigate();
  const [loader , setLoader] = useState(false)
  const [error, setError] = useState('');
  const {setIsAuthenticated} = useAuth()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError('');

    try {
      const response = await axiosPublic.post('/auth/login', formData);
      setToken(response.data.access_token)
      setIsAuthenticated(true)
      console.log(response.data); 
      navigate('/' , {replace : true});
    } catch (error) {
      console.error(error.response?.data)
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userIdentifier"
          value={formData.userIdentifier}
          onChange={handleChange}
          placeholder="Email or Username"
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
        <button type="submit">Login</button>
      </form>
      <Link to='/admin-panel/sign-up'>Sign up</Link>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
