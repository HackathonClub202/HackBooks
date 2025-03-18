import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Library, BookOpen, FileText, AlertCircle, Loader, Info } from 'lucide-react';

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('/api/admin/books');
        setBooks(res.data.books);
      } catch (err) {
        setMessage(err.response?.data?.msg || 'Error fetching books');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Library className="text-indigo-600 h-6 w-6" />
        <h2 className="text-2xl font-semibold text-gray-800">Book Library</h2>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader className="h-8 w-8 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <>
          {message && (
            <div className="mb-6 p-3 rounded-md flex items-start space-x-2 bg-red-50 text-red-800">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <p className="text-sm">{message}</p>
            </div>
          )}
          
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map(book => (
                <div key={book._id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-3">
                    <BookOpen className="text-indigo-500 h-5 w-5" />
                    <h3 className="text-xl font-semibold text-gray-800 truncate">{book.title}</h3>
                  </div>
                  
                  {book.description && (
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{book.description}</p>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <span>Chapters ({book.chapters.length})</span>
                    </div>
                    <ul className="space-y-2">
                      {book.chapters.map((chapter, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <FileText className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 truncate flex-grow">{chapter.title}</span>
                          <a 
                            href={`/${chapter.pdfUrl}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                          >
                            View PDF
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : !message && (
            <div className="bg-blue-50 text-blue-700 rounded-md p-4 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              <p>No books found. Upload some books to get started.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewBook;