import React, { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Returns: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orderSku: '',
    reason: '',
    newSize: '',
    image: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full mx-4 text-center"
        >
          <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Return Request Submitted</h1>
          <p className="text-gray-600 mb-6">
            Your return request has been submitted successfully. We'll review it and get back to you within 1-2 business days.
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Exchange</h1>
          <p className="text-lg text-gray-600">
            We accept returns within 7 days of purchase for unworn items only
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-50 rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order SKU / ID
              </label>
              <input
                type="text"
                value={formData.orderSku}
                onChange={(e) => setFormData({...formData, orderSku: e.target.value})}
                placeholder="Enter your order SKU"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Return
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                required
              >
                <option value="">Select a reason</option>
                <option value="size">Wrong Size</option>
                <option value="defect">Product Defect</option>
                <option value="not-as-described">Not as Described</option>
                <option value="changed-mind">Changed Mind</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formData.reason === 'size' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Size (for exchange)
                </label>
                <select
                  value={formData.newSize}
                  onChange={(e) => setFormData({...formData, newSize: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select new size</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image (optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {formData.image ? (
                  <div>
                    <p className="text-sm text-gray-600">{formData.image.name}</p>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, image: null})}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">Upload image of the product</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-[#337AFF] hover:text-blue-700 text-sm font-medium"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Return Policy</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Returns accepted within 7 days of purchase</li>
                <li>• Items must be unworn and in original condition</li>
                <li>• Original packaging and tags must be included</li>
                <li>• Processing time: 1-2 business days</li>
                <li>• Refund processed within 3-5 business days after approval</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-[#337AFF] transition-colors"
            >
              Submit Return Request
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Returns;