import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/common/Navbar';
import CartDrawer from './components/cart/CartDrawer';

// Lazy load all pages for code splitting and faster initial load
const SkincarePage = React.lazy(() => import('./pages/SkincarePage'));
const CosmeticsPage = React.lazy(() => import('./pages/CosmeticsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const RoutinePage = React.lazy(() => import('./pages/RoutinePage'));
const JournalPage = React.lazy(() => import('./pages/JournalPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const NewArrivalsPage = React.lazy(() => import('./pages/NewArrivalsPage'));
const BestSellersPage = React.lazy(() => import('./pages/BestSellersPage'));
const AwardWinnersPage = React.lazy(() => import('./pages/AwardWinnersPage'));
const GiftSetsPage = React.lazy(() => import('./pages/GiftSetsPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const ProductDetailsPage = React.lazy(() => import('./pages/ProductDetailsPage'));
const OrderTrackingPage = React.lazy(() => import('./pages/OrderTrackingPage'));
const CleanserPage = React.lazy(() => import('./pages/CleanserPage'));

const GlobalLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-black/10 border-t-theme-primary animate-spin mb-4"></div>
    <p className="font-heading font-bold text-sm text-black uppercase tracking-widest">Loading COSKINn</p>
  </div>
);

const MainLayout = () => {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  return (
    <div className="relative min-h-screen flex flex-col">
      {!isCheckout && <Navbar />}
      {!isCheckout && <CartDrawer />}
      <div className="flex-1">
        <Suspense fallback={<GlobalLoader />}>
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
            <Route path="/best-sellers" element={<BestSellersPage />} />
            <Route path="/award-winners" element={<AwardWinnersPage />} />
            <Route path="/gift-sets" element={<GiftSetsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/order/:orderId" element={<OrderTrackingPage />} />
            <Route path="/skincare/cleansers" element={<CleanserPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <BrowserRouter>
                <MainLayout />
              </BrowserRouter>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
