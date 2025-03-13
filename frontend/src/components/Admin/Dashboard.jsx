// src/components/Admin/Dashboard.js
import React from "react";
import SubscriptionManagement from "./SubscriptionManagement";
import ContentManagement from "./ContentManagement";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubscriptionManagement />
        <ContentManagement />
      </div>
    </div>
  );
};

export default Dashboard;
