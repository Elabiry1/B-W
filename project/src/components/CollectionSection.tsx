import React from 'react';
import { products } from '../data/mockData';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const CollectionSection: React.FC = () => {
  const { t, language } = useTranslation();
  const blackProducts = products.filter(p => p.color === 'black');
  const whiteProducts = products.filter(p => p.color === 'white');

  const renderProducts = (products: typeof blackProducts, title: string, isBlackSection = false) => {
    if (products.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <p className={`text-xl font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t('comingSoon')}</p>
            <p className={`text-sm mt-2 ${language === 'ar' ? 'font-arabic' : ''}`}>{t('newCollectionArriving')}</p>
          </div>
        </div>
      );
    }

    if (products.length === 1 || isBlackSection) {
      return (
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <ProductCard product={isBlackSection ? products[0] : products[0]} />
          </div>
        </div>
      );
    }

    return (
      <div className="h-96 overflow-y-auto space-y-6 pr-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 drop-shadow-sm">
            {t('currentCollection')}
          </h2>
          <p className="text-lg text-gray-600 drop-shadow-sm">
            {t('currentCollectionSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Black Products */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-lg p-6 shadow-2xl backdrop-blur-sm border border-gray-800 overflow-hidden z-10 moving-border-black-light"
          >
            {/* Epic background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-8 right-8 w-24 h-24 bg-gray-300 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-white to-gray-400 rounded-full blur-3xl"></div>
            </div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
            
            <h3 className="relative text-2xl font-bold text-center mb-6 text-white drop-shadow-lg">{t('blackCollection')}</h3>
            {renderProducts(blackProducts, 'Black', true)}
          </motion.div>

          {/* White Products */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-bl from-white to-gray-50 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-white/40 moving-border-white"
          >
            <h3 className="text-2xl font-bold text-center mb-6 drop-shadow-sm">{t('whiteCollection')}</h3>
            {renderProducts(whiteProducts, 'White', false)}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;