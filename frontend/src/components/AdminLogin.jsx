import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // We'll create this CSS file

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{isLogin ? 'Admin Login' : 'Admin Registration'}</h2>
          <p>Enter your credentials to access the admin panel</p>
        </div>
        
        <div className="tab-switcher">
          <button 
            className={`tab-btn ${isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`tab-btn ${!isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;