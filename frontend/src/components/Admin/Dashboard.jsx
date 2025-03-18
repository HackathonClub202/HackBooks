import React, { useState } from 'react';
import AddUser from './AddUser';
import AllowedUsers from './AllowedUsers';
import UploadBook from './UploadBook';
import ViewBook from './ViewBook';
import UpdateBook from './UpdateBook';
import { Menu, X, Users, Upload, BookOpen, Edit, User, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState('addUser');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Map of component name to the actual component
  const components = {
    addUser: <AddUser />,
    allowedUsers: <AllowedUsers />,
    uploadBook: <UploadBook />,
    viewBook: <ViewBook />,
    updateBook: <UpdateBook />
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'translate-x-0 w-64' : 'translate-x-full w-0 -mr-64'
        } fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out z-10 md:relative md:translate-x-0 ${
          isSidebarOpen ? 'md:w-64' : 'md:w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && 'md:hidden'}`}>Book System</h1>
          <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-700">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => setActiveComponent('addUser')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors ${
                  activeComponent === 'addUser' ? 'bg-gray-700' : ''
                }`}
              >
                <User size={20} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Add User</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveComponent('allowedUsers')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors ${
                  activeComponent === 'allowedUsers' ? 'bg-gray-700' : ''
                }`}
              >
                <Users size={20} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Allowed Users</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveComponent('uploadBook')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors ${
                  activeComponent === 'uploadBook' ? 'bg-gray-700' : ''
                }`}
              >
                <Upload size={20} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Upload Book</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveComponent('viewBook')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors ${
                  activeComponent === 'viewBook' ? 'bg-gray-700' : ''
                }`}
              >
                <BookOpen size={20} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>View Book</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveComponent('updateBook')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors ${
                  activeComponent === 'updateBook' ? 'bg-gray-700' : ''
                }`}
              >
                <Edit size={20} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Update Book</span>
              </button>
            </li>
          </ul>

          <div className="pt-8 mt-8 border-t border-gray-700">
            <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors text-red-400">
              <LogOut size={20} />
              <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar} 
                className="p-1 rounded-md hover:bg-gray-200 md:hidden"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold ml-4">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {components[activeComponent]}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;