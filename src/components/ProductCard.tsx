import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: '',
        product_id: product.id,
        name: product.name,
        price: product.price,
        color: product.color,
        size: product.sizes[0] || 'M',
        quantity: 1,
        image: product.images[0] || '',
      }
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
    >
      <Link to={`/product/${product.id}`}>
        <div className="card overflow-hidden">
          <div className="relative aspect-square mb-4">
            <img
              src={product.images[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white font-semibold">Out of Stock</span>
              </div>
            )}
            
            {/* Hover Actions */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
              <div className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded-full ${
                  product.color === 'black' ? 'bg-black' : 'bg-white border border-gray-300'
                }`}></div>
                <span className="text-sm text-gray-500 capitalize">{product.color}</span>
              </div>
            </div>
            
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-sm text-orange-600">Only {product.stock} left!</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;