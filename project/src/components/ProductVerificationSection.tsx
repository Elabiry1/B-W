import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VerificationResult {
  valid: boolean;
  product?: {
    id: string;
    name: string;
    image: string;
    color: 'black' | 'white';
    price: number;
  };
  customer?: string;
  purchaseDate?: string;
  sku?: string;
}

const ProductVerificationSection: React.FC = () => {
  const [sku, setSku] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock CMS data - In a real application, this would be fetched from your CMS
  const mockCMSData: Record<string, VerificationResult> = {
    'BW001234': {
      valid: true,
      product: {
        id: '1',
        name: 'Essential Black Tee',
        image: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
        color: 'black',
        price: 85
      },
      customer: 'John Doe',
      purchaseDate: '2024-12-15',
      sku: 'BW001234'
    },
    'BW001235': {
      valid: true,
      product: {
        id: '2',
        name: 'Pure White Tee',
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
        color: 'white',
        price: 85
      },
      customer: 'Jane Smith',
      purchaseDate: '2024-12-20',
      sku: 'BW001235'
    },
    'BW001236': {
      valid: true,
      product: {
        id: '3',
        name: 'Midnight Black Premium',
        image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=400',
        color: 'black',
        price: 95
      },
      customer: 'Mike Johnson',
      purchaseDate: '2024-12-18',
      sku: 'BW001236'
    }
  };

  const handleVerify = async () => {
    if (!sku.trim()) return;

    setIsLoading(true);
    
    // Simulate CMS API call
    setTimeout(() => {
      const result = mockCMSData[sku.toUpperCase()];
      
      if (result) {
        setVerificationResult(result);
      } else {
        setVerificationResult({ valid: false });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setSku('');
    setVerificationResult(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white/90 to-gray-50/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield size={32} className="text-black mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-sm">
              Verify Your Product
            </h2>
          </div>
          <p className="text-lg text-gray-600 drop-shadow-sm">
            Enter your SKU to verify the authenticity of your B&W product
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/40"
        >
          {!verificationResult ? (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-4">
                  Your SKU was sent to you via email or WhatsApp after purchase
                </p>
                <p className="text-sm text-gray-500">
                  Example: BW001234, BW001235, BW001236
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your SKU (e.g., BW001234)"
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerify}
                  disabled={!sku.trim() || isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-semibold hover:from-[#337AFF] hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      <span>Verify</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.6, type: "spring", damping: 20 }}
                className="text-center"
              >
                {verificationResult.valid ? (
                  <div className="space-y-6">
                    {/* Verified Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", damping: 15 }}
                      className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg"
                    >
                      <CheckCircle size={32} />
                      <span>VERIFIED AUTHENTIC</span>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className={`bg-gradient-to-br ${
                        verificationResult.product?.color === 'black' 
                          ? 'from-black via-gray-900 to-black text-white' 
                          : 'from-white via-gray-50 to-white text-black border-2 border-gray-200'
                      } rounded-2xl p-8 shadow-2xl backdrop-blur-sm`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                          <img
                            src={verificationResult.product?.image}
                            alt={verificationResult.product?.name}
                            className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
                          />
                        </div>
                        <div className="space-y-4 text-left">
                          <h3 className="text-2xl font-bold">
                            {verificationResult.product?.name}
                          </h3>
                          <p className="text-xl font-semibold">
                            ${verificationResult.product?.price}
                          </p>
                          <div className="space-y-2">
                            <p className={`${
                              verificationResult.product?.color === 'black' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              <span className="font-medium">Customer:</span> {verificationResult.customer}
                            </p>
                            <p className={`${
                              verificationResult.product?.color === 'black' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              <span className="font-medium">Purchase Date:</span> {verificationResult.purchaseDate}
                            </p>
                            <p className={`${
                              verificationResult.product?.color === 'black' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              <span className="font-medium">SKU:</span> {verificationResult.sku}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Fake Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", damping: 15 }}
                      className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg"
                    >
                      <XCircle size={32} />
                      <span>FAKE</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="bg-red-50 border-2 border-red-200 rounded-2xl p-8"
                    >
                      <h3 className="text-xl font-bold text-red-800 mb-4">
                        Product Not Verified
                      </h3>
                      <p className="text-red-700 mb-4">
                        This SKU is not found in our database. This product may be counterfeit.
                      </p>
                      <p className="text-sm text-red-600">
                        If you believe this is an error, please contact our support team with your purchase details.
                      </p>
                    </motion.div>
                  </div>
                )}

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={handleReset}
                  className="mt-8 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Verify Another Product
                </motion.button>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8 text-sm text-gray-600"
        >
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:support@bandw.com" className="text-[#337AFF] hover:underline font-medium">
              support@bandw.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductVerificationSection;