import React from 'react';
import { Menu, BookOpen, ChevronRight } from 'lucide-react';

const TopBar = ({ toggleBookSidebar, toggleChapterSidebar, isMobileView, selectedBook }) => {
  return (
    <div className="sticky top-16 z-10 bg-white shadow-sm flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <button
        onClick={toggleBookSidebar}
        className="flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Open books sidebar"
      >
        <Menu size={20} className="text-gray-600" />
      </button>

      <div className="flex-1 mx-3 truncate">
        {selectedBook ? (
          <div className="flex items-center text-gray-800">
            <BookOpen size={18} className="text-indigo-600 mr-2" />
            <span className="font-medium truncate">{selectedBook.title}</span>
          </div>
        ) : (
          <span className="text-gray-500">Select a book</span>
        )}
      </div>

      {selectedBook && (
        <button
          onClick={toggleChapterSidebar}
          className="flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Open chapters sidebar"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default TopBar;