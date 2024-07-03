import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login/', { username, password });
      console.log('Login successful:', response.data);
      // Handle successful login, e.g., store token in localStorage

      // Example of storing token in localStorage
      localStorage.setItem('token', response.data.token);

      // Navigate to another page after successful login
      navigate('/crudpage'); // Example path to navigate to
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <Link to="/register">
        <h1>RegisterForm</h1>
      </Link>
      
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
