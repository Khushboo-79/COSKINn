
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import PLP from './pages/PLP';

// Layout with Header & Footer
const MainLayout = () => (
  <div className="flex flex-col min-h-screen relative">
    <TopBar />
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

import Login from './pages/auth/Login';
import OTPVerification from './pages/auth/OTPVerification';
import ProfileSetup from './pages/auth/ProfileSetup';


function App() {
  return (
    <ThemeProvider>
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
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
