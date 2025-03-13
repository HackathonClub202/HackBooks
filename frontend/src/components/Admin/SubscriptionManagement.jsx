import React, { useState } from "react";
import { addSubscriber, fetchSubscribers } from "../../utils/api";

const SubscriptionManagement = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await addSubscriber(formData);
      const { data } = await fetchSubscribers();
      setSubscribers(data);
      setFormData({ name: "", email: "", mobile: "" });
    } catch (err) {
      setError("Failed to add subscriber");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="tel"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Adding..." : "Add Subscriber"}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionManagement;
