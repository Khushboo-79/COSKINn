import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { NotificationProvider } from './context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import PLP from './pages/PLP';
import PDP from './pages/PDP';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Quiz from './pages/Quiz';
import RoutineResult from './pages/RoutineResult';
import Journal from './pages/Journal';
import { Shipping, Returns, FAQ, TrackOrder } from './pages/SupportPages';
import CartDrawer from './components/cart/CartDrawer';
import GuestReminder from './components/layout/GuestReminder';
import Login from './pages/auth/Login';
import OTPVerification from './pages/auth/OTPVerification';
import ProfileSetup from './pages/auth/ProfileSetup';
import ScrollToTop from './components/layout/ScrollToTop';
import NotFound from './pages/NotFound';

// Layout with Header & Footer
const MainLayout = () => {
  const { mode } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen relative ${mode === 'glam' ? 'glam-typography bg-[#faf9f6]' : 'bg-[#fcfaf9]'}`}>
      <TopBar />
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <GuestReminder />
      <CartDrawer />
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CurrencyProvider>
          <NotificationProvider>
            <CartProvider>
              <WishlistProvider>
              <Router>
                <ScrollToTop />
                <Routes>
                  {/* Full Screen Routes (No Header/Footer) */}
                  <Route path="/splash" element={<Splash />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/verify-otp" element={<OTPVerification />} />
                  <Route path="/profile-setup" element={<ProfileSetup />} />

                  {/* Main Layout Routes */}
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/collections" element={<PLP />} />
                    <Route path="/collections/:category" element={<PLP />} />
                    <Route path="/product/:id" element={<PDP />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="shop" element={<PLP />} />
                    <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                    <Route path="routine-result" element={<RoutineResult />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/quiz/result" element={<RoutineResult />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </NotificationProvider>
      </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
