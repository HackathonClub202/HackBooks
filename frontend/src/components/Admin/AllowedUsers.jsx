import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, User, AlertCircle, Trash2, Search, Loader } from 'lucide-react';

const AllowedUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('/api/admin/allowed-users');
        setUsers(res.data.allowedUsers);
      } catch (err) {
        setMessage(err.response?.data?.msg || 'Error fetching allowed users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      try {
        await axios.delete(`/api/admin/allowed-users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        setMessage(err.response?.data?.msg || 'Error removing user');
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="text-indigo-600 h-6 w-6" />
        <h2 className="text-2xl font-semibold text-gray-800">Allowed Users</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader className="h-8 w-8 text-indigo-500 animate-spin" />
          </div>
        ) : (
          <>
            {message && (
              <div className="mb-4 p-3 rounded-md flex items-start space-x-2 bg-red-50 text-red-800">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-sm">{message}</p>
              </div>
            )}
            
            {filteredUsers.length > 0 ? (
              <div className="overflow-hidden border border-gray-200 sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <li key={user._id} className="px-4 py-3 sm:px-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-800">{user.email}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                          title="Remove user"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? (
                  <p>No users match your search.</p>
                ) : (
                  <p>No users have been added yet.</p>
                )}
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
              <p>{filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found</p>
              {searchTerm && filteredUsers.length !== users.length && (
                <p>{users.length - filteredUsers.length} users filtered out</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllowedUsers;
