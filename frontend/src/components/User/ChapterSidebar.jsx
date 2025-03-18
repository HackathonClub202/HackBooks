import React, { useState } from 'react';
import { BookOpen, ChevronRight, X, Eye, Search, CheckCircle, Clock, BookMarked, AlertCircle } from 'lucide-react';

const ChapterSidebar = ({ selectedBook, selectedChapter, onSelectChapter, isOpen, toggleSidebar, isMobileView }) => {
  const topPosition = isMobileView ? 'top-16' : 'top-0';
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'unread'
  
  // Function to filter chapters based on selected filter
  const getFilteredChapters = (chapters) => {
    if (!chapters) return [];
    
    switch(filter) {
      case 'completed':
        // Mock implementation - in real app, would use actual read status
        return chapters.filter((_, index) => index < 3);
      case 'unread':
        // Mock implementation - in real app, would use actual read status
        return chapters.filter((_, index) => index >= 3);
      default:
        return chapters;
    }
  };
  
  return (
    <aside
      className={`
        fixed md:relative z-30 h-full bg-white border-l border-gray-200 shadow-lg transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'w-3/4 md:w-72 right-0' : 'w-0 md:w-0 -right-full md:-right-96'}
        ${topPosition}
      `}
    >
      <div className="h-full flex flex-col overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <BookOpen className="mr-2 text-indigo-600" size={22} />
              Chapters
            </h3>
            <button
              onClick={toggleSidebar}
              className="md:flex hidden items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close chapters sidebar"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={toggleSidebar}
              className="md:hidden flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close chapters sidebar"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Search input */}
          <div className="relative rounded-lg bg-gray-100 flex items-center mb-2">
            <Search size={16} className="absolute left-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search chapters..." 
              className="bg-transparent border-none outline-none text-gray-800 pl-9 py-2 pr-4 w-full rounded-lg"
            />
          </div>
          
          {/* Filter tabs */}
          {selectedBook && (
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button 
                className={`flex-1 text-xs py-1 px-2 rounded-md transition-colors ${filter === 'all' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`flex-1 text-xs py-1 px-2 rounded-md transition-colors ${filter === 'completed' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
              <button 
                className={`flex-1 text-xs py-1 px-2 rounded-md transition-colors ${filter === 'unread' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                onClick={() => setFilter('unread')}
              >
                Unread
              </button>
            </div>
          )}
        </div>
        
        {/* Chapters list */}
        <div className="flex-1 overflow-y-auto">
          {selectedBook ? (
            <div className="p-4 space-y-2">
              {selectedBook.chapters && selectedBook.chapters.length > 0 ? (
                getFilteredChapters(selectedBook.chapters).map((chapter, index) => {
                  const chapterTitle = chapter.title || (chapter._doc && chapter._doc.title) || `Chapter ${index + 1}`;
                  // Mock read status - would come from real data in production
                  const isRead = index < 3;
                  const isCurrentlyReading = index === 3;
                  const hasNotes = index % 2 === 0; // Mock data - alternating chapters have notes
                  
                  return (
                    <div
                      key={index}
                      onClick={() => onSelectChapter(chapter)}
                      className={`
                        p-3 rounded-lg cursor-pointer transition-all
                        ${selectedChapter && (selectedChapter._id === chapter._id ||
                          (selectedChapter._doc && selectedChapter._doc._id === chapter._id))
                          ? 'bg-indigo-50 border-l-4 border-indigo-600 text-indigo-900'
                          : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          {isRead ? (
                            <CheckCircle className="mr-2 text-green-500" size={16} />
                          ) : isCurrentlyReading ? (
                            <Clock className="mr-2 text-amber-500" size={16} />
                          ) : (
                            <Eye className="mr-2 text-gray-400" size={16} />
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-sm truncate block">{chapterTitle}</span>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span>{index + 1} of {selectedBook.chapters.length}</span>
                              {isRead && (
                                <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-600 rounded-sm">
                                  Complete
                                </span>
                              )}
                              {isCurrentlyReading && (
                                <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded-sm">
                                  In progress
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {hasNotes && (
                          <div className="ml-2 text-indigo-500" title="Has notes">
                            <BookMarked size={14} />
                          </div>
                        )}
                      </div>
                      
                      {/* Progress bar for chapters in progress */}
                      {isCurrentlyReading && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <AlertCircle size={36} className="mb-3 text-gray-300" />
                  <p className="text-center">No chapters available</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500 p-6">
              <BookOpen size={42} className="mb-4 text-gray-300" />
              <p className="text-center">Select a book to view chapters</p>
            </div>
          )}
        </div>
        
        {/* Reading progress section */}
        {selectedBook && selectedBook.chapters && selectedBook.chapters.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Overall Progress</span>
                <span>3/{selectedBook.chapters.length} chapters</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{width: `${(3 / selectedBook.chapters.length) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <div className="flex space-x-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-gray-600">Complete</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                <span className="text-gray-600">In Progress</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                <span className="text-gray-600">Unread</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChapterSidebar;