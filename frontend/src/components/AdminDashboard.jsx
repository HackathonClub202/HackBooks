import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });

  useEffect(() => {
    axios.get('/api/admin/subscriptions')
      .then(res => setSubscriptions(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = () => {
    axios.post('/api/admin/subscriptions', formData)
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  const handleDelete = (email) => {
    axios.delete(`/api/admin/subscriptions/${email}`)
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Add Subscription</h2>
        <input placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input placeholder="Mobile" onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        <h2>Subscriptions</h2>
        {subscriptions.map((sub) => (
          <div key={sub.email}>
            <span>{sub.name} ({sub.email})</span>
            <button onClick={() => handleDelete(sub.email)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
