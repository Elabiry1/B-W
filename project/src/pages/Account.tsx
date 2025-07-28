import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Package, Heart, Edit2, LogOut, Eye, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { products } from '../data/mockData';

const Account: React.FC = () => {
  const { favorites } = useApp();
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  };

  // Mock orders data
  const orders = [
    {
      id: 'BW001234',
      date: '2024-12-15',
      status: 'Delivered',
      total: 85.00,
      items: ['Essential Black Tee']
    },
    {
      id: 'BW001235',
      date: '2024-12-20',
      status: 'Shipped',
      total: 85.00,
      items: ['Pure White Tee']
    },
    {
      id: 'BW001236',
      date: '2024-12-18',
      status: 'Processing',
      total: 170.00,
      items: ['Essential Black Tee', 'Pure White Tee']
    }
  ];

  // Get favorite products
  const favoriteProducts = products.filter(p => favorites.isFavorite(p.id)).slice(0, 4);

  const handleEdit = (section: string) => {
    setIsEditing(section);
    // In a real app, this would open an edit modal or form
    console.log(`Editing ${section}`);
  };

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log('Logging out...');
    window.location.href = '/';
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would handle account deletion
      console.log('Deleting account...');
      window.location.href = '/';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                onClick={() => handleEdit('profile-image')}
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors"
              >
                <Edit2 size={14} className="text-gray-600" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <button
                  onClick={() => handleEdit('name')}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <Edit2 size={16} className="text-gray-500" />
                </button>
              </div>
              <p className="text-gray-600">Member since January 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Account Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Email Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
              <button
                onClick={() => handleEdit('email')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit2 size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-gray-400" />
              <span className="text-gray-700">{user.email}</span>
            </div>
            <button
              onClick={() => handleEdit('password')}
              className="mt-3 text-sm text-blue-600 hover:text-[#337AFF] transition-colors"
            >
              Change Password
            </button>
          </motion.div>

          {/* Phone Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Phone Number</h3>
              <button
                onClick={() => handleEdit('phone')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit2 size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-gray-400" />
              <span className="text-gray-700">{user.phone}</span>
            </div>
          </motion.div>
        </div>

        {/* Shipping Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
            <button
              onClick={() => handleEdit('address')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin size={20} className="text-gray-400 mt-0.5" />
            <span className="text-gray-700">{user.address}</span>
          </div>
        </motion.div>

        {/* Orders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Package size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date} • ${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.items.join(', ')}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-[#337AFF] transition-colors">
                    <Eye size={16} />
                    <span className="text-sm">View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Favorites Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Heart size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Favorites</h3>
            </div>
            {favoriteProducts.length > 0 && (
              <button
                onClick={() => window.location.href = '/favorites'}
                className="text-blue-600 hover:text-[#337AFF] text-sm font-medium transition-colors"
              >
                View All
              </button>
            )}
          </div>
          
          {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">No favorites yet</p>
              <button
                onClick={() => window.location.href = '/products'}
                className="mt-2 text-blue-600 hover:text-[#337AFF] text-sm font-medium transition-colors"
              >
                Browse Products
              </button>
            </div>
          )}
        </motion.div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-3"
        >
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-[#337AFF] transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-50 text-red-600 py-3 px-4 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-2 border border-red-200"
          >
            <Trash2 size={20} />
            <span>Delete Account</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;