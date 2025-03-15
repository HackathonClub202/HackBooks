// src/components/Login.jsx
import React from 'react';

const UserLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Book Access System</h1>
        <p className="text-gray-600 mb-8">Please log in to continue</p>
        <a
          href="/auth/google"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Log in with Google
        </a>
      </div>
    </div>
  );
};

export default UserLogin;