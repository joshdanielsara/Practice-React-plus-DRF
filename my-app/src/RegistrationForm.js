// src/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register/', { username, email, password });
      console.log('Registration successful:', response.data);
     
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (


      
   <div>
    <Link to="/login">
    <h1>Login</h1>
  </Link>



    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
    </div>
 
  );
}

export default RegistrationForm;
