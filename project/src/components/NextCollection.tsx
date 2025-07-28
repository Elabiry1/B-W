import React from 'react';
import { Link } from 'react-router-dom';
import { nextCollection } from '../data/mockData';
import { motion } from 'framer-motion';

const NextCollection: React.FC = () => {
  const blackCollection = nextCollection.find(c => c.color === 'black');
  const whiteCollection = nextCollection.find(c => c.color === 'white');

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100/80 to-gray-200/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 drop-shadow-sm">
            Next Collection
          </h2>
          <p className="text-lg text-gray-600 drop-shadow-sm">
            Coming February 2025
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Black Collection Marquee */}
          {blackCollection && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-black via-gray-900 to-black py-8 rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="flex animate-marquee space-x-8">
                {[...blackCollection.images, ...blackCollection.images].map((image, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={image}
                      alt={`Black collection ${index + 1}`}
                      className="w-64 h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* White Collection Marquee */}
          {whiteCollection && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-white via-gray-50 to-white py-8 rounded-lg overflow-hidden border-2 border-gray-200 shadow-2xl"
            >
              <div className="flex animate-marquee-reverse space-x-8">
                {[...whiteCollection.images, ...whiteCollection.images].map((image, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={image}
                      alt={`White collection ${index + 1}`}
                      className="w-64 h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/preorder"
            className="inline-block bg-gradient-to-r from-black to-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-[#337AFF] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Pre-order Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NextCollection;