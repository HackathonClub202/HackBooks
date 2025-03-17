import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/api/auth/verify');
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (authenticated === null) return <div>Loading...</div>;
  return authenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
