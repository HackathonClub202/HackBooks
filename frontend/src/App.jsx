import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import GoogleLoginButton from './components/GoogleLoginButton';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/google-login" element={<GoogleLoginButton />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
