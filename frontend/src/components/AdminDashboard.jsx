import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch subscriptions on component mount
  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/admin/subscriptions');
        setSubscriptions(res.data);
      } catch (err) {
        setError('Failed to fetch subscriptions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  // Handle adding a new subscription
  const handleAdd = async () => {
    if (!formData.name || !formData.email || !formData.mobile) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axios.post('/api/admin/subscriptions', formData);
      const res = await axios.get('/api/admin/subscriptions');
      setSubscriptions(res.data);
      setFormData({ name: '', email: '', mobile: '' }); // Reset form
    } catch (err) {
      setError('Failed to add subscription');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a subscription
  const handleDelete = async (email) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`/api/admin/subscriptions/${email}`);
      const res = await axios.get('/api/admin/subscriptions');
      setSubscriptions(res.data);
    } catch (err) {
      setError('Failed to delete subscription');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Add Subscription Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Subscription</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Adding...' : 'Add Subscription'}
          </button>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : subscriptions.length === 0 ? (
          <p className="text-center text-gray-500">No subscriptions found.</p>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.email}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{sub.name}</p>
                  <p className="text-sm text-gray-600">{sub.email}</p>
                  <p className="text-sm text-gray-600">{sub.mobile}</p>
                </div>
                <button
                  onClick={() => handleDelete(sub.email)}
                  disabled={loading}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 disabled:bg-red-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;