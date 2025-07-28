import React, { useState } from 'react';
import { CheckCircle, XCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SKUVerification: React.FC = () => {
  const [sku, setSku] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock verification data
  const mockVerificationData = {
    'BWB001': {
      valid: true,
      product: {
        name: 'Essential Black Tee',
        price: 85,
        image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
        color: 'black'
      },
      customer: 'John Doe',
      purchaseDate: '2024-12-15'
    },
    'BWW001': {
      valid: true,
      product: {
        name: 'Pure White Tee',
        price: 85,
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
        color: 'white'
      },
      customer: 'Jane Smith',
      purchaseDate: '2024-12-20'
    }
  };

  const handleVerify = async () => {
    if (!sku.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = mockVerificationData[sku.toUpperCase() as keyof typeof mockVerificationData];
      
      if (result) {
        setVerificationResult(result);
      } else {
        setVerificationResult({ valid: false });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setSku('');
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SKU Verification</h1>
          <p className="text-lg text-gray-600">
            Verify the authenticity of your B&W product
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-50 rounded-lg p-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                Enter SKU / Product ID
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  id="sku"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g., BWB001"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                />
                <button
                  onClick={handleVerify}
                  disabled={!sku.trim() || isLoading}
                  className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-[#337AFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search size={20} />
                  )}
                  <span>{isLoading ? 'Verifying...' : 'Verify'}</span>
                </button>
              </div>
            </div>

            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-lg border-2 ${
                  verificationResult.valid
                    ? `border-green-500 bg-green-50`
                    : 'border-red-500 bg-red-50'
                }`}
                style={verificationResult.valid ? {
                  backgroundColor: verificationResult.product.color === 'black' ? '#f3f4f6' : '#ffffff',
                  borderColor: verificationResult.product.color === 'black' ? '#000000' : '#6b7280'
                } : {}}
              >
                {verificationResult.valid ? (
                  <div className="text-center">
                    <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                    <h2 className="text-2xl font-bold text-green-800 mb-4">✅ Verified Authentic</h2>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <img
                        src={verificationResult.product.image}
                        alt={verificationResult.product.name}
                        className="w-32 h-32 mx-auto object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {verificationResult.product.name}
                      </h3>
                      <p className="text-gray-600 mb-2">${verificationResult.product.price}</p>
                      <p className="text-sm text-gray-500">
                        Purchased by: {verificationResult.customer}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date: {verificationResult.purchaseDate}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <XCircle size={48} className="mx-auto mb-4 text-red-500" />
                    <h2 className="text-2xl font-bold text-red-800 mb-4">❌ Not Verified</h2>
                    <p className="text-red-700">
                      This product SKU is not from B&W. Please check the SKU or contact us if you believe this is an error.
                    </p>
                  </div>
                )}
                
                <button
                  onClick={handleReset}
                  className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Verify Another SKU
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          <p>
            You can find your SKU in your order confirmation email or receipt.
            For help, contact us at{' '}
            <a href="mailto:support@bandw.com" className="text-[#337AFF] hover:underline">
              support@bandw.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SKUVerification;