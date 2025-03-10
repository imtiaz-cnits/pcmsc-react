import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import axiosPublic from '../../../utils/axiosPublic';

const LoginPage = () => {
  const [formData, setFormData] = useState({ userIdentifier: '', password: '' });
  const navigate = useNavigate();
  const [loader , setLoader] = useState(false)
  const [error, setError] = useState('');
  const {setIsAuthenticated} = useContext(AuthContext)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError('');

    try {
      const response = await axiosPublic.post('/auth/login', formData);
      localStorage.setItem('access_token', response.data.access_token);
      setIsAuthenticated(true)
      console.log(response.data); 
      navigate('/test' , {replace : true});
    } catch (error) {
      console.error(error)
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
