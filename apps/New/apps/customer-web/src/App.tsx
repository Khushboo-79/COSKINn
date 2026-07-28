import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
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
import CartDrawer from './components/cart/CartDrawer';

// Layout with Header & Footer
const MainLayout = () => {
  const { mode } = useTheme();

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
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
      <CartDrawer />
    </div>
  );
};

import Login from './pages/auth/Login';
import OTPVerification from './pages/auth/OTPVerification';
import ProfileSetup from './pages/auth/ProfileSetup';


function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
          <Router>
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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/result" element={<RoutineResult />} />
          </Route>
        </Routes>
          </Router>
        </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
