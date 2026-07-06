import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/common/Navbar';
import CartDrawer from './components/cart/CartDrawer';
import SkincarePage from './pages/SkincarePage';
import CosmeticsPage from './pages/CosmeticsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RoutinePage from './pages/RoutinePage';
import JournalPage from './pages/JournalPage';
import AccountPage from './pages/AccountPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <div className="relative min-h-screen flex flex-col">
                <Navbar />
                <CartDrawer />
                <div className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/skincare" replace />} />
              <Route path="/skincare" element={<SkincarePage />} />
              <Route path="/cosmetics" element={<CosmeticsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/routine" element={<RoutinePage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
