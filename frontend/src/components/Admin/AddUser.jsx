import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('/api/admin/add-user', { email });
      setStatus('success');
      setMessage(res.data.msg);
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.msg || 'Error adding user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <UserPlus className="text-indigo-600 h-6 w-6" />
        <h2 className="text-2xl font-semibold text-gray-800">Add Allowed User</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="email"
                type="email" 
                placeholder="Enter user email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                Add User
              </>
            )}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 p-3 rounded-md flex items-start space-x-2 ${
            status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            )}
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Only users with approved email addresses will be able to access the system.</p>
      </div>
    </div>
  );
};

export default AddUser;