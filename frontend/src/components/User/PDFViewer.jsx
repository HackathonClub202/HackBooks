import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set the worker source (ensure version matches your pdfjs-dist version)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const PDFViewer = ({ selectedChapter, userEmail }) => {
  const viewerContainerRef = useRef(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jumpToPage, setJumpToPage] = useState('');
  

  const renderPDF = useCallback(async () => {
    if (!selectedChapter || !viewerContainerRef.current) return;

    try {
      setLoading(true);
      const pdfUrl = selectedChapter.pdfUrl || (selectedChapter._doc && selectedChapter._doc.pdfUrl);
      if (!pdfUrl) {
        console.error('No PDF URL found in the selected chapter', selectedChapter);
        setLoading(false);
        return;
      }

      const loadingTask = pdfjsLib.getDocument({ url: pdfUrl, withCredentials: true });
      const pdf = await loadingTask.promise;
      setPdfDocument(pdf);
      setTotalPages(pdf.numPages);

      const pageNumbers = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
      setPdfPages(pageNumbers);
      setLoading(false);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setLoading(false);
    }
  }, [selectedChapter]);

  const renderPage = async (pageNumber, containerWidth) => {
    if (!pdfDocument) return;

    try {
      const page = await pdfDocument.getPage(pageNumber);

      const unscaledViewport = page.getViewport({ scale: 1 });
      const computedScale = containerWidth / unscaledViewport.width;
      const viewport = page.getViewport({ scale: computedScale });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.className = 'rounded-lg shadow-lg';

      const ctx = canvas.getContext('2d');
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };
      const addWatermark = (canvas, userEmail) => {
        const ctx = canvas.getContext('2d');
        const watermarkText = `${userEmail} - Hackathon Club `;
        const fontSize = 20; // Adjustable based on canvas size
        const textOpacity = 0.2; // Subtle opacity
        const rotationAngle = -30; // Diagonal text
      
        ctx.save(); // Save current context state
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = `rgba(59, 130, 246, ${textOpacity})`;
        ctx.textAlign = 'right';
        // ctx.textBaseline = 'middle';
        ctx.translate(canvas.width / 2, canvas.height / 2); // Move to canvas center
        ctx.rotate((rotationAngle * Math.PI) / 180); // Rotate context
      
        const textWidth = ctx.measureText(watermarkText).width;
        const textHeight = fontSize;
      
        // Loop to cover the canvas
        for (let x = -canvas.width; x < canvas.width * 2; x += textWidth * 2) {
          for (let y = -canvas.height; y < canvas.height * 2; y += textHeight * 3) {
            ctx.fillText(watermarkText, x, y);
          }
        }
      
        ctx.restore(); // Restore original context state
      };
      
      
      // Call addWatermark after rendering
      await page.render(renderContext).promise;
      addWatermark(canvas, userEmail);
      // await page.render(renderContext).promise;

      // Add watermark with user email and Hackathon Club
      // ctx.font = `${32 * computedScale}px 'Inter', sans-serif`;
      // ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // blue-500 with opacity
      // ctx.textAlign = 'center';
      // // ctx.fillText(userEmail, canvas.width / 2, canvas.height / 3);
      // ctx.fillText('Hackathon Club', canvas.width / 2, canvas.height / 1.5);

      // Create a wrapper div for the canvas and page number
      const wrapper = document.createElement('div');
      wrapper.className = 'relative';
      wrapper.appendChild(canvas);

      // Add page number at the bottom
      const pageNumberDiv = document.createElement('div');
      pageNumberDiv.className = 'absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-medium';
      pageNumberDiv.textContent = `Page ${pageNumber} of ${pdfDocument.numPages}`;
      wrapper.appendChild(pageNumberDiv);

      return wrapper;
    } catch (err) {
      console.error(`Error rendering page ${pageNumber}:`, err);
      return null;
    }
  };

  useEffect(() => {
    renderPDF();
  }, [selectedChapter, renderPDF]);

  useEffect(() => {
    const renderAllPages = async () => {
      if (!pdfDocument || !viewerContainerRef.current) return;

      const containerWidth = viewerContainerRef.current.offsetWidth * 0.9; // 90% width to add some padding
      const pagesContainer = viewerContainerRef.current.querySelector('.pdf-pages-container');
      
      if (!pagesContainer) return;
      
      pagesContainer.innerHTML = '';

      for (const pageNumber of pdfPages) {
        const pageElement = await renderPage(pageNumber, containerWidth);
        if (pageElement) {
          const pageWrapper = document.createElement('div');
          pageWrapper.className = 'mb-8 flex justify-center';
          pageWrapper.appendChild(pageElement);
          
          // Add a data attribute for easier scrolling
          pageWrapper.setAttribute('data-page', pageNumber);
          
          pagesContainer.appendChild(pageWrapper);
        }
      }
    };

    renderAllPages();
  }, [pdfPages, pdfDocument]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to the selected page
      const pageElement = viewerContainerRef.current.querySelector(`[data-page="${newPage}"]`);
      if (pageElement) {
        pageElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpToPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum);
      setJumpToPage('');
    }
  };

  return (
    <div ref={viewerContainerRef} className="flex-1 p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-y-auto transition-all duration-300">
      {selectedChapter ? (
        <div className="bg-white shadow-xl rounded-xl p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="inline-block w-2 h-8 bg-blue-500 rounded mr-3"></span>
              {selectedChapter.title || (selectedChapter._doc && selectedChapter._doc.title) || 'Untitled'}
            </h2>
            
            {totalPages > 0 && (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-all"
                  aria-label="Previous page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <span className="text-sm font-medium">
                  Page <span className="text-blue-600">{currentPage}</span> of {totalPages}
                </span>
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-all"
                  aria-label="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <form onSubmit={handleJumpToPage} className="flex items-center ml-4">
                  <label htmlFor="jump-to-page" className="sr-only">Jump to page</label>
                  <input
                    id="jump-to-page"
                    type="text" 
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    placeholder="Go to"
                    className="w-16 p-1 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Jump to page"
                  />
                  <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-1 px-2 text-sm rounded-r transition-colors"
                  >
                    Go
                  </button>
                </form>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading PDF...</p>
            </div>
          ) : (
            <div className="pdf-pages-container mt-6"></div>
          )}
          
          {/* Floating navigation bar at the bottom */}
          {totalPages > 0 && !loading && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-3">
              <button 
                onClick={() => handlePageChange(1)}
                disabled={currentPage <= 1}
                className="p-1 hover:bg-gray-700 rounded-full disabled:opacity-50 transition-all"
                aria-label="First page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-1 hover:bg-gray-700 rounded-full disabled:opacity-50 transition-all"
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <span className="text-sm font-medium px-2">
                {currentPage} / {totalPages}
              </span>
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-1 hover:bg-gray-700 rounded-full disabled:opacity-50 transition-all"
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage >= totalPages}
                className="p-1 hover:bg-gray-700 rounded-full disabled:opacity-50 transition-all"
                aria-label="Last page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414zm6 0a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-white bg-opacity-80 rounded-xl p-12 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium mb-2">No Document Selected</p>
          <p className="text-gray-400 text-center">Select a chapter from the sidebar to view the PDF</p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
