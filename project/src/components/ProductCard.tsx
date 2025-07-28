import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, favorites } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    cart.addToCart({
      productId: product.id,
      name: product.name,
      color: product.color,
      size: 'M', // Default size
      quantity: 1,
      price: product.price,
      image: product.images[0]
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    favorites.toggleFavorite(product.id);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <Link to={`/product/${product.slug}`}>
        <div className={`rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
          product.color === 'white' 
            ? 'bg-white border-black border-2' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="relative aspect-square">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {product.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={prevImage}
                  className="p-1 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextImage}
                  className="p-1 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Image Indicators */}
            {product.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-black' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}


            {/* Stock Status */}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <div className={`p-4 relative z-10 ${product.color === 'white' ? 'bg-black' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className={`font-medium mb-2 ${product.color === 'white' ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                <p className={`text-lg font-bold ${product.color === 'white' ? 'text-white' : 'text-gray-900'}`}>${product.price}</p>
                {product.stock <= 5 && product.stock > 0 && (
                  <p className={`text-sm mt-1 ${product.color === 'white' ? 'text-orange-300' : 'text-orange-600'}`}>Only {product.stock} left!</p>
                )}
              </div>
              
              {/* Action Buttons - Right Side */}
              <div className="flex flex-col space-y-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="p-2 bg-black text-white rounded-full hover:bg-[#337AFF] shadow-sm transition-colors"
                >
                  <ShoppingCart size={16} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full ${
                    favorites.isFavorite(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600 hover:text-red-500'
                  } shadow-sm transition-colors`}
                >
                  <Heart size={16} fill={favorites.isFavorite(product.id) ? 'currentColor' : 'none'} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;