import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import ChapterViewer from './components/User/ChapterViewer';
import ChapterTest from './components/User/ChapterTest';
import './App.css';
import UserLogin from './components/User/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/chapter/:chapterId" element={<ChapterViewer />} />
        <Route path="/chapter/:chapterId/test" element={<ChapterTest />} />
      </Routes>
    </Router>
  );
}

export default App;
