import React from 'react';
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const Products: React.FC = () => {
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState<'all' | 'black' | 'white'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'top' | 'bottom'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under-90' | '90-100' | 'over-100'>('all');

  // Filter and search products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesColor = selectedColor === 'all' || product.color === selectedColor;
      const matchesCategory = selectedCategory === 'all' || 
                             (selectedCategory === 'top' && (product.tags.includes('tee') || product.tags.includes('shirt'))) ||
                             (selectedCategory === 'bottom' && (product.tags.includes('pants') || product.tags.includes('shorts')));
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'under-90' && product.price < 90) ||
                          (priceRange === '90-100' && product.price >= 90 && product.price <= 100) ||
                          (priceRange === 'over-100' && product.price > 100);
      
      return matchesSearch && matchesColor && matchesCategory && matchesPrice;
    })

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedColor('all');
    setSelectedCategory('all');
    setPriceRange('all');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('allProducts')}</h1>
          <p className="text-lg text-gray-600">
            {t('allProductsSubtitle')}
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex max-w-md mx-auto gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('searchProducts')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-[#337AFF] transition-colors flex items-center space-x-2"
              >
                <Search size={20} />
                <span>{t('search')}</span>
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('color')}</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value as 'all' | 'black' | 'white')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">{t('allColors')}</option>
                <option value="black">{t('black')}</option>
                <option value="white">{t('white')}</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('category')}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'top' | 'bottom')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">{t('allCategories')}</option>
                <option value="top">{t('top')}</option>
                <option value="bottom">{t('bottom')}</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('priceRange')}</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as 'all' | 'under-90' | '90-100' | 'over-100')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">{t('allPrices')}</option>
                <option value="under-90">{t('under90')}</option>
                <option value="90-100">{t('price90to100')}</option>
                <option value="over-100">{t('over100')}</option>
              </select>
            </div>
          </div>

          {/* Clear Filters & Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-2 sm:mb-0">
              {t('showingProducts')} {filteredProducts.length} {t('ofProducts')} {products.length} {t('productsText')}
            </div>
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={16} />
              <span>{t('clearFilters')}</span>
            </button>
          </div>
        </motion.div>
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t('noProductsFound')}</h3>
            <p className="text-gray-600 mb-6">
              {t('tryAdjusting')}
            </p>
            <button
              onClick={clearFilters}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-[#337AFF] transition-colors"
            >
              {t('clearAllFilters')}
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;