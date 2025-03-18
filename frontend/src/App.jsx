import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import GoogleLoginButton from './components/GoogleLoginButton';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Admin/Dashboard';
import UserDashboard from './components/User/UserDashboard';
// import { Home } from 'lucide-react';
import Home from './pages/Home';
import NoContent from './pages/NoContent';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/google-login" element={<GoogleLoginButton />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route path="*" element={<NoContent/>} /> {/* Wildcard route */}
      </Routes>
    </div>
  );
}

export default App;
