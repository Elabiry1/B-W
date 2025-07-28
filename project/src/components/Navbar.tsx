import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Heart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const Navbar: React.FC = () => {
  const { cart, language, setLanguage } = useApp();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const cartItemCount = cart.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    cart.setIsOpen(true);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const menuItems = [
    { label: 'Favorites', icon: Heart, path: '/favorites' },
    { label: 'Account', icon: User, path: '/account' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg ${language === 'ar' ? 'rtl' : 'ltr'}`}
        className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-black hover:text-[#337AFF] transition-colors">
              B&W
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={handleCartClick}
                className="relative p-2 text-black hover:text-[#337AFF] transition-colors"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <Link
                to="/"
                className="text-black hover:text-[#337AFF] transition-colors font-medium"
              >
                {t('home')}
              </Link>
              
              <Link
                to="/products"
                className="text-black hover:text-[#337AFF] transition-colors font-medium"
              >
                {t('products')}
              </Link>
            </div>

            {/* Mobile Cart + Menu */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={handleCartClick}
                className="relative p-2 text-black hover:text-[#337AFF] transition-colors"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black hover:text-[#337AFF] transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black hover:text-[#337AFF] transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                to="/"
                className="block text-black hover:text-[#337AFF] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                to="/products"
                className="block text-black hover:text-[#337AFF] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('products')}
              </Link>
              <hr className="border-gray-200" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 text-black hover:text-[#337AFF] transition-colors font-medium w-full text-left"
              >
                <Heart size={20} />
                <span>{t('favorites')}</span>
              </button>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{t('language')}:</span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded ${language === 'en' ? 'bg-black text-white' : 'text-black hover:text-[#337AFF]'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-3 py-1 rounded ${language === 'ar' ? 'bg-black text-white' : 'text-black hover:text-[#337AFF]'}`}
                >
                  AR
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dropdown Menu */}
      {/* Desktop Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block fixed right-4 top-16 bg-white/90 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50 w-48"
          >
            <div className="py-2">
              <div className="px-4 py-2 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{t('language')}:</span>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 rounded text-sm ${language === 'en' ? 'bg-black text-white' : 'text-black hover:text-[#337AFF]'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('ar')}
                    className={`px-2 py-1 rounded text-sm ${language === 'ar' ? 'bg-black text-white' : 'text-black hover:text-[#337AFF]'}`}
                  >
                    AR
                  </button>
                </div>
              </div>
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.path === '/account') {
                      navigate('/auth');
                    } else {
                      navigate(item.path);
                    }
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left text-black hover:bg-gray-100 hover:text-[#337AFF] transition-colors"
                >
                  <item.icon size={16} />
                  <span>{item.label === 'Favorites' ? t('favorites') : t('account')}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;