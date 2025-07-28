import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites';
import SKUVerification from './pages/SKUVerification';
import Checkout from './pages/Checkout';
import Returns from './pages/Returns';
import PreOrder from './pages/PreOrder';
import Account from './pages/Account';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen relative">
          {/* Epic Background Elements */}
          <div className="epic-bg-shape epic-bg-shape-1"></div>
          <div className="epic-bg-shape epic-bg-shape-2"></div>
          <div className="epic-bg-shape epic-bg-shape-3"></div>
          
          <Navbar />
          <CartDrawer />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/verify" element={<SKUVerification />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/preorder" element={<PreOrder />} />
              <Route path="/account" element={<Account />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;