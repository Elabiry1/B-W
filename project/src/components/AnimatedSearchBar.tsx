import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedSearchBarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({ isOpen, onToggle, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when search bar opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key to close search bar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery('');
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Search Icon Button */}
      <button
        onClick={onToggle}
        className="p-2 text-black hover:text-[#87CEEB] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#87CEEB] focus:ring-opacity-50 rounded-lg"
        aria-label="Open search"
        aria-expanded={isOpen}
      >
        <Search size={20} />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Animated Search Bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.4 
            }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center space-x-4">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search size={20} className="text-gray-400" />
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for products, colors, or styles..."
                      className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#87CEEB] focus:border-[#87CEEB] transition-all duration-300 bg-white shadow-sm"
                      aria-label="Search products"
                    />
                    
                    {/* Clear Button */}
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear search"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>

                  {/* Search Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!searchQuery.trim()}
                    className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-[#87CEEB] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    Search
                  </motion.button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-4 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-gray-100"
                    aria-label="Close search"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Search Suggestions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Popular searches:</span>
                  {['Black Tee', 'White Tee', 'Essential', 'Premium'].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setSearchQuery(suggestion)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-[#87CEEB] hover:text-white transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedSearchBar;