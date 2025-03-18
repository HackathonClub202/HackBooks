import React from 'react';
import { Book, ChevronLeft, X, Search, Plus, BookOpen } from 'lucide-react';

const BookSidebar = ({ books, selectedBook, onSelectBook, isOpen, toggleSidebar, isMobileView, isLoading }) => {
  const topPosition = isMobileView ? 'top-16' : 'top-0';
  
  return (
    <aside
      className={`
        fixed md:relative z-30 h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'w-3/4 md:w-72 left-0' : 'w-0 md:w-0 -left-full md:-left-96'}
        ${topPosition}
      `}
    >
      <div className="h-full flex flex-col overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <BookOpen className="mr-2 text-indigo-600" size={22} />
              Library
            </h2>
            <button
              onClick={toggleSidebar}
              className="md:flex hidden items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close books sidebar"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={toggleSidebar}
              className="md:hidden flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close books sidebar"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Search input */}
          <div className="relative rounded-lg bg-gray-100 flex items-center">
            <Search size={16} className="absolute left-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search books..." 
              className="bg-transparent border-none outline-none text-gray-800 pl-9 py-2 pr-4 w-full rounded-lg"
            />
          </div>
        </div>
        
        {/* Books list */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
              <p className="text-sm">Loading books...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <Book size={48} className="mb-3 text-gray-300" />
              <p className="text-center">No books found</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {books.map((book) => (
                <li
                  key={book._id}
                  onClick={() => onSelectBook(book)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all
                    ${selectedBook?._id === book._id
                      ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-900'
                      : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent'}
                  `}
                >
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{book.description || "No description available"}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      {book.chapters?.length || 0} chapters
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Add book button */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center">
            <Plus size={16} className="mr-2" />
            <span>Add a Book</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default BookSidebar;