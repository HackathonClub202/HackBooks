import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import BookSidebar from './BookSidebar';
import ChapterSidebar from './ChapterSidebar';
import PDFViewer from './PDFViewer';
import useSecurity from '../../hooks/useSecurity';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Menu, Bell, User, LogOut, Search, BookOpen } from 'lucide-react';

// Enhanced Navbar with dropdown and notifications
const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white py-3 px-6 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <BookOpen className="text-indigo-200" size={24} />
          <h1 className="text-xl font-bold">EduDashboard</h1>
        </div>
        
       
        
        <ul className="flex items-center space-x-6">
          <li className="hidden md:block"><a href="#" className="hover:text-indigo-200 transition-colors">Home</a></li>
          <li className="hidden md:block"><a href="#" className="hover:text-indigo-200 transition-colors">Library</a></li>
          
          {/* Notifications dropdown */}
          <li className="relative">
            <button 
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="p-2 rounded-full hover:bg-indigo-600 transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl py-2 z-50 text-gray-800">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 border-l-4 border-indigo-500">
                    <p className="text-sm font-medium">New chapter available</p>
                    <p className="text-xs text-gray-500">Advanced Physics - Chapter 8</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium">Weekly summary</p>
                    <p className="text-xs text-gray-500">Check your reading progress</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800">View all notifications</a>
                </div>
              </div>
            )}
          </li>
          
          {/* Profile dropdown */}
          <li className="relative">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center space-x-1"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 text-gray-800">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Help Center</a>
                <div className="border-t border-gray-200 my-1"></div>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center">
                  <LogOut size={16} className="mr-2" />
                  <span>Sign out</span>
                </a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Enhanced Footer
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center space-x-2">
            <BookOpen size={20} className="text-indigo-400" />
            <p className="font-semibold">EduDashboard</p>
          </div>
          <p className="text-sm mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        
        <div className="flex flex-col md:flex-row md:space-x-12 text-sm">
          <div className="mb-4 md:mb-0">
            <h4 className="font-medium text-white mb-2">Resources</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-indigo-300 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-300 transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-white mb-2">Contact</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-indigo-300 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-indigo-300 transition-colors">Feedback</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// Main Dashboard Component
const Dashboard = () => {
  useSecurity(); 
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isBookSidebarOpen, setIsBookSidebarOpen] = useState(true);
  const [isChapterSidebarOpen, setIsChapterSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingStats, setReadingStats] = useState({
    booksCompleted: 3,
    chaptersRead: 24,
    totalReadingTime: 1875, // in minutes
    currentStreak: 8 // in days
  });
  
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');
  // console.log('User Email:', email);

  // Adjust view based on screen width
  useEffect(() => {
    const checkMobileView = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (isMobile) {
        setIsBookSidebarOpen(false);
        setIsChapterSidebarOpen(false);
      } else {
        setIsBookSidebarOpen(true);
        setIsChapterSidebarOpen(true);
      }
    };
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Disable right-click and common inspection shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      if (process.env.NODE_ENV === 'production') {
        handleDevToolsOpen();
      }
    };
    // const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        handleDevToolsOpen();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
   

  // Fetch books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('/api/books', { withCredentials: true });
        setBooks(res.data.books);
        // If there are books, select the first one by default
        if (res.data.books.length > 0) {
          setSelectedBook(res.data.books[0]);
        }
      } catch (err) {
        console.error('Error fetching books:', err.response?.data?.msg || err.message);
        setError('Failed to load books. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    if (isMobileView) {
      setIsBookSidebarOpen(false);
      setIsChapterSidebarOpen(true);
    }
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    if (isMobileView) {
      setIsChapterSidebarOpen(false);
    }
  };

  const toggleBookSidebar = () => setIsBookSidebarOpen(!isBookSidebarOpen);
  const toggleChapterSidebar = () => setIsChapterSidebarOpen(!isChapterSidebarOpen);

  // Format minutes into hours and minutes
  const formatReadingTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Calculate the navbar height for positioning (assuming 64px for the navbar)
  const navbarHeight = 64;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Add padding at the top to account for fixed navbar */}
      <div className="pt-16">
        {/* Mobile Top Bar */}
        {isMobileView && (
          <TopBar 
            toggleBookSidebar={toggleBookSidebar} 
            toggleChapterSidebar={toggleChapterSidebar} 
            isMobileView={isMobileView} 
            selectedBook={selectedBook} 
          />
        )}
        
        {/* Main Content Area */}
        <div className="flex flex-1 relative overflow-hidden">
          {/* Overlay for mobile view */}
          {isMobileView && (isBookSidebarOpen || isChapterSidebarOpen) && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={() => {
                if (isBookSidebarOpen) setIsBookSidebarOpen(false);
                if (isChapterSidebarOpen) setIsChapterSidebarOpen(false);
              }}
            />
          )}
          
          {/* Book Sidebar - Using fixed positioning */}
          <div 
            className={`${isBookSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-16 left-0 bottom-0 w-72 overflow-y-auto transition-transform duration-300 z-30 bg-white border-r border-gray-200 shadow-md`}
          >
            {isBookSidebarOpen && (
              <BookSidebar 
                books={books} 
                selectedBook={selectedBook} 
                onSelectBook={handleBookClick} 
                isOpen={isBookSidebarOpen} 
                toggleSidebar={toggleBookSidebar}
                isMobileView={isMobileView}
                isLoading={isLoading}
              />
            )}
          </div>
          
          {/* Book Sidebar Toggle Button */}
          {!isBookSidebarOpen && !isMobileView && (
            <button 
              className="fixed top-1/2 left-0 -translate-y-1/2 flex z-20 items-center justify-center p-2 rounded-r-lg bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors"
              onClick={toggleBookSidebar}
              aria-label="Open books sidebar"
            >
              <ChevronRight size={20} />
            </button>
          )}
          
          {/* Central Content Area - Adjusted with left and right padding/margins to account for fixed sidebars */}
          <div className={`flex-1 flex flex-col relative overflow-hidden px-4 py-6 md:px-8 mx-auto w-full
            ${isBookSidebarOpen ? 'md:ml-72' : ''} 
            ${isChapterSidebarOpen ? 'md:mr-72' : ''}
          `}>
            {/* PDF Viewer or Welcome Screen */}
            {selectedChapter ? (
              <PDFViewer selectedChapter={selectedChapter} userEmail={email} />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                {error ? (
                  <div className="text-center text-red-500">
                    <p className="text-xl font-medium mb-2">{error}</p>
                    <button 
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </button>
                  </div>
                ) : isLoading ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Loading your library...</p>
                  </div>
                ) : books.length === 0 ? (
                  <div className="text-center">
                    <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Your library is empty</h2>
                    <p className="text-gray-500 mb-6">No books have been added to your account yet.</p>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <BookOpen size={64} className="text-indigo-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Welcome to Your Dashboard</h2>
                    <p className="text-gray-500 mb-2">Select a chapter from the sidebar to start reading</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Chapter Sidebar - Using fixed positioning */}
          <div 
            className={`${isChapterSidebarOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-16 right-0 bottom-0 w-72 overflow-y-auto transition-transform duration-300 z-30 bg-white border-l border-gray-200 shadow-md`}
          >
            {isChapterSidebarOpen && (
              <ChapterSidebar 
                selectedBook={selectedBook} 
                selectedChapter={selectedChapter} 
                onSelectChapter={handleChapterClick} 
                isOpen={isChapterSidebarOpen} 
                toggleSidebar={toggleChapterSidebar}
                isMobileView={isMobileView}
              />
            )}
          </div>
          
          {/* Chapter Sidebar Toggle Button */}
          {!isChapterSidebarOpen && !isMobileView && (
            <button 
              className="fixed top-1/2 right-0 -translate-y-1/2 flex z-20 items-center justify-center p-2 rounded-l-lg bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors"
              onClick={toggleChapterSidebar}
              aria-label="Open chapters sidebar"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;