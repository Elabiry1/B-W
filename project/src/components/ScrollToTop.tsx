import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    const scrollToTop = () => {
      // Primary method - works in most modern browsers
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Immediate scroll, no smooth animation
      });
      
      // Fallback methods for better browser compatibility
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Execute immediately
    scrollToTop();
    
    // Also execute after a small delay to handle any async content loading
    const timeoutId = setTimeout(scrollToTop, 0);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;