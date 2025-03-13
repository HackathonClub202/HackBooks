// src/pages/AdminDashboard.js
import React from "react";
import Header from "../components/Header";
import Dashboard from "../components/Admin/Dashboard";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Admin Dashboard" />
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
