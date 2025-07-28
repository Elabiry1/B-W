import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const Checkout: React.FC = () => {
  const { cart } = useApp();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedSKU, setGeneratedSKU] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    // Simulate payment processing
    setTimeout(() => {
      const sku = `BW${Date.now().toString().slice(-6)}`;
      setGeneratedSKU(sku);
      setOrderComplete(true);
      cart.clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full mx-4 text-center"
        >
          <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Your SKU:</h3>
            <p className="text-2xl font-bold text-black">{generatedSKU}</p>
            <p className="text-sm text-gray-600 mt-2">
              Save this SKU for verification and support
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-[#337AFF] transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.location.href = '/verify'}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Verify Your Purchase
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
          <div className="flex justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-black' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span>Shipping</span>
            </div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-black' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span>Payment</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-[#337AFF] transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Payment Method</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentMethod === 'card' 
                        ? 'border-black bg-black text-white shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-white' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'card' && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      <CreditCard size={24} className={paymentMethod === 'card' ? 'text-white' : 'text-gray-600'} />
                      <div className="flex-1">
                        <span className="font-semibold">Credit/Debit Card</span>
                        <p className={`text-sm ${paymentMethod === 'card' ? 'text-gray-200' : 'text-gray-500'}`}>
                          Visa, Mastercard, Amex
                        </p>
                      </div>
                    </label>
                    <label className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentMethod === 'cod' 
                        ? 'border-black bg-black text-white shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-white' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'cod' && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      <Truck size={24} className={paymentMethod === 'cod' ? 'text-white' : 'text-gray-600'} />
                      <div className="flex-1">
                        <span className="font-semibold">Cash on Delivery</span>
                        <p className={`text-sm ${paymentMethod === 'cod' ? 'text-gray-200' : 'text-gray-500'}`}>
                          Pay when you receive
                        </p>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Details</h3>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-lg font-mono tracking-wider"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-center font-mono"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-center font-mono"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                      
                      {/* Security badges */}
                      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>SSL Secured</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>256-bit Encryption</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex space-x-4 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      className="flex-1 bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-xl font-semibold hover:from-[#337AFF] hover:to-blue-600 transition-all duration-300 shadow-lg"
                    >
                      Complete Order
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 rounded-lg p-6 h-fit"
          >
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;