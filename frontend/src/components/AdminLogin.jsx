import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/login', { email, password });
      navigate('/admin');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/register', { email, password });
      navigate('/admin');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Admin Login / Register</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default AdminLogin;
