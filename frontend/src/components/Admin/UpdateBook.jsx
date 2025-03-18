import React, { useState } from 'react';
import axios from 'axios';
import { Edit3, PlusCircle, FileText, File, Book, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const UpdateBook = () => {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chapters, setChapters] = useState([{ chapterTitle: '', chapterFile: null }]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);

  const addChapter = () => {
    setChapters([...chapters, { chapterTitle: '', chapterFile: null }]);
  };

  const removeChapter = (index) => {
    const newChapters = [...chapters];
    newChapters.splice(index, 1);
    setChapters(newChapters);
  };

  const handleChapterChange = (index, field, value) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    
    chapters.forEach((chapter) => {
      formData.append('chapterTitle', chapter.chapterTitle);
    });
    
    chapters.forEach((chapter) => {
      if (chapter.chapterFile) {
        formData.append('chapterPDF', chapter.chapterFile);
      }
    });
    
    try {
      const res = await axios.put(`/api/admin/book/${bookId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus('success');
      setMessage(res.data.msg);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.msg || 'Error updating book');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Edit3 className="text-indigo-600 h-6 w-6" />
        <h2 className="text-2xl font-semibold text-gray-800">Update Book</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Book ID */}
          <div>
            <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-1">
              Book ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Book className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="bookId"
                type="text"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter book ID"
              />
            </div>
          </div>
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              New Title (optional)
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter new title"
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              New Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter new description"
              rows="3"
            />
          </div>
          
          {/* Chapters Section */}
          <div className="pt-5 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Add New Chapters</h3>
              <button 
                type="button" 
                onClick={addChapter}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Chapter
              </button>
            </div>
            
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-medium text-gray-700">Chapter {index + 1}</h4>
                    {chapters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChapter(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {/* Chapter Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chapter Title
                      </label>
                      <input
                        type="text"
                        value={chapter.chapterTitle}
                        onChange={(e) => handleChapterChange(index, 'chapterTitle', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter chapter title"
                        required
                      />
                    </div>
                    
                    {/* Chapter PDF */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chapter PDF
                      </label>
                      <div className="flex items-center">
                        <label className="flex-1 cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                          <FileText className="inline-block h-5 w-5 mr-2 text-gray-400" />
                          <span className="truncate">
                            {chapter.chapterFile ? chapter.chapterFile.name : 'Choose PDF file'}
                          </span>
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleChapterChange(index, 'chapterFile', e.target.files[0])}
                            className="sr-only"
                            required
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit3 className="h-5 w-5 mr-2" />
                  Update Book
                </>
              )}
            </button>
          </div>
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
    </div>
  );
};

export default UpdateBook;
