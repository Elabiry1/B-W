import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const Hero: React.FC = () => {
  const { t, language } = useTranslation();

  return (
    <div className="relative backdrop-blur-sm">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-40 flex relative overflow-hidden shadow-2xl"
      >
        <div className="w-1/2 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
          >
            Black
          </motion.h1>
        </div>
        <div className="w-1/2 bg-gradient-to-bl from-white via-gray-50 to-white flex items-center justify-center border-l border-gray-200">
          <motion.h1
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-black drop-shadow-sm"
          >
            White
          </motion.h1>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-500 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-gray-300 shadow-lg"
          >
            and
          </motion.span>
        </div>
      </motion.div>

      {/* Simple Chic Text */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="bg-white/80 backdrop-blur-sm py-12 text-center shadow-inner"
      >
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-700 bg-clip-text text-transparent tracking-wider drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
          {t('heroTitle')}
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto drop-shadow-sm">
          {t('heroSubtitle')}
        </p>
      </motion.div>
    </div>
  );
};

export default Hero;