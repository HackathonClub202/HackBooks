// Create a new security hook (useSecurity.js)
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSecurity = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Detect dev tools opening
    const devtoolsDetector = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      const orientation = widthThreshold ? 'vertical' : 'horizontal';

      if (
        !(heightThreshold && widthThreshold) &&
        ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
          widthThreshold ||
          heightThreshold)
      ) {
        handleDevToolsOpen();
      }
    };

    const handleDevToolsOpen = () => {
      // Clear authentication and redirect
      document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      localStorage.clear();
      navigate('/invalid');
      window.location.reload();
    };

    // Check periodically
    const interval = setInterval(devtoolsDetector, 1000);

    // Add debugger detection
    let debuggerChecker = setInterval(function() {
      (function(){}).constructor('debugger')();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(debuggerChecker);
    };
  }, [navigate]);

  // Additional security measures
  useEffect(() => {
    const blockShortcuts = (e) => {
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        handleDevToolsOpen();
      }
      // Add more shortcuts as needed
    };

    document.addEventListener('keydown', blockShortcuts);
    return () => document.removeEventListener('keydown', blockShortcuts);
  }, []);
};

export default useSecurity;