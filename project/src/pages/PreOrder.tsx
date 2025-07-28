import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { nextCollection } from '../data/mockData';
import { motion } from 'framer-motion';

const PreOrder: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<'black' | 'white'>('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const blackCollection = nextCollection.find(c => c.color === 'black');
  const whiteCollection = nextCollection.find(c => c.color === 'white');

  const handlePreOrder = () => {
    // Simulate pre-order processing
    setTimeout(() => {
      setOrderPlaced(true);
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full mx-4 text-center"
        >
          <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pre-Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your pre-order has been confirmed. You'll be notified when your item is ready to ship.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-[#337AFF] transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pre-Order Next Collection</h1>
          <p className="text-lg text-gray-600 mb-6">
            Reserve your spot for our February 2025 collection
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Release Date: February 1, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>Ships: February 5, 2025</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Color Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Choose Your Color</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setSelectedColor('black')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedColor === 'black'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full mx-auto mb-2"></div>
                  <span className="font-medium">Black Collection</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedColor('white')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedColor === 'white'
                    ? 'border-black bg-white text-black'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full mx-auto mb-2"></div>
                  <span className="font-medium">White Collection</span>
                </div>
              </button>
            </div>

            {/* Preview Images */}
            <div className="grid grid-cols-3 gap-4">
              {(selectedColor === 'black' ? blackCollection?.images : whiteCollection?.images)?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedColor} collection preview ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-50 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Pre-Order Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="flex space-x-2">
                  {['M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Pre-Order Price:</span>
                  <span className="text-2xl font-bold">$85.00</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg">Total:</span>
                  <span className="text-2xl font-bold">${(85 * quantity).toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handlePreOrder}
                  className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-[#337AFF] transition-colors"
                >
                  Pre-Order Now
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Pre-Order Benefits</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Guaranteed availability</li>
                  <li>• Priority shipping</li>
                  <li>• 10% off next collection</li>
                  <li>• Free shipping on pre-orders</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;