import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { downloadInvoice } from '../utils/downloadInvoice';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Heart, MapPin, Settings, Shield, LogOut, ChevronRight, Edit2, Plus, Trash2, CheckCircle2, Mail, X, AlertCircle, Camera, MessageSquare, Bell, Eye, CreditCard, Globe, HelpCircle, ChevronDown, Check, Laptop, Key, Smartphone, Wallet, Gift, Share2, Award, Crown, Tag, Download, Copy, ArrowUpRight, ArrowDownLeft, History, Clock, Send, Ghost, Bookmark, Briefcase, MessageCircle } from 'lucide-react';
import CancelOrderModal from '../components/orders/CancelOrderModal';
import NeedHelpModal from '../components/orders/NeedHelpModal';
import ReturnReplaceModal from '../components/orders/ReturnReplaceModal';
import { skincareProducts } from '../constants/skincareProducts';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { orders } = useOrders();
  const { wishlistCount, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic Dashboard Calculations
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const rewardPoints = Math.floor(totalSpent * 10);
  
  let skincareSpent = 0;
  let cosmeticsSpent = 0;
  
  orders.forEach(order => {
    order.items?.forEach(item => {
      const isCosmetic = cosmeticsProducts.some(p => p.id === item.id) || item.category === 'Cosmetics' || item.type === 'Cosmetics' || (item.name && item.name.toLowerCase().includes('lipstick')) || (item.name && item.name.toLowerCase().includes('mascara'));
      if (isCosmetic) {
        cosmeticsSpent += ((item.price || 0) * (item.quantity || 1));
      } else {
        skincareSpent += ((item.price || 0) * (item.quantity || 1));
      }
    });
  });

  const skincarePoints = Math.floor(skincareSpent * 10);
  const cosmeticsPoints = Math.floor(cosmeticsSpent * 10);

  const calculateMembership = (points) => {
    if (points === 0) return null;
    const since = new Date().getFullYear();
    if (points >= 5000) return { tier: 'Diamond', nextTier: 'Max Tier', pointsForNextTier: 0, tierProgress: 100, points, since };
    if (points >= 3000) return { tier: 'Platinum', nextTier: 'Diamond', pointsForNextTier: 5000 - points, tierProgress: ((points - 3000) / 2000) * 100, points, since };
    if (points >= 1000) return { tier: 'Gold', nextTier: 'Platinum', pointsForNextTier: 3000 - points, tierProgress: ((points - 1000) / 2000) * 100, points, since };
    if (points >= 500) return { tier: 'Silver', nextTier: 'Gold', pointsForNextTier: 1000 - points, tierProgress: ((points - 500) / 500) * 100, points, since };
    return { tier: 'Bronze', nextTier: 'Silver', pointsForNextTier: 500 - points, tierProgress: (points / 500) * 100, points, since };
  };

  const computedSkincareMembership = calculateMembership(skincarePoints);
  const computedCosmeticsMembership = calculateMembership(cosmeticsPoints);

  // Read explicit memberships from localStorage
  const explicitMemberships = JSON.parse(localStorage.getItem('coskinn_memberships') || '{}');
  const userEmail = user?.email || 'guest';
  const userMemberships = explicitMemberships[userEmail] || {};

  const skincareMembership = userMemberships['skincare'] 
    ? { ...userMemberships['skincare'], points: skincarePoints + (userMemberships['skincare'].points || 0), pointsForNextTier: 0, nextTier: 'Max Tier', tierProgress: 100, isExplicit: true } 
    : computedSkincareMembership;
  
  const cosmeticsMembership = userMemberships['cosmetics'] 
    ? { ...userMemberships['cosmetics'], points: cosmeticsPoints + (userMemberships['cosmetics'].points || 0), pointsForNextTier: 0, nextTier: 'Max Tier', tierProgress: 100, isExplicit: true } 
    : computedCosmeticsMembership;

  // Fallback generic membership for the rest of the dashboard
  let membershipTier = skincareMembership?.tier || cosmeticsMembership?.tier || 'Bronze';
  let nextTier = skincareMembership?.nextTier || cosmeticsMembership?.nextTier || 'Silver';
  let pointsForNextTier = skincareMembership?.pointsForNextTier || cosmeticsMembership?.pointsForNextTier || (500 - rewardPoints);
  let tierProgress = skincareMembership?.tierProgress || cosmeticsMembership?.tierProgress || (rewardPoints / 500) * 100;

  // Manage wallet locally since there's no backend context for it yet
  const [walletBalance] = useState(145.00); 

  const dynamicData = {
    ordersCount: orders.length,
    wishlistCount,
    walletBalance,
    rewardPoints,
    membershipTier,
    nextTier,
    pointsForNextTier,
    tierProgress,
    skincareMembership,
    cosmeticsMembership,
    activeCoupons: 3
  };

  const getTabFromPathname = (pathname) => {
    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart === 'account') {
      return 'menu'; // Landing list menu on mobile
    }
    return lastPart || 'profile';
  };

  const activeTab = getTabFromPathname(location.pathname);

  useEffect(() => {
    if (!user) {
      navigate(`/${theme}`);
      return;
    }
    
    // Redirect /account to /account/profile on desktop screens
    if (location.pathname === '/account' || location.pathname === '/account/') {
      if (window.innerWidth >= 1024) {
        navigate('/account/profile', { replace: true });
      }
    }
  }, [user, navigate, theme, location.pathname]);

  const handleTabChange = (tab) => {
    if (tab === 'menu') {
      navigate('/account');
    } else {
      navigate(`/account/${tab}`);
    }
  };

  if (!user) return null;

  // Theming
  const bgClass = "bg-transparent";
  const primaryClass = "bg-theme-primary text-white";
  const textPrimaryClass = "text-theme-primary";
  const ringPrimaryClass = "focus:ring-theme-primary";
  const borderPrimaryClass = "border-theme-primary";

  return (
    <div className={`min-h-screen ${bgClass} pt-32 pb-20 font-body relative overflow-hidden bg-[#FFF5F7]`}>
      
      {/* Soft Luxury Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FFF5F7] to-[#FFF0F5] opacity-80" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-gradient-to-br from-[#FFB6C1] to-[#FF6B6B] rounded-full blur-[120px] mix-blend-multiply opacity-30"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-[#FFC0CB] to-[#FF1493] rounded-full blur-[100px] mix-blend-multiply opacity-20"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Luxury Header */}
        <div className="mb-10 lg:mb-12 text-center lg:text-left">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-heading font-bold text-[#1B1B1B] mb-2 tracking-tight">
            Hello, {user.name.split(' ')[0]} ✨
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-600 text-sm md:text-base font-medium">
            Manage your beauty profile, rewards and orders.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Sidebar */}
          <div className={`w-full lg:w-[300px] flex-shrink-0 ${activeTab === 'menu' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white sticky top-32 flex flex-col gap-2">
              
              {/* User Mini Card */}
              <div className="flex items-center gap-4 p-4 mb-2 bg-white/50 rounded-2xl border border-white/80 shadow-sm">
                {user.avatarUrl ? (
                  <img loading="lazy" src={user.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-white" />
                ) : (
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] flex items-center justify-center text-lg font-bold text-white shadow-sm border-2 border-white`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#1B1B1B] text-base leading-tight truncate">{user.name}</h3>
                  <p className="text-xs font-medium text-gray-500 truncate">{user.email || 'No email added'}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-1">
                <SidebarItem icon={User} label="My Profile" id="profile" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Package} label="My Orders" id="orders" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Heart} label="Wishlist" id="wishlist" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={MapPin} label="Addresses" id="addresses" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={CreditCard} label="Wallet & Ledger" id="wallet" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Gift} label="Bonuses" id="bonuses" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Share2} label="Referrals" id="referrals" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Award} label="Reward Points" id="rewards" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Crown} label="Membership" id="membership" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Tag} label="Offers & Deals" id="offers" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={MessageSquare} label="My Reviews" id="reviews" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Bell} label="Notifications" id="notifications" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Settings} label="Settings" id="settings" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Shield} label="Security" id="security" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
              </nav>

            </div>
          </div>

          {/* Main Content Area */}
          <div className={`flex-1 min-w-0 ${activeTab === 'menu' ? 'hidden lg:block' : 'block'}`}>
            {/* Back Button for mobile */}
            {activeTab !== 'menu' && (
              <button 
                onClick={() => navigate('/account')}
                className="lg:hidden flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors font-bold text-sm tracking-wider uppercase font-sans"
              >
                <ChevronRight size={18} className="rotate-180 text-gray-400" /> Back to Account Menu
              </button>
            )}

            <AnimatePresence mode="wait">
              {activeTab === 'profile' && <ProfileTab key="profile" user={user} primaryClass={primaryClass} ringPrimaryClass={ringPrimaryClass} dynamicData={dynamicData} handleTabChange={handleTabChange} />}
              {activeTab === 'addresses' && <AddressesTab key="addresses" primaryClass={primaryClass} textPrimaryClass={textPrimaryClass} />}
              {activeTab === 'orders' && <OrdersTab key="orders" primaryClass={primaryClass} />}
              {activeTab === 'wishlist' && <WishlistTab key="wishlist" primaryClass={primaryClass} />}
              {activeTab === 'wallet' && <WalletTab key="wallet" dynamicData={dynamicData} />}
              {activeTab === 'bonuses' && <BonusesTab key="bonuses" />}
              {activeTab === 'referrals' && <ReferralTab key="referrals" />}
              {activeTab === 'rewards' && <RewardPointsTab key="rewards" dynamicData={dynamicData} />}
              {activeTab === 'membership' && <MembershipTab key="membership" dynamicData={dynamicData} />}
              {activeTab === 'offers' && <OffersTab key="offers" dynamicData={dynamicData} />}
              {activeTab === 'reviews' && <ReviewsTab key="reviews" primaryClass={primaryClass} />}
              {activeTab === 'notifications' && <NotificationsTab key="notifications" primaryClass={primaryClass} />}
              {activeTab === 'settings' && <SettingsTab key="settings" primaryClass={primaryClass} />}
              {activeTab === 'security' && <SecurityTab key="security" logout={logout} />}
            </AnimatePresence>

          </div>
        </div>

        {/* Recommended Products Section - Full Width */}
        {activeTab !== 'menu' && (
          <div className="mt-16 w-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-heading font-bold text-[#1B1B1B]">Recommended For You</h3>
              <Link to="/recommended" className="text-sm font-bold text-[#FF0069] hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
              {/* Dynamic Recommendations */}
              {[
                skincareProducts[0],
                cosmeticsProducts[1],
                skincareProducts[2],
                cosmeticsProducts[3]
              ].map((prod, i) => (
                <motion.div key={i} whileHover={{ y: -8 }} className="group relative bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm hover:shadow-[0_15px_40px_rgba(255,0,105,0.1)] overflow-hidden transition-all duration-500">
                  <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden">
                    <img src={prod.images?.[0] || prod.image || prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(prod); }} className={`absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-sm ${isInWishlist(prod.id) ? 'text-[#FF0069]' : 'text-gray-400 hover:text-[#FF0069]'}`}>
                      <Heart size={18} fill={isInWishlist(prod.id) ? 'currentColor' : 'none'} />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <button onClick={(e) => { e.preventDefault(); addToCart(prod); }} className="w-full py-3 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:opacity-95">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="font-bold text-[#1B1B1B] text-base mb-1 truncate">{prod.name}</h4>
                    <p className="font-medium text-[#FF0069]">${prod.price}.00</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// SIDEBAR ITEM
// ---------------------------------------------------------
function SidebarItem({ icon: Icon, label, id, activeTab, onClick }) {
  const isActive = activeTab === id;
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(id)}
      className={`relative w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 overflow-hidden ${
        isActive 
          ? 'bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white shadow-[0_8px_20px_rgba(255,0,105,0.25)] border border-transparent' 
          : 'bg-transparent text-gray-600 hover:bg-white/80 hover:text-[#FF0069] hover:shadow-[0_4px_15px_rgba(255,0,105,0.05)] border border-transparent hover:border-white/50'
      }`}
    >
      {isActive && (
        <motion.div layoutId="sidebar-active-bar" className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      )}
      <div className="flex items-center gap-3 relative z-10">
        <Icon size={18} className={isActive ? 'text-white drop-shadow-sm' : 'text-gray-400 group-hover:text-[#FF0069]'} />
        <span className={`font-semibold tracking-wide text-sm ${isActive ? 'text-white drop-shadow-sm' : ''}`}>{label}</span>
      </div>
      {isActive && <ChevronRight size={16} className="text-white relative z-10" />}
    </motion.button>
  );
}


// ---------------------------------------------------------
// TABS
// ---------------------------------------------------------

// 1. Profile Tab
function ProfileTab({ user, primaryClass, ringPrimaryClass, dynamicData, handleTabChange }) {
  const { updateUserProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: user.name || '',
    email: user.email || '',
    mobile: user.mobile || '',
    dob: '',
    gender: 'female'
  });
  
  const [beautyProfile, setBeautyProfile] = useState({
    skinType: 'Combination',
    goals: 'Anti-aging, Hydration',
    favCategory: 'Serums & Essences',
    favShade: 'Rosewood Blush'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [uploadError, setUploadError] = useState('');
  
  useEffect(() => {
    const saved = localStorage.getItem('coskinn_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile({ ...parsed, name: user.name, email: user.email, mobile: user.mobile });
    }
    const savedBeauty = localStorage.getItem('coskinn_beauty_profile');
    if (savedBeauty) {
      setBeautyProfile(JSON.parse(savedBeauty));
    }
  }, [user]);

  const handleSaveProfile = () => {
    localStorage.setItem('coskinn_profile', JSON.stringify({ dob: profile.dob, gender: profile.gender }));
    localStorage.setItem('coskinn_beauty_profile', JSON.stringify(beautyProfile));
    updateUserProfile({ name: profile.name, email: profile.email, mobile: profile.mobile });
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    setUploadError('');
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) { setUploadError('Unsupported format. Use JPG, PNG, WEBP.'); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError('Exceeds 5MB limit.'); return; }
    const reader = new FileReader();
    reader.onload = (event) => setPreviewAvatar(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleSaveAvatar = () => {
    if (previewAvatar) { updateUserProfile({ avatarUrl: previewAvatar }); setPreviewAvatar(null); }
  };
  
  const StatCard = ({ icon: Icon, title, value, gradient, onClick }) => (
    <motion.div onClick={onClick} whileHover={{ y: -5 }} className="bg-white/60 backdrop-blur-xl rounded-3xl p-5 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(255,0,105,0.1)] transition-all flex items-center gap-4 group cursor-pointer">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <p className="text-xl font-black text-[#1B1B1B]">{value}</p>
      </div>
    </motion.div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
      
      {/* Profile Overview Card (Apple Wallet Style) */}
      <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 border border-white shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF0069]/10 to-transparent rounded-full blur-3xl" />
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
          {/* Avatar Area */}
          <div className="relative group">
            {previewAvatar || user.avatarUrl ? (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-[6px] border-white shadow-xl">
                <img loading="lazy" src={previewAvatar || user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#FF0069] to-[#FF6B6B] flex items-center justify-center text-5xl font-black text-white shadow-xl border-[6px] border-white`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <label className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors text-[#FF0069]">
              <Camera size={18} />
              <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          
          {/* Main Info */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Crown size={14} /> {dynamicData?.membershipTier || 'Beauty'} Member
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1B1B1B] mb-2">{user.name}</h2>
            <p className="text-gray-500 font-medium">{user.email || 'No email added'}</p>
            
            {/* Quick Actions for Avatar */}
            {previewAvatar && (
              <div className="flex gap-3 mt-4">
                <button onClick={handleSaveAvatar} className="px-5 py-2 text-sm font-bold rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white shadow-md hover:-translate-y-0.5 transition-all">Save Photo</button>
                <button onClick={() => setPreviewAvatar(null)} className="px-5 py-2 text-sm font-bold rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              </div>
            )}
            {uploadError && <p className="text-xs font-medium text-red-500 mt-2">{uploadError}</p>}
          </div>

          {/* Beauty Progress */}
          <div className="w-full md:w-64 bg-white/50 rounded-2xl p-5 border border-white shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Next Tier: {dynamicData?.nextTier}</span>
              <span className="text-[#FF0069] font-black text-lg">{dynamicData?.rewardPoints.toLocaleString()} <span className="text-xs text-gray-400 font-medium">pts</span></span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${dynamicData?.tierProgress}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-gradient-to-r from-[#FF0069] to-[#FF6B6B]" />
            </div>
            <p className="text-[10px] text-gray-400 font-medium mt-2 text-right">
              {dynamicData?.pointsForNextTier > 0 ? `${dynamicData?.pointsForNextTier} pts away from upgrade` : 'Maximum tier reached!'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        <StatCard icon={Package} title="Orders" value={dynamicData?.ordersCount || 0} gradient="from-blue-400 to-blue-600" onClick={() => handleTabChange('orders')} />
        <StatCard icon={Heart} title="Wishlist" value={dynamicData?.wishlistCount || 0} gradient="from-pink-400 to-[#FF0069]" onClick={() => handleTabChange('wishlist')} />
        <StatCard icon={Wallet} title="Wallet" value={`$${(dynamicData?.walletBalance || 0).toFixed(2)}`} gradient="from-emerald-400 to-emerald-600" onClick={() => handleTabChange('wallet')} />
        <StatCard icon={Award} title="Points" value={(dynamicData?.rewardPoints || 0).toLocaleString()} gradient="from-purple-400 to-purple-600" onClick={() => handleTabChange('rewards')} />
        <StatCard icon={Tag} title="Coupons" value={`${dynamicData?.activeCoupons || 0} Active`} gradient="from-orange-400 to-orange-600" onClick={() => handleTabChange('offers')} />
        <StatCard icon={Crown} title="Membership" value={dynamicData?.membershipTier || 'Bronze'} gradient="from-yellow-400 to-yellow-600" onClick={() => handleTabChange('membership')} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-heading font-bold text-[#1B1B1B]">Personal Info</h3>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF0069] hover:bg-[#FF0069] hover:text-white transition-colors border border-gray-100">
                <Edit2 size={16} />
              </button>
            )}
          </div>
          
          <div className="space-y-5 flex-1">
            {[
              { label: "Full Name", key: "name", type: "text" },
              { label: "Email Address", key: "email", type: "email" },
              { label: "Mobile Number", key: "mobile", type: "tel" },
              { label: "Date of Birth", key: "dob", type: "date" }
            ].map(field => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{field.label}</label>
                <input 
                  type={field.type} 
                  disabled={!isEditing} 
                  value={profile[field.key]} 
                  onChange={(e) => setProfile({...profile, [field.key]: e.target.value})} 
                  className={`w-full py-3 px-4 border rounded-xl outline-none font-semibold transition-all ${isEditing ? 'bg-white border-[#FF0069]/30 focus:border-[#FF0069] focus:ring-2 focus:ring-[#FF0069]/20 shadow-inner' : 'border-transparent bg-white/50 text-gray-800'}`} 
                />
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</label>
              <select disabled={!isEditing} value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value})} className={`w-full py-3 px-4 border rounded-xl outline-none font-semibold transition-all ${isEditing ? 'bg-white border-[#FF0069]/30 focus:border-[#FF0069] focus:ring-2 focus:ring-[#FF0069]/20 shadow-inner' : 'border-transparent bg-white/50 text-gray-800 appearance-none'}`}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Beauty Profile */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-heading font-bold text-[#1B1B1B]">Beauty Profile</h3>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF0069] hover:bg-[#FF0069] hover:text-white transition-colors border border-gray-100">
                <Edit2 size={16} />
              </button>
            )}
          </div>
          
          <div className="space-y-5 flex-1">
            {[
              { label: "Skin Type", key: "skinType", options: ["Dry", "Oily", "Combination", "Sensitive", "Normal"] },
              { label: "Beauty Goals", key: "goals", type: "text" },
              { label: "Favorite Category", key: "favCategory", type: "text" },
              { label: "Signature Shade", key: "favShade", type: "text" }
            ].map(field => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{field.label}</label>
                {field.options ? (
                  <select disabled={!isEditing} value={beautyProfile[field.key]} onChange={(e) => setBeautyProfile({...beautyProfile, [field.key]: e.target.value})} className={`w-full py-3 px-4 border rounded-xl outline-none font-semibold transition-all ${isEditing ? 'bg-white border-[#FF0069]/30 focus:border-[#FF0069] focus:ring-2 focus:ring-[#FF0069]/20 shadow-inner' : 'border-transparent bg-white/50 text-gray-800 appearance-none'}`}>
                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input 
                    type="text" 
                    disabled={!isEditing} 
                    value={beautyProfile[field.key]} 
                    onChange={(e) => setBeautyProfile({...beautyProfile, [field.key]: e.target.value})} 
                    className={`w-full py-3 px-4 border rounded-xl outline-none font-semibold transition-all ${isEditing ? 'bg-white border-[#FF0069]/30 focus:border-[#FF0069] focus:ring-2 focus:ring-[#FF0069]/20 shadow-inner' : 'border-transparent bg-white/50 text-gray-800'}`} 
                  />
                )}
              </div>
            ))}
            
            {!isEditing && (
               <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-white border border-pink-100">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-full bg-[#FF0069]/10 text-[#FF0069] flex items-center justify-center">
                     <Heart size={14} />
                   </div>
                   <p className="font-bold text-sm text-gray-800">Routine Match: 94%</p>
                 </div>
                 <p className="text-xs text-gray-500 font-medium">Your profile is perfectly optimized for tailored recommendations.</p>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end gap-4 mt-2">
          <button onClick={() => setIsEditing(false)} className="px-8 py-3.5 font-bold rounded-2xl bg-white text-gray-600 hover:text-black hover:shadow-sm border border-gray-200 transition-all">Cancel</button>
          <button onClick={handleSaveProfile} className="px-10 py-3.5 rounded-2xl font-black bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:shadow-[0_8px_25px_rgba(255,0,105,0.3)] hover:-translate-y-1 text-white transition-all">Save All Changes</button>
        </motion.div>
      )}
    </motion.div>
  );
}

// 2. Addresses Tab
function AddressesTab({ primaryClass, textPrimaryClass }) {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  useEffect(() => {
    const saved = localStorage.getItem('coskinn_addresses');
    if (saved) setAddresses(JSON.parse(saved));
    else setAddresses([]); // Ensure empty state initially
  }, []);

  const handleSave = (addressData) => {
    let updatedAddresses = [...addresses];
    
    // If setting as default, remove default from others
    if (addressData.isDefault) {
      updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
    }

    if (editingAddress) {
      // Update
      updatedAddresses = updatedAddresses.map(a => a.id === editingAddress.id ? { ...addressData, id: a.id } : a);
    } else {
      // Add new
      // If it's the first address, automatically make it default
      const newAddress = { ...addressData, id: Date.now().toString() };
      if (updatedAddresses.length === 0) newAddress.isDefault = true;
      updatedAddresses.push(newAddress);
    }

    setAddresses(updatedAddresses);
    localStorage.setItem('coskinn_addresses', JSON.stringify(updatedAddresses));
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleDelete = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('coskinn_addresses', JSON.stringify(updated));
    setShowDeleteConfirm(null);
  };

  const openAddModal = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const openEditModal = (addr) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white gap-4">
        <div>
          <h2 className="text-2xl font-heading font-medium text-black">Saved Addresses</h2>
          <p className="text-gray-500 text-sm mt-1">Manage where your beauty essentials are delivered.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white shadow-sm transition-all flex-shrink-0">
          <Plus size={16} /> Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-pink-50/50 rounded-full flex items-center justify-center mb-4">
            <MapPin size={24} className="text-[#FF0069]" />
          </div>
          <h3 className="text-xl font-heading font-medium text-black mb-2">No address added yet</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">You haven't saved any delivery addresses. Add one now to speed up checkout.</p>
          <button onClick={openAddModal} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white shadow-sm transition-all">
            <Plus size={16} /> Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative group overflow-hidden flex flex-col h-full hover:border-[#FF0069]/30 transition-colors">
              {addr.isDefault && (
                <div className="absolute top-0 right-0 bg-[#FF0069]/10 px-4 py-1.5 rounded-bl-xl text-xs font-bold text-[#FF0069] z-10 font-sans">Default</div>
              )}
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-[#FF0069]" />
                <span className="font-bold text-black uppercase tracking-wider text-sm">{addr.type}</span>
              </div>
              <h4 className="font-bold text-lg text-black mb-1">{addr.name}</h4>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                {addr.house}, {addr.street}<br />
                {addr.landmark && <>{addr.landmark}<br /></>}
                {addr.city}, {addr.state} {addr.pin}<br />
                Mobile: {addr.phone}
                {addr.altPhone && <><br />Alt Mobile: {addr.altPhone}</>}
              </p>
              <div className="flex gap-4 pt-4 border-t border-gray-100 mt-auto">
                <button onClick={() => openEditModal(addr)} className="text-sm font-bold text-[#FF0069] hover:underline transition-colors flex items-center gap-1"><Edit2 size={14}/> Edit</button>
                <button onClick={() => setShowDeleteConfirm(addr.id)} className="text-sm font-bold text-red-500 hover:underline transition-colors flex items-center gap-1"><Trash2 size={14}/> Delete</button>
              </div>

              {/* Delete Confirmation Overlay */}
              <AnimatePresence>
                {showDeleteConfirm === addr.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center">
                    <Trash2 size={24} className="text-red-500 mb-2" />
                    <h4 className="font-bold text-black mb-1">Delete Address?</h4>
                    <p className="text-xs text-gray-500 mb-4">This action cannot be undone.</p>
                    <div className="flex gap-2 w-full">
                      <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-2 text-sm font-bold text-gray-600 bg-[#FF0069]/5 hover:bg-[#FF0069]/10 rounded-lg transition-colors">Cancel</button>
                      <button onClick={() => handleDelete(addr.id)} className="flex-1 py-2 text-sm font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      {/* Address Modal */}
      <AddressModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        initialData={editingAddress} 
        primaryClass={primaryClass} 
        textPrimaryClass={textPrimaryClass} 
      />
    </motion.div>
  );
}

// Address Modal Component
function AddressModal({ isOpen, onClose, onSave, initialData, primaryClass, textPrimaryClass }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    altPhone: '',
    house: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pin: '',
    country: 'India',
    type: 'Home',
    isDefault: false
  });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: '', phone: '', altPhone: '', house: '', street: '', landmark: '', city: '', state: '', pin: '', country: 'India', type: 'Home', isDefault: false
        });
      }
      setErrorMsg('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.house.trim() || !formData.street.trim() || !formData.city.trim() || !formData.state.trim() || !formData.pin.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (formData.pin.replace(/\D/g, '').length !== 6) {
      setErrorMsg('Please enter a valid 6-digit PIN code.');
      return;
    }

    onSave({ ...formData, phone: formData.phone.replace(/\D/g, ''), pin: formData.pin.replace(/\D/g, '') });
  };

  const inputClass = "w-full py-3 px-4 border border-gray-300 rounded-xl outline-none font-medium text-gray-900 focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] transition-all bg-transparent placeholder-gray-400";
  const labelClass = "absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500 z-10 transition-colors group-focus-within:text-[#FF0069]";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10 sticky top-0">
          <h3 className="text-xl font-heading font-medium text-black">{initialData ? 'Edit Address' : 'Add New Address'}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <label className={labelClass}>Full Name *</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Jane Doe" className={inputClass} autoFocus/>
              </div>
              <div className="relative group">
                <label className={labelClass}>Mobile Number *</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g,'').slice(0,10)})} placeholder="10-digit number" className={inputClass} />
              </div>
              <div className="relative group md:col-span-2">
                <label className={labelClass}>Alternate Mobile (Optional)</label>
                <input type="tel" value={formData.altPhone} onChange={e => setFormData({...formData, altPhone: e.target.value.replace(/\D/g,'').slice(0,10)})} placeholder="10-digit number" className={inputClass} />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Address Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group md:col-span-2">
                <label className={labelClass}>House / Flat / Apartment No. *</label>
                <input type="text" value={formData.house} onChange={e => setFormData({...formData, house: e.target.value})} placeholder="e.g. Flat 101, Luxury Towers" className={inputClass} />
              </div>
              <div className="relative group md:col-span-2">
                <label className={labelClass}>Street / Area *</label>
                <input type="text" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} placeholder="e.g. MG Road, Near Metro Station" className={inputClass} />
              </div>
              <div className="relative group">
                <label className={labelClass}>Landmark (Optional)</label>
                <input type="text" value={formData.landmark} onChange={e => setFormData({...formData, landmark: e.target.value})} placeholder="e.g. Behind City Mall" className={inputClass} />
              </div>
              <div className="relative group">
                <label className={labelClass}>PIN Code *</label>
                <input type="text" value={formData.pin} onChange={e => setFormData({...formData, pin: e.target.value.replace(/\D/g,'').slice(0,6)})} placeholder="6-digit PIN" className={inputClass} />
              </div>
              <div className="relative group">
                <label className={labelClass}>City *</label>
                <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="e.g. Mumbai" className={inputClass} />
              </div>
              <div className="relative group">
                <label className={labelClass}>State *</label>
                <input type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} placeholder="e.g. Maharashtra" className={inputClass} />
              </div>
              <div className="relative group md:col-span-2">
                <label className={labelClass}>Country</label>
                <input type="text" value={formData.country} disabled className="w-full py-3 px-4 border border-transparent rounded-xl outline-none font-medium bg-pink-50/20 text-gray-500 cursor-not-allowed" />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Preferences */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-3">Address Type</p>
                <div className="flex gap-3">
                  {['Home', 'Work', 'Other'].map(type => (
                    <button type="button" key={type} onClick={() => setFormData({...formData, type})} className={`px-5 py-2 rounded-full font-bold text-sm transition-all border ${formData.type === type ? 'border-[#FF0069] bg-[#FF0069]/10 text-[#FF0069]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer mt-2 group">
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${formData.isDefault ? 'border-[#FF0069] bg-[#FF0069]' : 'border-gray-300 group-hover:border-[#FF0069]'}`}>
                  {formData.isDefault && <CheckCircle2 size={14} className="text-white" />}
                </div>
                <input type="checkbox" checked={formData.isDefault} onChange={e => setFormData({...formData, isDefault: e.target.checked})} className="hidden" />
                <span className="font-medium text-gray-700">Set as Default Address</span>
              </label>
            </div>

            {errorMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mt-2 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Footer Buttons */}
            <div className="flex gap-4 pt-4 mt-2">
              <button type="button" onClick={onClose} className="flex-1 py-4 font-bold text-gray-600 bg-[#FF0069]/5 hover:bg-[#FF0069]/10 rounded-xl transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-4 font-bold rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white shadow-sm transition-all">
                {initialData ? 'Save Changes' : 'Save Address'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// 3. Orders Tab
function OrdersTab({ primaryClass }) {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isReturnReplaceModalOpen, setIsReturnReplaceModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('return'); // 'return' or 'replace'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCancelClick = (order) => {
    setSelectedOrder(order);
    setIsCancelModalOpen(true);
  };

  const handleCancelSuccess = (orderId) => {
    setIsCancelModalOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 font-sans">
      <h2 className="text-2xl font-heading font-medium text-black mb-6">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-pink-50/20 rounded-2xl border border-pink-100/30">
          <Package className="mx-auto w-16 h-16 text-[#FF0069]/30 mb-4" />
          <h3 className="text-xl font-heading font-medium text-black mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders. Start exploring our collections!</p>
          <button onClick={() => navigate('/skincare')} className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
        {orders.map(order => (
          <div key={order.id} className="flex flex-col xl:flex-row gap-6 p-6 border border-pink-100/30 hover:border-[#FF0069]/20 rounded-2xl transition-colors bg-white">
            
            {/* Items Images Stack */}
            <div className="flex gap-2 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 hide-scrollbar shrink-0">
              {order.items.map((item, idx) => (
                <div key={idx} className="w-24 h-24 bg-pink-50/10 rounded-xl overflow-hidden shrink-0 border border-pink-100/20 relative">
                  <img loading="lazy" src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-85" />
                  <div className="absolute bottom-1 right-1 bg-white/90 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-pink-100/30 text-[#FF0069]">
                    x{item.qty}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-black text-lg">Order {order.id}</h4>
                  <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full 
                    ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border border-green-100' : 
                      order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border border-red-100' :
                      order.status === 'Out For Delivery' || order.status === 'Shipped' ? 'bg-pink-50 text-[#FF0069] border border-pink-100/50' : 
                      'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                    {order.status === 'Cancelled' ? 'Refund Processing' : order.status}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-500 mb-4">
                  <p><span className="font-medium text-gray-700">Placed:</span> {order.date}</p>
                  <p><span className="font-medium text-gray-700">Total:</span> ₹{order.totalAmount} ({order.paymentMethod})</p>
                </div>
                {order.items.length === 1 && (
                  <p className="text-sm font-medium text-gray-800 mb-4 truncate">{order.items[0].name} - {order.items[0].variant}</p>
                )}
                {order.items.length > 1 && (
                  <p className="text-sm font-medium text-gray-800 mb-4">{order.items[0].name} and {order.items.length - 1} more item(s)</p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 xl:mt-0 pt-4 xl:pt-0 border-t border-gray-100 xl:border-none">
                {order.status === 'Cancelled' ? (
                  <>
                    <button 
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm"
                    >
                      Track Refund
                    </button>
                    <button className="px-5 py-2.5 text-sm font-bold rounded-xl text-gray-700 bg-[#FF0069]/5 border border-[#FF0069]/10 hover:bg-[#FF0069]/10 transition-colors">
                      Download Invoice
                    </button>
                    <button className="px-5 py-2.5 text-sm font-bold rounded-xl text-gray-700 bg-[#FF0069]/5 border border-[#FF0069]/10 hover:bg-[#FF0069]/10 transition-colors">
                      Need Help
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm"
                    >
                      Track Order
                    </button>
                    
                    {['Order Placed', 'Order Confirmed', 'Packed', 'Ready to Ship'].includes(order.status) && (
                      <button 
                        onClick={() => handleCancelClick(order)}
                        className="px-5 py-2.5 text-sm font-bold rounded-xl text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}

                    {['Shipped', 'Out For Delivery'].includes(order.status) && (
                      <button 
                        onClick={() => handleCancelClick(order)}
                        className="px-5 py-2.5 text-sm font-bold rounded-xl text-gray-400 bg-pink-50/10 border border-pink-100/10 cursor-not-allowed"
                        title="Cancellation not allowed after shipping"
                      >
                        Cancel Order
                      </button>
                    )}

                    {order.status === 'Delivered' && (
                      <div className="flex gap-3 font-sans">
                        <button 
                          onClick={() => { setSelectedOrder(order); setModalMode('return'); setIsReturnReplaceModalOpen(true); }}
                          className="px-5 py-2.5 text-sm font-bold rounded-xl text-[#FF0069] bg-pink-50 border border-pink-100 hover:bg-pink-100/50 transition-colors"
                        >
                          Return Product
                        </button>
                        <button 
                          onClick={() => { setSelectedOrder(order); setModalMode('replace'); setIsReturnReplaceModalOpen(true); }}
                          className="px-5 py-2.5 text-sm font-bold rounded-xl text-gray-700 bg-pink-50 border border-pink-100/50 hover:bg-pink-100/50 transition-colors"
                        >
                          Replace Product
                        </button>
                      </div>
                    )}

                    <button 
                      onClick={() => downloadInvoice(order)}
                      className="px-5 py-2.5 text-sm font-bold rounded-xl text-gray-700 bg-[#FF0069]/5 border border-[#FF0069]/10 hover:bg-[#FF0069]/10 transition-colors"
                    >
                      Invoice
                    </button>

                    <button 
                      onClick={() => { setSelectedOrder(order); setIsHelpModalOpen(true); }}
                      className="px-5 py-2.5 text-sm font-bold rounded-xl text-gray-700 bg-[#FF0069]/5 border border-[#FF0069]/10 hover:bg-[#FF0069]/10 transition-colors"
                    >
                      Need Help
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      <CancelOrderModal 
        isOpen={isCancelModalOpen} 
        onClose={() => setIsCancelModalOpen(false)} 
        order={selectedOrder}
        onCancelSuccess={() => setIsCancelModalOpen(false)}
      />

      <NeedHelpModal 
        isOpen={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)} 
        order={selectedOrder}
      />

      <ReturnReplaceModal 
        isOpen={isReturnReplaceModalOpen} 
        onClose={() => setIsReturnReplaceModalOpen(false)} 
        order={selectedOrder}
        mode={modalMode}
      />
    </motion.div>
  );
}

// 4. Wishlist Tab
function WishlistTab() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quickViewItem, setQuickViewItem] = useState(null);

  const handleMoveToCart = (item) => {
    addToCart({
      ...item,
      variant: item.variant || 'Standard'
    });
    toggleWishlist(item);
  };

  const handleBuyNow = (item) => {
    addToCart({
      ...item,
      variant: item.variant || 'Standard'
    });
    toggleWishlist(item);
    navigate('/checkout');
  };

  if (wishlist.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center font-sans">
        <div className="w-16 h-16 bg-pink-50/50 rounded-full flex items-center justify-center mb-4">
          <Heart size={24} className="text-[#FF0069]" />
        </div>
        <h3 className="text-xl font-heading font-medium text-black mb-2">No products in your Wishlist.</h3>
        <p className="text-gray-500 text-sm mb-6 max-w-sm font-sans">Save your favorite skincare and cosmetics items here to keep track of them.</p>
        <button onClick={() => navigate('/skincare')} className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm font-sans">
          Continue Shopping
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 font-sans">
      <h2 className="text-2xl font-heading font-medium text-black mb-6">My Wishlist ({wishlist.length})</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map(item => {
          const displayName = item.name.startsWith('COSKINn') ? item.name : `COSKINn ${item.name}`;
          return (
            <div key={item.id} className="border border-gray-100 rounded-2xl p-4 flex flex-col group hover:border-[#FF0069]/30 transition-colors relative bg-white font-sans">
              <button 
                onClick={() => toggleWishlist(item)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                title="Remove from Wishlist"
              >
                <Trash2 size={14} />
              </button>
              
              <div className="w-full h-48 bg-pink-50/20 rounded-xl overflow-hidden mb-4 relative cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                <img loading="lazy" src={item.image} alt={displayName} className="w-full h-full object-cover mix-blend-multiply opacity-85 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setQuickViewItem(item); }}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-[#FF0069] shadow transition-all hover:scale-115"
                    title="Quick View"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
              
              <h4 className="font-bold text-black text-sm truncate mb-1 cursor-pointer hover:text-[#FF0069] transition-colors" onClick={() => navigate(`/product/${item.id}`)}>
                {displayName}
              </h4>
              <p className="font-medium text-gray-500 text-sm mb-4">₹{item.price}</p>
              
              <div className="flex flex-col gap-2 mt-auto">
                <button 
                  onClick={() => handleMoveToCart(item)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm"
                >
                  Move to Cart
                </button>
                <button 
                  onClick={() => handleBuyNow(item)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-pink-50 text-[#FF0069] border border-pink-100 hover:bg-pink-100/50 transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewItem && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
              onClick={() => setQuickViewItem(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 overflow-hidden flex flex-col font-sans z-10"
            >
              <button 
                onClick={() => setQuickViewItem(null)} 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
              
              <div className="flex gap-6 items-start mt-4">
                <div className="w-1/3 aspect-square bg-pink-50/20 rounded-2xl overflow-hidden border border-pink-100/30 shrink-0">
                  <img src={quickViewItem.image} alt={quickViewItem.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-[#FF0069] uppercase tracking-wider">COSKINn Brand</span>
                  <h3 className="text-lg font-bold text-black mt-1 leading-tight truncate">
                    {quickViewItem.name.startsWith('COSKINn') ? quickViewItem.name : `COSKINn ${quickViewItem.name}`}
                  </h3>
                  <p className="text-xl font-bold text-black mt-2">₹{quickViewItem.price}</p>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                    {quickViewItem.description || "Premium formula crafted to elevate your daily beauty routine, leaving skin feeling healthy, nourished, and deeply protected."}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => { handleMoveToCart(quickViewItem); setQuickViewItem(null); }}
                  className="flex-1 py-3 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
                >
                  Move to Cart
                </button>
                <button 
                  onClick={() => { handleBuyNow(quickViewItem); setQuickViewItem(null); }}
                  className="flex-1 py-3 bg-pink-50 text-[#FF0069] hover:bg-pink-100/50 font-bold rounded-xl text-sm transition-all"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 5. Settings Tab
function SettingsTab() {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  // Settings navigation sub-section state
  const [subSection, setSubSection] = useState('account'); // 'account' | 'addresses' | 'security' | 'notifications' | 'privacy' | 'payment' | 'region' | 'preferences' | 'help'

  // Account Settings state
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileMobile, setProfileMobile] = useState(user?.mobile || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [previewPhoto, setPreviewPhoto] = useState(user?.avatarUrl || null);

  // Address Settings state
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('coskinn_addresses');
    return saved ? JSON.parse(saved) : [];
  });
  const [addressFormData, setAddressFormData] = useState({
    id: '', name: '', phone: '', house: '', street: '', city: '', state: '', pin: '', type: 'Home', isDefault: false
  });
  const [isAddrEditing, setIsAddrEditing] = useState(false);
  const [isAddrAdding, setIsAddrAdding] = useState(false);

  // Security Settings state
  const [devices, setDevices] = useState([
    { id: '1', name: 'iPhone 15 Pro - Mumbai, IN', status: 'Active Now' },
    { id: '2', name: 'MacBook Pro - Delhi, IN', status: 'Last active 2 hours ago' },
    { id: '3', name: 'Chrome Browser - Bangalore, IN', status: 'Last active 1 day ago' }
  ]);
  const [otpVerifyEnabled, setOtpVerifyEnabled] = useState(true);

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    deliveryUpdates: true,
    offersPromotions: true,
    wishlistAlerts: false,
    backInStock: true,
    reviewReminders: false,
    marketingEmails: false,
    smsNotifications: true,
    pushNotifications: true
  });

  // Privacy preferences state
  const [recommendationsEnabled, setRecommendationsEnabled] = useState(true);
  const [dataSharingEnabled, setDataSharingEnabled] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(true);

  // Payment settings state
  const [upis, setUpis] = useState(['reshma@okaxis', 'reshma.k@paytm']);
  const [cards, setCards] = useState([
    { id: '1', number: '4111 **** **** 9876', holder: 'Reshma Kushwaha', expiry: '12/29' }
  ]);
  const [banks, setBanks] = useState([
    { id: '1', name: 'HDFC Bank', accNo: '*****4321' }
  ]);
  const [preferredMethod, setPreferredMethod] = useState('upi');

  // Language & Region state
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('INR (₹)');
  const [region, setRegion] = useState('India');

  // App preferences state
  const [darkMode, setDarkMode] = useState(false);
  const [animationPref, setAnimationPref] = useState('Smooth');
  const [autoPlayVideos, setAutoPlayVideos] = useState(true);
  const [imageQuality, setImageQuality] = useState('High');
  const [rememberLogin, setRememberLogin] = useState(true);

  // Help support form state
  const [supportMsg, setSupportMsg] = useState({ subject: '', message: '' });
  const [faqOpen, setFaqOpen] = useState(null);

  // Save Account Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profileName.trim()) {
      alert('Name cannot be empty.');
      return;
    }
    updateUserProfile({
      name: profileName,
      mobile: profileMobile,
      email: profileEmail,
      avatarUrl: previewPhoto
    });
    alert('✓ Profile settings saved successfully.');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Address Handlers
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressFormData.name.trim() || !addressFormData.phone.trim() || !addressFormData.house.trim() || !addressFormData.street.trim() || !addressFormData.city.trim() || !addressFormData.state.trim() || !addressFormData.pin.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    let updated = [...addresses];
    if (addressFormData.isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: false }));
    }
    if (isAddrEditing) {
      updated = updated.map(a => a.id === addressFormData.id ? { ...addressFormData } : a);
    } else {
      const newAddr = { ...addressFormData, id: Date.now().toString() };
      if (updated.length === 0) newAddr.isDefault = true;
      updated.push(newAddr);
    }
    setAddresses(updated);
    localStorage.setItem('coskinn_addresses', JSON.stringify(updated));
    setIsAddrAdding(false);
    setIsAddrEditing(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('coskinn_addresses', JSON.stringify(updated));
  };

  // Revoke device session
  const handleRevokeDevice = (id) => {
    setDevices(prev => prev.filter(d => d.id !== id));
  };

  // Download Mock JSON Data
  const handleDownloadData = () => {
    const dataObj = {
      profile: { name: user?.name, email: user?.email, mobile: user?.mobile },
      addresses: addresses,
      upis: upis,
      cards: cards,
      banks: banks,
      preferences: { language, currency, region, darkMode }
    };
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coskinn_user_data_${user?.name?.replace(/\s+/g, '_') || 'account'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Payment mock add handlers
  const [newUpi, setNewUpi] = useState('');
  const [newCard, setNewCard] = useState({ number: '', holder: '', expiry: '' });
  const [newBank, setNewBank] = useState({ name: '', accNo: '' });

  const handleAddUpi = (e) => {
    e.preventDefault();
    if (!newUpi.trim() || !newUpi.includes('@')) {
      alert('Please enter a valid UPI ID (e.g. user@okaxis).');
      return;
    }
    setUpis(prev => [...prev, newUpi.trim()]);
    setNewUpi('');
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.number.replace(/\s+/g, '').length < 12 || !newCard.holder.trim() || !newCard.expiry.trim()) {
      alert('Please fill in complete card details.');
      return;
    }
    const masked = newCard.number.replace(/\d(?=\d{4})/g, '*') + ' **** **** ' + newCard.number.slice(-4);
    setCards(prev => [...prev, { id: Date.now().toString(), number: masked, holder: newCard.holder, expiry: newCard.expiry }]);
    setNewCard({ number: '', holder: '', expiry: '' });
  };

  const handleAddBank = (e) => {
    e.preventDefault();
    if (!newBank.name.trim() || newBank.accNo.length < 4) {
      alert('Please enter valid bank details.');
      return;
    }
    const accMasked = '*****' + newBank.accNo.slice(-4);
    setBanks(prev => [...prev, { id: Date.now().toString(), name: newBank.name, accNo: accMasked }]);
    setNewBank({ name: '', accNo: '' });
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportMsg.subject.trim() || !supportMsg.message.trim()) {
      alert('Please fill in both subject and message.');
      return;
    }
    alert('✓ Your support request has been received. Our team will contact you shortly.');
    setSupportMsg({ subject: '', message: '' });
  };

  const subSectionsList = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'addresses', label: 'Address Settings', icon: MapPin },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Data', icon: Key },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'region', label: 'Language & Region', icon: Globe },
    { id: 'preferences', label: 'App Preferences', icon: Settings },
    { id: 'help', label: 'FAQ & Help', icon: HelpCircle }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white font-sans flex flex-col md:flex-row gap-8 min-h-[500px]">
      
      {/* Category sub-navigation */}
      <div className="w-full md:w-[220px] flex-shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 gap-1 border-b md:border-b-0 md:border-r border-gray-100 pr-0 md:pr-4 scrollbar-thin">
        {subSectionsList.map(item => {
          const Icon = item.icon;
          const isSelected = subSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubSection(item.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all whitespace-nowrap text-sm text-left w-full ${isSelected ? 'bg-[#FF0069]/10 font-bold text-[#FF0069]' : 'text-gray-600 hover:bg-pink-50/30 hover:text-[#FF0069] font-medium'}`}
            >
              <Icon size={16} className={isSelected ? 'text-[#FF0069]' : 'text-gray-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main settings body */}
      <div className="flex-1 min-w-0">
        
        {/* ACCOUNT SETTINGS VIEW */}
        {subSection === 'account' && (
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-6 max-w-xl">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Profile Details</h3>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                {previewPhoto ? (
                  <img src={previewPhoto} alt="Preview" className="w-20 h-20 rounded-full object-cover border border-gray-200" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-2xl font-bold text-[#FF0069]">
                    {profileName.charAt(0).toUpperCase()}
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={18} className="text-white" />
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
              <div>
                <p className="text-sm font-bold text-black">Profile Picture</p>
                <p className="text-xs text-gray-500 mt-0.5">Hover and click to upload photo</p>
              </div>
            </div>

            <div className="relative group mt-2">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500">Full Name</label>
              <input 
                type="text" 
                value={profileName} 
                onChange={(e) => setProfileName(e.target.value)} 
                className="w-full py-3 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] transition-all bg-transparent font-medium" 
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500">Mobile Number</label>
              <input 
                type="text" 
                value={profileMobile} 
                onChange={(e) => setProfileMobile(e.target.value)} 
                className="w-full py-3 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] transition-all bg-transparent font-medium" 
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500">Email Address</label>
              <input 
                type="email" 
                value={profileEmail} 
                onChange={(e) => setProfileEmail(e.target.value)} 
                className="w-full py-3 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] transition-all bg-transparent font-medium" 
              />
            </div>

            <button type="submit" className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm mt-4">
              Save Changes
            </button>
          </form>
        )}

        {/* ADDRESS SETTINGS VIEW */}
        {subSection === 'addresses' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h3 className="text-xl font-heading font-medium text-black">Saved Addresses</h3>
              <button 
                onClick={() => {
                  setAddressFormData({ id: '', name: '', phone: '', house: '', street: '', city: '', state: '', pin: '', type: 'Home', isDefault: false });
                  setIsAddrEditing(false);
                  setIsAddrAdding(true);
                }} 
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF0069] hover:bg-[#FF0069]/90 text-white flex items-center gap-1 shadow-sm"
              >
                <Plus size={14} /> Add New
              </button>
            </div>

            {isAddrAdding || isAddrEditing ? (
              <form onSubmit={handleSaveAddress} className="flex flex-col gap-4 max-w-xl font-sans bg-pink-50/5 p-5 border border-pink-100/20 rounded-2xl">
                <h4 className="font-bold text-black text-sm">{isAddrEditing ? 'Edit Address' : 'New Address Details'}</h4>
                
                <input type="text" placeholder="Full Name" value={addressFormData.name} onChange={e => setAddressFormData({...addressFormData, name: e.target.value})} className="py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] text-sm" />
                <input type="text" placeholder="Phone Number" value={addressFormData.phone} onChange={e => setAddressFormData({...addressFormData, phone: e.target.value})} className="py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] text-sm" />
                
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="House/Flat No." value={addressFormData.house} onChange={e => setAddressFormData({...addressFormData, house: e.target.value})} className="py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] text-sm" />
                  <input type="text" placeholder="Street Name" value={addressFormData.street} onChange={e => setAddressFormData({...addressFormData, street: e.target.value})} className="py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] text-sm" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <input type="text" placeholder="City" value={addressFormData.city} onChange={e => setAddressFormData({...addressFormData, city: e.target.value})} className="py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] text-sm" />
                  <input type="text" placeholder="State" value={addressFormData.state} onChange={e => setAddressFormData({...addressFormData, state: e.target.value})} className="py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] text-sm" />
                  <input type="text" placeholder="PIN Code" value={addressFormData.pin} onChange={e => setAddressFormData({...addressFormData, pin: e.target.value})} className="py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] text-sm" />
                </div>

                <div className="flex gap-4 items-center">
                  <label className="text-xs font-semibold text-gray-500">Address Type:</label>
                  {['Home', 'Office'].map(type => (
                    <label key={type} className="flex items-center gap-1 text-sm font-semibold cursor-pointer text-gray-700">
                      <input type="radio" name="addr-type" checked={addressFormData.type === type} onChange={() => setAddressFormData({...addressFormData, type})} className="accent-[#FF0069]" />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>

                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input type="checkbox" checked={addressFormData.isDefault} onChange={e => setAddressFormData({...addressFormData, isDefault: e.target.checked})} className="w-4 h-4 accent-[#FF0069]" />
                  <span className="text-xs font-semibold text-gray-600">Set as Default Address</span>
                </label>

                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => { setIsAddrAdding(false); setIsAddrEditing(false); }} className="flex-1 py-2 text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] rounded-xl shadow-sm hover:opacity-95">Save Address</button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {addresses.length === 0 ? (
                  <p className="text-sm text-gray-500 font-sans py-4">No saved addresses found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map(addr => (
                      <div key={addr.id} className="border border-pink-100/30 bg-pink-50/5 p-4 rounded-2xl flex flex-col justify-between relative group hover:border-[#FF0069]/30 transition-colors">
                        {addr.isDefault && <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#FF0069]/10 text-[10px] font-bold text-[#FF0069] rounded-md font-sans">Default</span>}
                        <div>
                          <p className="font-bold text-black text-sm uppercase tracking-wider mb-2 flex items-center gap-1"><MapPin size={12} className="text-[#FF0069]"/> {addr.type}</p>
                          <p className="font-bold text-sm text-black mb-1">{addr.name}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {addr.house}, {addr.street}<br/>
                            {addr.city}, {addr.state} {addr.pin}
                          </p>
                        </div>
                        <div className="flex gap-3 pt-3 mt-4 border-t border-gray-50 text-xs">
                          <button onClick={() => { setAddressFormData(addr); setIsAddrEditing(true); }} className="font-bold text-[#FF0069] hover:underline">Edit</button>
                          <button onClick={() => handleDeleteAddress(addr.id)} className="font-bold text-red-500 hover:underline">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SECURITY & ACCESS VIEW */}
        {subSection === 'security' && (
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Security Control Panel</h3>

            <div className="flex items-center justify-between p-4 border border-pink-100/30 rounded-2xl bg-pink-50/5">
              <div>
                <p className="text-sm font-bold text-black">OTP Login Verification Settings</p>
                <p className="text-xs text-gray-500 mt-0.5">Toggle multi-factor OTP checks during customer sign-in.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={otpVerifyEnabled} onChange={(e) => setOtpVerifyEnabled(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div>
              <p className="text-sm font-bold text-black mb-3">Logged In Devices & Active Sessions</p>
              <div className="flex flex-col gap-3">
                {devices.map(dev => (
                  <div key={dev.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl hover:border-pink-100/30 transition-colors">
                    <div className="flex items-center gap-3">
                      {dev.name.includes('iPhone') ? <Smartphone size={16} className="text-gray-400" /> : <Laptop size={16} className="text-gray-400" />}
                      <div>
                        <p className="text-xs font-bold text-black">{dev.name}</p>
                        <p className="text-[10px] text-[#FF0069] font-medium mt-0.5">{dev.status}</p>
                      </div>
                    </div>
                    {dev.status !== 'Active Now' && (
                      <button onClick={() => handleRevokeDevice(dev.id)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-[10px] font-bold">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-2">
              <button onClick={() => { setDevices([{ id: '1', name: 'iPhone 15 Pro - Mumbai, IN', status: 'Active Now' }]); alert('✓ Successfully logged out from all other devices.'); }} className="py-3 px-6 rounded-xl font-bold border border-[#FF0069] text-[#FF0069] hover:bg-[#FF0069]/5 text-sm transition-colors">
                Logout from All Devices
              </button>
              <button onClick={() => navigate('/account/security')} className="py-3 px-6 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white text-sm shadow-sm transition-all">
                Delete My Account
              </button>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS PREFERENCES VIEW */}
        {subSection === 'notifications' && (
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Notification Settings</h3>
            <p className="text-xs text-gray-500 -mt-2">Customize how and when you receive notifications from COSKINn.</p>
            
            <div className="flex flex-col gap-4">
              {Object.keys(notifications).map((key) => {
                const labelText = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());
                
                return (
                  <div key={key} className="flex justify-between items-center p-3 border border-pink-100/10 rounded-xl bg-pink-50/5">
                    <span className="text-sm font-semibold text-gray-700">{labelText}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications[key]} 
                        onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
                    </label>
                  </div>
                );
              })}
            </div>
            
            <button onClick={() => alert('✓ Notification preferences saved.')} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-bold text-sm shadow-sm hover:opacity-95 transition-all mt-2">
              Save Preferences
            </button>
          </div>
        )}

        {/* PRIVACY & DATA VIEW */}
        {subSection === 'privacy' && (
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Privacy & Data Control</h3>

            <div className="flex items-center justify-between p-4 border border-pink-100/30 rounded-2xl bg-pink-50/5">
              <div>
                <p className="text-sm font-bold text-black">Personalized Recommendations</p>
                <p className="text-xs text-gray-500 mt-0.5">Allow tracking of skincare preferences to show tailored matches.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={recommendationsEnabled} onChange={(e) => setRecommendationsEnabled(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-pink-100/30 rounded-2xl bg-pink-50/5">
              <div>
                <p className="text-sm font-bold text-black">Share Profile Analytics</p>
                <p className="text-xs text-gray-500 mt-0.5">Share usage insights with partners to improve cosmetics formulations.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={dataSharingEnabled} onChange={(e) => setDataSharingEnabled(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-pink-100/30 rounded-2xl bg-pink-50/5">
              <div>
                <p className="text-sm font-bold text-black">Marketing Cookies & Scripts</p>
                <p className="text-xs text-gray-500 mt-0.5">Toggle tracking scripts and browser pixel storage.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={cookiesAccepted} onChange={(e) => setCookiesAccepted(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div className="border border-pink-100 bg-pink-50/20 rounded-2xl p-5 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm font-bold text-black">Download My Data Package</p>
                <p className="text-xs text-gray-500 mt-0.5">Download a detailed copy of all settings, profiles, and saved details in JSON format.</p>
              </div>
              <button 
                type="button" 
                onClick={handleDownloadData}
                className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0"
              >
                <Download size={14} /> Download Data
              </button>
            </div>
          </div>
        )}

        {/* PAYMENT METHODS VIEW */}
        {subSection === 'payment' && (
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Saved Payment Methods</h3>

            <div>
              <p className="text-sm font-bold text-black mb-3">Saved UPI IDs</p>
              <div className="flex flex-col gap-2 mb-4">
                {upis.map((upi, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl">
                    <span className="text-xs font-bold text-black">{upi}</span>
                    <button onClick={() => setUpis(prev => prev.filter((_, i) => i !== index))} className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddUpi} className="flex gap-2">
                <input type="text" placeholder="Enter UPI ID (e.g. user@okhdfc)" value={newUpi} onChange={e => setNewUpi(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:border-[#FF0069]" />
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF0069] hover:bg-[#FF0069]/90 text-white shadow-sm">Add UPI</button>
              </form>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm font-bold text-black mb-3">Saved Cards</p>
              <div className="flex flex-col gap-3 mb-4">
                {cards.map(c => (
                  <div key={c.id} className="p-4 border border-gray-100 rounded-xl relative">
                    <button onClick={() => setCards(prev => prev.filter(card => card.id !== c.id))} className="absolute top-4 right-4 text-xs font-bold text-red-500 hover:underline">Remove</button>
                    <p className="text-xs font-bold text-black flex items-center gap-1.5"><CreditCard size={14} className="text-[#FF0069]" /> {c.number}</p>
                    <p className="text-[10px] text-gray-500 mt-2 font-medium">Holder: {c.holder} | Expiry: {c.expiry}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddCard} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-bold text-black">Link New Card</p>
                <input type="text" placeholder="Card Number" value={newCard.number} onChange={e => setNewCard({...newCard, number: e.target.value.replace(/\D/g, '')})} className="px-3 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:border-[#FF0069]" />
                <div className="flex gap-2">
                  <input type="text" placeholder="Card Holder Name" value={newCard.holder} onChange={e => setNewCard({...newCard, holder: e.target.value})} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:border-[#FF0069]" />
                  <input type="text" placeholder="MM/YY" value={newCard.expiry} onChange={e => setNewCard({...newCard, expiry: e.target.value})} className="w-20 px-3 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:border-[#FF0069] text-center" />
                </div>
                <button type="submit" className="w-full py-2 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white rounded-xl font-bold text-xs shadow-sm mt-1">Add Card</button>
              </form>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm font-bold text-black mb-3">Saved Bank Accounts</p>
              <div className="flex flex-col gap-2 mb-4">
                {banks.map(b => (
                  <div key={b.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl">
                    <div>
                      <p className="text-xs font-bold text-black">{b.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Acc: {b.accNo}</p>
                    </div>
                    <button onClick={() => setBanks(prev => prev.filter(bank => bank.id !== b.id))} className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddBank} className="flex gap-2">
                <input type="text" placeholder="Bank Name" value={newBank.name} onChange={e => setNewBank({...newBank, name: e.target.value})} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:border-[#FF0069]" />
                <input type="text" placeholder="Last 4 Digits" value={newBank.accNo} onChange={e => setNewBank({...newBank, accNo: e.target.value.replace(/\D/g, '')})} className="w-24 px-3 py-2 border border-gray-300 rounded-xl text-xs outline-none focus:border-[#FF0069]" />
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF0069] hover:bg-[#FF0069]/90 text-white shadow-sm">Link Bank</button>
              </form>
            </div>
          </div>
        )}

        {/* LANGUAGE & REGION VIEW */}
        {subSection === 'region' && (
          <div className="flex flex-col gap-5 max-w-xl font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Language & Region Preferences</h3>

            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500 z-10">Language</label>
              <select 
                value={language} 
                onChange={e => setLanguage(e.target.value)} 
                className="w-full py-3.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] transition-all bg-transparent font-medium text-sm text-black"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Marathi">Marathi (मराठी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
              </select>
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500 z-10">Preferred Currency</label>
              <select 
                value={currency} 
                onChange={e => setCurrency(e.target.value)} 
                className="w-full py-3.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] transition-all bg-transparent font-medium text-sm text-black"
              >
                <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
              </select>
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500 z-10">Country/Region</label>
              <select 
                value={region} 
                onChange={e => setRegion(e.target.value)} 
                className="w-full py-3.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] transition-all bg-transparent font-medium text-sm text-black"
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
              </select>
            </div>

            <button onClick={() => alert('✓ Regional preferences saved.')} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-bold text-sm shadow-sm hover:opacity-95 transition-all mt-4">
              Apply Preferences
            </button>
          </div>
        )}

        {/* APP PREFERENCES VIEW */}
        {subSection === 'preferences' && (
          <div className="flex flex-col gap-5 max-w-xl font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">App Preferences</h3>

            <div className="flex items-center justify-between p-3 border border-pink-100/10 rounded-xl bg-pink-50/5">
              <div>
                <p className="text-sm font-semibold text-gray-700">Dark Mode (Simulated)</p>
                <p className="text-[10px] text-gray-400">Toggle dark dashboard theme.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border border-pink-100/10 rounded-xl bg-pink-50/5">
              <div>
                <p className="text-sm font-semibold text-gray-700">Auto Play Videos</p>
                <p className="text-[10px] text-gray-400">Auto-play product formulation reels and clips.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={autoPlayVideos} onChange={(e) => setAutoPlayVideos(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border border-pink-100/10 rounded-xl bg-pink-50/5">
              <div>
                <p className="text-sm font-semibold text-gray-700">Remember Login Session</p>
                <p className="text-[10px] text-gray-400">Saves login details locally to keep user sessions logged in.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={rememberLogin} onChange={(e) => setRememberLogin(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div className="relative group mt-2">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500 z-10">Render Image Quality</label>
              <select 
                value={imageQuality} 
                onChange={e => setImageQuality(e.target.value)} 
                className="w-full py-3.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] bg-transparent font-medium text-sm text-black"
              >
                <option value="Low">Low (Data Saver)</option>
                <option value="Medium">Medium</option>
                <option value="High">High (High-Def UI)</option>
              </select>
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500 z-10">Animation Profile</label>
              <select 
                value={animationPref} 
                onChange={e => setAnimationPref(e.target.value)} 
                className="w-full py-3.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] bg-transparent font-medium text-sm text-black"
              >
                <option value="None">None (Fastest rendering)</option>
                <option value="Smooth">Smooth (Framer-Motion active)</option>
                <option value="Relaxed">Relaxed (Eco-friendly transitions)</option>
              </select>
            </div>

            <button onClick={() => alert('✓ App preferences updated.')} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-bold text-sm shadow-sm hover:opacity-95 transition-all mt-4">
              Save Preferences
            </button>
          </div>
        )}

        {/* FAQ & HELP VIEW */}
        {subSection === 'help' && (
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">FAQ & Help Desk</h3>
            
            {/* FAQs */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-black">Frequently Asked Questions</p>
              {[
                { q: "How do I track my orders?", a: "Go to your 'My Orders' history and click on the 'Track Order' button next to the relevant purchase to track real-time delivery timelines." },
                { q: "What is your return & replace policy?", a: "We offer hassle-free return and replacement policies for all products. You can request replacements from your orders menu within 7 days of delivery." },
                { q: "Are COSKINn products cruelty-free?", a: "Yes, all COSKINn skincare and cosmetics products are certified 100% vegan, cruelty-free, and dermatologically tested." }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button 
                    type="button"
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                    className="w-full p-4 flex justify-between items-center text-left text-xs font-bold text-black bg-gray-50 hover:bg-[#FF0069]/5 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`transform transition-transform ${faqOpen === index ? 'rotate-180 text-[#FF0069]' : 'text-gray-400'}`} />
                  </button>
                  {faqOpen === index && (
                    <div className="p-4 bg-white border-t border-gray-100 text-xs text-gray-500 leading-relaxed font-sans font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Support Request Form */}
            <form onSubmit={handleSupportSubmit} className="border-t border-gray-100 pt-5 flex flex-col gap-4">
              <p className="text-sm font-bold text-black">Contact Customer Support</p>
              <input 
                type="text" 
                placeholder="Issue Subject" 
                value={supportMsg.subject} 
                onChange={e => setSupportMsg({...supportMsg, subject: e.target.value})} 
                className="w-full py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] text-xs font-sans font-medium" 
              />
              <textarea 
                placeholder="Describe your concern in detail..." 
                value={supportMsg.message} 
                onChange={e => setSupportMsg({...supportMsg, message: e.target.value})} 
                className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] text-xs h-24 font-sans font-medium" 
              />
              <button type="submit" className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-bold text-xs shadow-sm hover:opacity-95 transition-all">
                Submit Ticket
              </button>
            </form>

            <div className="border-t border-gray-100 pt-5 text-center sm:text-left">
              <p className="text-xs text-gray-400">About COSKINn | Terms of Use | Privacy Policy</p>
              <p className="text-[10px] text-gray-400 mt-1">© 2026 COSKINn. All rights reserved.</p>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}

// 6. Security Tab
function SecurityTab({ logout }) {
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();
  const { clearCart } = useCart();
  
  // State for Delete Account Flow
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  
  // Verification states
  const [verifyMethod, setVerifyMethod] = useState(''); // 'mobile' or 'email'
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  // Reason states
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  // Checklist state
  const [understandChecked, setUnderstandChecked] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    let timer;
    if (otpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSendOTP = (method) => {
    setVerifyMethod(method);
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
      setCountdown(30);
      setOtpVal(['', '', '', '']);
      setOtpError('');
    }, 800);
  };

  const handleOtpChange = (index, value) => {
    setOtpError('');
    const newOtp = [...otpVal];
    newOtp[index] = value.slice(-1);
    setOtpVal(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`delete-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpVal[index] && index > 0) {
      const prevInput = document.getElementById(`delete-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpVal.join('').length !== 4) {
      setOtpError('Please enter a 4-digit code.');
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setDeleteStep(3); // Go to Reason selection directly
    }, 800);
  };

  const handleFinalDelete = () => {
    setDeleteStep(6); // Show deleting processing screen (loading screen)
    
    setTimeout(() => {
      // Clear data
      if (user) {
        const userKey = user.mobile || user.email;
        localStorage.removeItem(`coskinn_cart_${userKey}`);
        localStorage.removeItem(`coskinn_wishlist_${userKey}`);
        
        // Remove user from database
        const users = JSON.parse(localStorage.getItem('coskinn_users') || '[]');
        const updatedUsers = users.filter(u => u.mobile !== user.mobile && u.email !== user.email);
        localStorage.setItem('coskinn_users', JSON.stringify(updatedUsers));
      }
      
      localStorage.removeItem('coskinn_orders');
      localStorage.removeItem('coskinn_profile');
      localStorage.removeItem('coskinn_addresses');
      
      // Clear contexts
      clearCart();
      
      // Success step
      setDeleteStep(7);
    }, 2500);
  };

  const handleFinishDeletion = (action) => {
    setIsDeleteOpen(false);
    logout();
    navigate('/');
    
    if (action === 'signup') {
      setTimeout(() => {
        openAuthModal();
      }, 500);
    }
  };

  const handleClose = () => {
    setIsDeleteOpen(false);
    setDeleteStep(1);
    setVerifyMethod('');
    setOtpSent(false);
    setReason('');
    setOtherReason('');
    setUnderstandChecked(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 font-sans">
      <h2 className="text-2xl font-heading font-medium text-black mb-6">Security & Access</h2>
      
      <div className="flex flex-col gap-6 max-w-xl">
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-red-700 mb-1">Logout Everywhere</h3>
            <p className="text-sm text-red-600/80">Securely sign out of your account.</p>
          </div>
          <button onClick={handleLogout} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="p-6 border border-pink-100 bg-pink-50/20 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4">
          <div>
            <h3 className="font-bold text-black mb-1">Delete Account</h3>
            <p className="text-gray-500 text-sm">Permanently delete your account and all data.</p>
          </div>
          <button 
            onClick={() => setIsDeleteOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-2"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Account Step-by-Step Flow Modal */}
      <AnimatePresence>
        {isDeleteOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
              onClick={deleteStep < 6 ? handleClose : undefined}
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] z-10 flex flex-col font-sans"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-xl font-heading font-medium text-black">
                  {deleteStep === 7 ? "Account Deleted" : "Delete Permanent Account"}
                </h3>
                {deleteStep < 6 && (
                  <button onClick={handleClose} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors">
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Step Content */}
              <div className="p-6 flex-1">
                {/* STEP 1: Details / Data Deletion Notice */}
                {deleteStep === 1 && (
                  <div className="flex flex-col gap-4">
                    <div className="p-4 bg-pink-50/50 border border-pink-100 text-[#FF0069] rounded-2xl flex gap-3 items-start">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm">Action is Irreversible</h4>
                        <p className="text-xs mt-1 leading-relaxed text-[#FF0069]/80 font-sans">Deleting your COSKINn account is permanent. All associated data will be wiped out completely.</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3 font-sans">The following data will be permanently removed:</p>
                      <ul className="grid grid-cols-2 gap-2.5 text-xs text-gray-600 font-medium font-sans">
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF0069]" /> Profile Details</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF0069]" /> Saved Addresses</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF0069]" /> Wishlist</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF0069]" /> Cart Items</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF0069]" /> Orders History</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF0069]" /> Reviews</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF0069]" /> Reward Points</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#FF0069]" /> Payment Methods</li>
                      </ul>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button onClick={handleClose} className="flex-1 py-3 font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm font-sans">Cancel</button>
                      <button onClick={() => setDeleteStep(2)} className="flex-1 py-3 font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white rounded-xl transition-all text-sm shadow-sm font-sans">Continue</button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Identity Verification */}
                {deleteStep === 2 && (
                  <div className="flex flex-col gap-5">
                    {!otpSent ? (
                      <>
                        <p className="text-sm text-gray-500 leading-relaxed font-sans">Choose a verification method to receive a secure 4-digit code.</p>
                        <div className="flex flex-col gap-3 font-sans">
                          <button 
                            onClick={() => handleSendOTP('mobile')}
                            className="w-full p-4 border border-pink-100 bg-pink-50/20 hover:bg-pink-50 rounded-2xl flex items-center justify-between text-left font-bold transition-all group"
                          >
                            <span className="text-sm text-black">Verify via Mobile OTP ({user?.mobile ? `+91 ******${user.mobile.slice(-4)}` : 'No mobile linked'})</span>
                            <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                          <button 
                            onClick={() => handleSendOTP('email')}
                            className="w-full p-4 border border-pink-100 bg-pink-50/20 hover:bg-pink-50 rounded-2xl flex items-center justify-between text-left font-bold transition-all group"
                          >
                            <span className="text-sm text-black">Verify via Email OTP ({user?.email ? `${user.email.slice(0, 2)}***${user.email.slice(user.email.indexOf('@'))}` : 'No email linked'})</span>
                            <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <form onSubmit={handleVerifyOTP} className="flex flex-col gap-5 font-sans">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">OTP sent to your {verifyMethod === 'mobile' ? 'mobile' : 'email'}.</p>
                          <p className="text-xs text-[#FF0069] font-semibold mt-1">For testing, enter any 4 digits (e.g. 1234)</p>
                        </div>
                        
                        <div className="flex justify-center gap-3">
                          {otpVal.map((digit, index) => (
                            <input 
                              key={index}
                              id={`delete-otp-${index}`}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] transition-all bg-transparent"
                            />
                          ))}
                        </div>

                        {otpError && (
                          <p className="text-xs font-semibold text-red-500 text-center">{otpError}</p>
                        )}

                        <div className="flex justify-between items-center text-sm">
                          <button type="button" onClick={() => setOtpSent(false)} className="text-gray-500 hover:text-black">Change Method</button>
                          {countdown > 0 ? (
                            <span className="text-gray-400">Resend in {countdown}s</span>
                          ) : (
                            <button type="button" onClick={() => handleSendOTP(verifyMethod)} className="font-bold text-[#FF0069] hover:underline">Resend OTP</button>
                          )}
                        </div>

                        <button 
                          type="submit" 
                          disabled={otpVal.join('').length !== 4 || otpLoading}
                          className={`w-full py-3.5 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 ${otpVal.join('').length === 4 ? 'bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white shadow-sm' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                          {otpLoading ? 'Verifying...' : 'Verify & Proceed'}
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* STEP 3: Reason for Deletion */}
                {deleteStep === 3 && (
                  <div className="flex flex-col gap-5 font-sans">
                    <p className="text-sm text-gray-500 leading-relaxed font-sans">Why would you like to delete your account? Your feedback helps us improve.</p>
                    <div className="flex flex-col gap-2.5">
                      {[
                        'Privacy Concerns',
                        'Too Expensive',
                        'Created Another Account',
                        'Not Using Anymore',
                        'Poor Experience',
                        'Technical Issues',
                        'Other'
                      ].map((item) => (
                        <label key={item} className="flex items-center gap-3 p-3.5 border border-pink-100/30 hover:border-pink-100 bg-pink-50/5 hover:bg-pink-50/30 rounded-xl cursor-pointer transition-all select-none font-sans">
                          <input 
                            type="radio" 
                            name="delete-reason" 
                            value={item} 
                            checked={reason === item}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-4 h-4 accent-[#FF0069] shrink-0" 
                          />
                          <span className="text-sm font-semibold text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>

                    {reason === 'Other' && (
                      <textarea
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="Please tell us details about your decision (optional)"
                        className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] focus:ring-1 focus:ring-[#FF0069] transition-all bg-transparent text-sm h-24 font-medium"
                      />
                    )}

                    <button 
                      onClick={() => setDeleteStep(4)}
                      disabled={!reason}
                      className={`w-full py-3.5 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 ${reason ? 'bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white shadow-sm' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* STEP 4: Final Warning */}
                {deleteStep === 4 && (
                  <div className="flex flex-col gap-5 font-sans">
                    <div className="p-5 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex flex-col gap-2">
                      <h4 className="font-bold text-sm flex items-center gap-2 font-heading">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        This action is permanent and cannot be undone.
                      </h4>
                      <p className="text-xs leading-relaxed text-red-700/80 mt-1 font-sans">You will immediately lose access to your account and all associated items:</p>
                      <ul className="list-disc pl-4 text-xs font-semibold text-red-700/70 mt-1 space-y-1 font-sans">
                        <li>Saved Wishlist items</li>
                        <li>Past Order Details & Invoices</li>
                        <li>Saved Addresses</li>
                        <li>Reward Points & Coupons</li>
                        <li>Product Reviews & Comments</li>
                      </ul>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer select-none mt-2 group font-sans">
                      <input 
                        type="checkbox" 
                        checked={understandChecked}
                        onChange={(e) => setUnderstandChecked(e.target.checked)}
                        className="w-4 h-4 accent-[#FF0069] mt-0.5 shrink-0"
                      />
                      <span className="text-xs font-semibold text-gray-600 group-hover:text-black transition-colors leading-tight font-sans">
                        I understand that my account and all associated data will be permanently deleted.
                      </span>
                    </label>

                    <button 
                      onClick={() => setDeleteStep(5)}
                      disabled={!understandChecked}
                      className={`w-full py-3.5 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 ${understandChecked ? 'bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white shadow-sm' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                      Delete Account
                    </button>
                  </div>
                )}

                {/* STEP 5: Final Confirmation Modal */}
                {deleteStep === 5 && (
                  <div className="flex flex-col gap-5 text-center font-sans">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 mb-2">
                      <AlertCircle size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-black mb-1 font-heading">Are you sure you want to permanently delete your COSKINn account?</h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-sans">This is your last chance. Click 'Delete Permanently' to complete account deletion.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 font-sans">
                      <button onClick={handleClose} className="flex-1 py-3 font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all text-sm">Keep My Account</button>
                      <button onClick={handleFinalDelete} className="flex-1 py-3 font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all text-sm shadow-sm">Delete Permanently</button>
                    </div>
                  </div>
                )}

                {/* STEP 6: Processing screen */}
                {deleteStep === 6 && (
                  <div className="flex flex-col items-center justify-center py-10 text-center font-sans">
                    <div className="w-12 h-12 rounded-full border-4 border-black/10 border-t-[#FF0069] animate-spin mb-4"></div>
                    <h4 className="font-bold text-black text-base mb-1 font-heading">Deleting your account...</h4>
                    <p className="text-sm text-gray-500 font-sans">Please wait while we clean up your account details.</p>
                  </div>
                )}

                {/* STEP 7: Success Screen */}
                {deleteStep === 7 && (
                  <div className="flex flex-col items-center justify-center py-6 text-center font-sans">
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="font-bold text-lg text-black mb-2 font-heading">Your COSKINn account has been permanently deleted.</h4>
                    <p className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed font-sans font-semibold">We are sorry to see you go. If you change your mind, you can join us again anytime.</p>
                    <div className="flex flex-col w-full gap-3 font-sans">
                      <button onClick={() => handleFinishDeletion('home')} className="w-full py-3.5 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white font-bold rounded-xl text-sm transition-all shadow-sm">Return to Home</button>
                      <button onClick={() => handleFinishDeletion('signup')} className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all">Create New Account</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 7. Reviews Tab
function ReviewsTab({ primaryClass }) {
  const dummyReviews = [
    { id: 1, name: 'COSKINn Strawberry Glow Cleanser', rating: 5, date: 'June 15, 2026', comment: 'Absolutely amazing cleanser! Leaves my skin feeling so clean and refreshed without any dryness.' },
    { id: 2, name: 'COSKINn Vitamin C Sunscreen SPF 50', rating: 4, date: 'May 20, 2026', comment: 'Very lightweight and leaves no white cast. A bit expensive but worth it.' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 font-sans">
      <h2 className="text-2xl font-heading font-medium text-black mb-6">My Reviews</h2>
      
      {dummyReviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <MessageSquare className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-heading font-medium text-black mb-2">No Reviews Yet</h3>
          <p className="text-gray-500 mb-6">You haven't written any reviews yet. Share your experience with your purchased products!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {dummyReviews.map(review => (
            <div key={review.id} className="p-6 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-black text-base">{review.name}</h4>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// 8. Notifications Tab
function NotificationsTab({ primaryClass }) {
  const dummyNotifications = [
    { id: 1, title: 'Order Shipped!', desc: 'Your order ORD-498234 has been shipped and is on the way.', date: 'Just now', read: false },
    { id: 2, title: 'Exclusive Offer inside!', desc: 'Get 20% off on the new COSKINn Velvet Blush collection. Use code BLUSH20.', date: '2 hours ago', read: false },
    { id: 3, title: 'Account Password Changed', desc: 'Your account password was updated successfully.', date: '1 day ago', read: true }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 font-sans">
      <h2 className="text-2xl font-heading font-medium text-black mb-6">Notifications</h2>
      
      {dummyNotifications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <Bell className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-heading font-medium text-black mb-2">No Notifications</h3>
          <p className="text-gray-500 mb-6">You are all caught up!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {dummyNotifications.map(item => (
            <div key={item.id} className={`p-5 rounded-2xl border transition-colors flex gap-4 items-start ${item.read ? 'bg-white border-gray-100' : 'bg-pink-50/20 border-pink-100/50'}`}>
              <div className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${item.read ? 'bg-transparent' : 'bg-theme-primary'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 gap-4">
                  <h4 className="font-bold text-black text-sm sm:text-base leading-tight">{item.title}</h4>
                  <span className="text-xs text-gray-400 shrink-0">{item.date}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------
// NEW MODULES
// ---------------------------------------------------------

function WalletTab() {
  const [filter, setFilter] = useState('All');
  
  const transactions = [
    { id: 'TXN-9021', type: 'Credit', category: 'Refund', amount: 1500, date: '2026-07-18', status: 'Completed', opening: 500, closing: 2000 },
    { id: 'TXN-9020', type: 'Debit', category: 'Order Payment', amount: 499, date: '2026-07-15', status: 'Completed', opening: 999, closing: 500 },
    { id: 'TXN-9019', type: 'Credit', category: 'Bonus', amount: 200, date: '2026-07-10', status: 'Completed', opening: 799, closing: 999 },
    { id: 'TXN-9018', type: 'Credit', category: 'Cashback', amount: 50, date: '2026-07-05', status: 'Completed', opening: 749, closing: 799 },
  ];

  const filteredTransactions = filter === 'All' ? transactions : transactions.filter(t => t.type === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 font-sans">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-heading font-medium text-black">Wallet & Ledger</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your balance and transaction history.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all text-sm">
          <Download size={16} /> Export History
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#FF0069] to-[#FF6B6B] rounded-3xl p-8 text-white mb-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">Available Balance</p>
          <h3 className="text-5xl font-black mb-1">₹2,000</h3>
          <p className="text-white/90 text-sm flex items-center gap-2 mt-4">
            <CheckCircle2 size={16} /> Secure and ready to use
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 overflow-x-auto hide-scrollbar pb-2">
        {['All', 'Credit', 'Debit'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap ${filter === f ? 'bg-[#FF0069]/10 text-[#FF0069] border-[#FF0069]/20' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
          >
            {f} Transactions
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-2xl">
        <table className="w-full text-left min-w-[700px]">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & ID</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Balance (Op/Cl)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTransactions.map(t => (
              <tr key={t.id} className="hover:bg-pink-50/10 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-gray-900 text-sm">{t.date}</p>
                  <p className="text-xs text-gray-500">{t.id}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'Credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {t.type === 'Credit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                    </span>
                    <span className="font-medium text-gray-700 text-sm">{t.category}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`font-black ${t.type === 'Credit' ? 'text-green-600' : 'text-gray-900'}`}>
                    {t.type === 'Credit' ? '+' : '-'}₹{t.amount}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">{t.status}</span>
                </td>
                <td className="p-4 text-right">
                  <p className="text-xs text-gray-400">Op: ₹{t.opening}</p>
                  <p className="font-bold text-gray-800 text-sm">Cl: ₹{t.closing}</p>
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function BonusesTab() {
  const bonuses = [
    { title: 'Signup Bonus', amount: '₹500', status: 'Claimed', expiry: null, progress: 100 },
    { title: 'First Order Bonus', amount: '10% Cashback', status: 'Available', expiry: '2026-08-01', progress: 100 },
    { title: 'Birthday Bonus', amount: 'Free Lipstick', status: 'Locked', expiry: 'Next Birthday', progress: 45 },
    { title: 'Referral Bonus', amount: '₹200 per friend', status: 'Active', expiry: 'No Expiry', progress: 100 },
    { title: 'Festival Bonus', amount: 'Flat 15% Off', status: 'Used', expiry: null, progress: 100 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6 font-sans">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white">
        <h2 className="text-2xl font-heading font-medium text-black">My Bonuses</h2>
        <p className="text-gray-500 text-sm mt-1">Unlock, claim, and track your exclusive rewards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bonuses.map((bonus, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-[#FF0069]/30 transition-colors flex flex-col h-full relative overflow-hidden group">
            {bonus.status === 'Locked' && <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10" />}
            
            <div className="flex justify-between items-start mb-4 relative z-20">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bonus.status === 'Available' ? 'bg-[#FF0069]/10 text-[#FF0069]' : 'bg-gray-50 text-gray-400'}`}>
                <Gift size={24} />
              </div>
              <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${
                bonus.status === 'Available' ? 'bg-green-50 text-green-700 border-green-100' :
                bonus.status === 'Claimed' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                bonus.status === 'Used' ? 'bg-gray-50 text-gray-500 border-gray-200' :
                bonus.status === 'Active' ? 'bg-pink-50 text-[#FF0069] border-pink-100' :
                'bg-gray-100 text-gray-400 border-gray-200'
              }`}>
                {bonus.status}
              </span>
            </div>
            
            <div className="relative z-20 mb-4">
              <p className="text-sm font-bold text-gray-500 mb-1">{bonus.title}</p>
              <h3 className={`text-2xl font-black ${bonus.status === 'Available' || bonus.status === 'Active' ? 'text-black' : 'text-gray-400'}`}>{bonus.amount}</h3>
            </div>

            <div className="mt-auto relative z-20">
              <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                <span>Progress</span>
                <span>{bonus.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div className={`h-full rounded-full transition-all ${bonus.status === 'Available' || bonus.status === 'Claimed' || bonus.status === 'Used' || bonus.status === 'Active' ? 'bg-gradient-to-r from-[#FF0069] to-[#FF6B6B]' : 'bg-gray-300'}`} style={{ width: `${bonus.progress}%` }} />
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Clock size={14} /> {bonus.expiry ? `Expires: ${bonus.expiry}` : 'No Expiry'}
                </div>
                {bonus.status === 'Available' && (
                  <button className="px-4 py-1.5 bg-[#FF0069] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#FF0069]/90 transition-colors">
                    Claim Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ReferralTab() {
  const { user } = useAuth();
  const referralCode = user?.name ? `${user.name.split(' ')[0].toUpperCase()}-BEAUTY-2026` : "RESHU-BEAUTY-2026";
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral Code Copied!');
  };

  const shareText = `✨ Join COSKINn and discover luxury skincare & cosmetics.\n\nUse my referral code:\n${referralCode}\n\nSign up and enjoy exclusive rewards.\n\nhttps://yourdomain.com/referral/${referralCode}`;

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join COSKINn',
          text: shareText,
        });
        return;
      } catch (err) {
        console.log('Native share failed', err);
      }
    }
    setIsShareSheetOpen(true);
  };

  const handleOptionClick = (option) => {
    if (option.action) {
      option.action();
    } else if (option.url) {
      window.open(option.url(shareText), '_blank');
    }
    setIsShareSheetOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsShareSheetOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (isShareSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isShareSheetOpen]);

  const shareOptions = [
    { name: 'WhatsApp', icon: MessageSquare, color: 'bg-[#25D366] text-white', url: (text) => `https://wa.me/?text=${encodeURIComponent(text)}` },
    { name: 'Instagram', icon: Camera, color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white', action: handleCopy },
    { name: 'Facebook', icon: Globe, color: 'bg-[#1877F2] text-white', url: (text) => `https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com&quote=${encodeURIComponent(text)}` },
    { name: 'Telegram', icon: Send, color: 'bg-[#0088cc] text-white', url: (text) => `https://t.me/share/url?url=https://yourdomain.com&text=${encodeURIComponent(text)}` },
    { name: 'X (Twitter)', icon: MessageCircle, color: 'bg-black text-white', url: (text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}` },
    { name: 'Gmail', icon: Mail, color: 'bg-[#EA4335] text-white', url: (text) => `mailto:?subject=Join COSKINn&body=${encodeURIComponent(text)}` },
    { name: 'Messenger', icon: MessageSquare, color: 'bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] text-white', url: (text) => `fb-messenger://share/?link=https://yourdomain.com` },
    { name: 'Snapchat', icon: Ghost, color: 'bg-[#FFFC00] text-black', action: handleCopy },
    { name: 'Pinterest', icon: Bookmark, color: 'bg-[#E60023] text-white', url: (text) => `https://pinterest.com/pin/create/button/?url=https://yourdomain.com&description=${encodeURIComponent(text)}` },
    { name: 'LinkedIn', icon: Briefcase, color: 'bg-[#0A66C2] text-white', url: (text) => `https://www.linkedin.com/sharing/share-offsite/?url=https://yourdomain.com` },
    { name: 'Copy Message', icon: Copy, color: 'bg-gray-800 text-white', action: () => { navigator.clipboard.writeText(shareText); alert('Message Copied!'); } }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6 font-sans">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white">
        <h2 className="text-2xl font-heading font-medium text-black">Refer & Earn</h2>
        <p className="text-gray-500 text-sm mt-1">Invite friends and earn exclusive rewards when they shop.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#FF0069]/5 to-transparent border border-pink-100 rounded-3xl p-6 text-center">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Total Earnings</p>
          <h3 className="text-4xl font-black text-[#FF0069]">₹1,200</h3>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Successful</p>
          <h3 className="text-4xl font-black text-black">6</h3>
          <p className="text-xs text-green-600 font-bold mt-1">Friends joined</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Pending</p>
          <h3 className="text-4xl font-black text-black">2</h3>
          <p className="text-xs text-orange-500 font-bold mt-1">Awaiting purchase</p>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-[#FF0069]/10 rounded-full flex items-center justify-center text-[#FF0069] mb-4">
          <Share2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-black mb-2">Your Unique Referral Code</h3>
        <p className="text-gray-500 text-sm mb-6 max-w-md">Share this code with your friends to give them 15% off their first order. You earn ₹200 for every successful referral.</p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-4 px-6 text-xl font-black text-center tracking-widest text-black w-full border-dashed">
            {referralCode}
          </div>
          <button onClick={handleCopy} className="bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 active:scale-95 text-white rounded-xl py-4 px-8 font-bold flex items-center gap-2 transition-all w-full sm:w-auto justify-center shadow-lg shadow-[#FF0069]/20 hover:shadow-xl hover:shadow-[#FF0069]/30 hover:-translate-y-0.5">
            <Copy size={18} /> Copy
          </button>
        </div>
        
        <button onClick={handleShareClick} className="mt-6 font-bold text-[#FF0069] hover:underline flex items-center gap-2">
          Share Referral Link <ChevronRight size={16} />
        </button>
      </div>

      {/* History */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white">
        <h3 className="text-lg font-bold text-black mb-4">Reward History</h3>
        <div className="divide-y divide-gray-100">
          {[
            { name: 'Priya Sharma', date: '2026-07-15', status: 'Completed', reward: '₹200' },
            { name: 'Neha Gupta', date: '2026-07-12', status: 'Completed', reward: '₹200' },
            { name: 'Riya Verma', date: '2026-07-10', status: 'Pending', reward: '₹200' },
          ].map((ref, idx) => (
            <div key={idx} className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center font-bold text-[#FF0069] text-sm">
                  {ref.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-black">{ref.name}</p>
                  <p className="text-xs text-gray-500">{ref.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black text-sm ${ref.status === 'Completed' ? 'text-green-600' : 'text-gray-400'}`}>+{ref.reward}</p>
                <p className="text-xs font-bold text-gray-500">{ref.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Sheet Modal */}
      <AnimatePresence>
        {isShareSheetOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsShareSheetOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full sm:max-w-xl bg-white/90 backdrop-blur-2xl rounded-t-[2rem] sm:rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 sm:hidden" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-black text-black">Share with Friends</h3>
                <button onClick={() => setIsShareSheetOpen(false)} className="p-2 bg-gray-100/50 hover:bg-gray-200 text-gray-500 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-500 font-medium mb-8">Invite your friends and earn rewards together.</p>
              
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-x-2 gap-y-6">
                {shareOptions.map((opt, i) => (
                  <motion.button 
                    key={i} 
                    onClick={() => handleOptionClick(opt)}
                    whileHover={{ y: -5, scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-3 group outline-none"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow ${opt.color}`}>
                      <opt.icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 text-center uppercase tracking-wide leading-tight">{opt.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 8. Reward Points Tab
function RewardPointsTab({ dynamicData }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6 font-sans">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white">
        <h2 className="text-2xl font-heading font-medium text-black">Reward Points</h2>
        <p className="text-gray-500 text-sm mt-1">Earn points on every purchase and redeem them for exclusive rewards.</p>
      </div>

      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#FF0069] to-[#FF6B6B] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <Award size={32} className="mb-4 text-white/80" />
          <p className="text-white/80 font-bold uppercase tracking-wider text-xs mb-1">Total Points</p>
          <h3 className="text-4xl font-black mb-4">{(dynamicData?.rewardPoints || 0).toLocaleString()}</h3>
          <p className="text-sm font-medium">Equal to ${((dynamicData?.rewardPoints || 0) * 0.01).toFixed(2)} store credit</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Lifetime Earned</p>
              <h4 className="text-2xl font-black text-black">12,500 <span className="text-sm font-bold text-gray-400">pts</span></h4>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Redeemed</p>
              <h4 className="text-2xl font-black text-black">8,000 <span className="text-sm font-bold text-gray-400">pts</span></h4>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
              <ArrowDownLeft size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Ways to Earn / Redeem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2"><Plus size={18} className="text-[#FF0069]"/> Ways to Earn</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Make a purchase</span>
              <span className="font-bold text-[#FF0069]">10 pts / ₹100</span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Write a review</span>
              <span className="font-bold text-[#FF0069]">50 pts</span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Add a photo to review</span>
              <span className="font-bold text-[#FF0069]">100 pts</span>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2"><Gift size={18} className="text-[#FF0069]"/> Ways to Redeem</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Checkout Discount</span>
              <span className="font-bold text-[#FF0069]">10 pts = ₹1</span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Free Shipping</span>
              <span className="font-bold text-[#FF0069]">500 pts</span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Exclusive Gift Box</span>
              <span className="font-bold text-[#FF0069]">2000 pts</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Points History */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white mt-2">
        <h3 className="text-lg font-bold text-black mb-4">Points History</h3>
        <div className="divide-y divide-gray-100">
          {[
            { action: 'Order #9021', date: '2026-07-18', pts: '+150', type: 'earn' },
            { action: 'Redeemed on Checkout', date: '2026-07-10', pts: '-500', type: 'redeem' },
            { action: 'Product Review', date: '2026-07-05', pts: '+50', type: 'earn' },
          ].map((hist, idx) => (
            <div key={idx} className="flex justify-between items-center py-4">
              <div>
                <p className="font-bold text-sm text-black">{hist.action}</p>
                <p className="text-xs text-gray-500">{hist.date}</p>
              </div>
              <p className={`font-black text-sm ${hist.type === 'earn' ? 'text-green-600' : 'text-gray-900'}`}>{hist.pts} pts</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
// 9. Membership Tab
function MembershipTab({ dynamicData }) {
  const navigate = useNavigate();
  const { skincareMembership, cosmeticsMembership } = dynamicData || {};

  const renderMembershipCard = (title, emoji, membership, colorScheme) => (
    <div className={`bg-gradient-to-br ${colorScheme.bg} rounded-3xl p-8 ${colorScheme.text} shadow-[0_15px_40px_rgba(255,0,105,0.15)] relative overflow-hidden flex-1 group hover:scale-[1.01] transition-transform duration-500`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl drop-shadow-sm">{emoji}</span>
              <p className="text-sm font-bold uppercase tracking-widest opacity-90">{title}</p>
            </div>
            {membership.isExplicit && (
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold border border-white/20 backdrop-blur-md">
                {membership.plan}
              </span>
            )}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-1 drop-shadow-sm">{membership.tier}</h2>
          <p className="opacity-90 text-sm font-medium">Member since {membership.since} • {membership.points} Reward Points</p>
          {membership.isExplicit && (
            <p className="opacity-90 text-xs mt-1">ID: {membership.id} • Valid till {membership.expiry}</p>
          )}
        </div>
        
        <div className="w-full mt-2">
          <div className="flex justify-between text-xs font-bold mb-2 opacity-90">
            <span>{membership.tier}</span>
            <span>{membership.nextTier}</span>
          </div>
          <div className="w-full bg-black/10 rounded-full h-2.5 mb-3 border border-white/20 backdrop-blur-sm overflow-hidden">
            <div className="bg-white h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-1000 ease-out" style={{ width: `${membership.tierProgress || 0}%` }} />
          </div>
          <p className="text-xs opacity-90 text-right font-medium">
            {membership.pointsForNextTier > 0 ? `${membership.pointsForNextTier} pts away from upgrade` : 'Maximum tier reached!'}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-5 border-t border-white/20">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${membership.status === 'Expired' ? 'bg-red-400' : 'bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]'}`} />
            <span className="text-sm font-bold opacity-100">{membership.status || 'Active Status'}</span>
          </div>
          {membership.isExplicit ? (
            <div className="flex gap-2">
              <button onClick={() => navigate(emoji === '🌿' ? '/membership/skincare' : '/membership/cosmetics')} className="text-xs font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-all shadow-sm border border-white/10">
                {membership.status === 'Expired' ? 'Renew Now' : 'Renew'}
              </button>
              {membership.status !== 'Expired' && (
                <button onClick={() => navigate(emoji === '🌿' ? '/membership/skincare' : '/membership/cosmetics')} className={`text-xs font-bold bg-white px-4 py-2 rounded-full transition-all shadow-sm ${emoji === '🌿' ? 'text-[#FF8C9D] hover:text-[#FFB6C1]' : 'text-[#FF0069] hover:bg-gray-50'}`}>
                  Upgrade
                </button>
              )}
            </div>
          ) : (
            <button className="text-sm font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-full transition-all shadow-sm border border-white/10">
              View Benefits
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white">
        <h2 className="text-3xl font-heading font-bold text-[#1B1B1B] mb-3">You don't have an active membership yet.</h2>
        <p className="text-gray-500 mb-10 max-w-lg mx-auto font-medium">Join our exclusive reward programs to unlock free shipping, early access to sales, point multipliers, and special birthday gifts.</p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
          {/* Skincare CTA */}
          <div className="flex-1 bg-gradient-to-br from-[#FFF5F7] to-white rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgba(255,192,203,0.3)] hover:shadow-[0_15px_40px_rgba(255,0,105,0.15)] transition-all duration-300 group hover:-translate-y-1">
            <div className="text-5xl mb-5 text-center group-hover:scale-110 transition-transform duration-500">🌿</div>
            <h3 className="text-xl font-bold text-[#1B1B1B] mb-3 text-center">Join COSKINn Skincare</h3>
            <p className="text-sm text-gray-500 mb-8 text-center font-medium leading-relaxed">Earn points on every skincare purchase, unlock glowing rewards, and get priority access to new serums.</p>
            <button onClick={() => navigate('/membership/skincare')} className="w-full py-3.5 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(255,0,105,0.3)] hover:opacity-95 transition-opacity">
              Join Now
            </button>
          </div>

          {/* Cosmetics CTA */}
          <div className="flex-1 bg-gradient-to-br from-[#FFF5F7] to-white rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgba(255,192,203,0.3)] hover:shadow-[0_15px_40px_rgba(255,0,105,0.15)] transition-all duration-300 group hover:-translate-y-1">
            <div className="text-5xl mb-5 text-center group-hover:scale-110 transition-transform duration-500">💄</div>
            <h3 className="text-xl font-bold text-[#1B1B1B] mb-3 text-center">Join COSKINn Cosmetics</h3>
            <p className="text-sm text-gray-500 mb-8 text-center font-medium leading-relaxed">Get exclusive access to new makeup launches, VIP event invitations, and cosmetic point multipliers.</p>
            <button onClick={() => navigate('/membership/cosmetics')} className="w-full py-3.5 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(255,0,105,0.3)] hover:opacity-95 transition-opacity">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const hasSkincare = !!skincareMembership;
  const hasCosmetics = !!cosmeticsMembership;

  if (!hasSkincare && !hasCosmetics) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6 font-sans">
        {renderEmptyState()}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6 font-sans">
      <div className={`flex flex-col ${hasSkincare && hasCosmetics ? 'lg:flex-row' : ''} gap-6`}>
        {hasSkincare && renderMembershipCard(
          'COSKINn Skincare', 
          '🌿', 
          skincareMembership, 
          { bg: 'from-[#FF0069] to-[#FF758C]', text: 'text-white' }
        )}
        
        {hasCosmetics && renderMembershipCard(
          'COSKINn Cosmetics', 
          '💄', 
          cosmeticsMembership, 
          { bg: 'from-[#FF0069] to-[#FF6B6B]', text: 'text-white' }
        )}
      </div>

      {/* Benefits Overview - Shared generic section */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white mt-2">
        <h3 className="text-xl font-heading font-medium text-black mb-6">Your Membership Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Free Shipping', desc: 'On all orders', icon: <Package size={20} /> },
            { title: 'Early Access', desc: 'To new launches', icon: <Eye size={20} /> },
            { title: 'Birthday Gift', desc: 'Exclusive surprise', icon: <Gift size={20} /> },
            { title: 'Point Multiplier', desc: 'Up to 2x Points', icon: <ArrowUpRight size={20} /> },
          ].map((benefit, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#FFF5F7] to-white border border-[#FFC0CB]/40 rounded-2xl p-5 text-center shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFB6C1]/20 to-[#FF0069]/10 rounded-full flex items-center justify-center text-[#FF0069] mx-auto mb-3">
                {benefit.icon}
              </div>
              <h4 className="font-bold text-[#1B1B1B] text-sm mb-1">{benefit.title}</h4>
              <p className="text-xs text-gray-500 font-medium">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function OffersTab() {
  const navigate = useNavigate();
  const offers = [
    { code: 'GLOW20', desc: 'Flat 20% off on all Skincare serums', expiry: 'Ends in 2 days', type: 'Category' },
    { code: 'GOLDMEMBER', desc: 'Exclusive ₹500 off for Gold Members', expiry: 'Valid this month', type: 'Personal' },
    { code: 'FREELIP', desc: 'Free Lip Blur on orders above ₹1500', expiry: 'Ends tonight', type: 'Limited' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6 font-sans">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white">
        <h2 className="text-2xl font-heading font-medium text-black">Special Offers & Deals</h2>
        <p className="text-gray-500 text-sm mt-1">Exclusive coupons and personalized deals just for you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {offers.map((offer, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden flex flex-col sm:flex-row group hover:shadow-md transition-shadow relative">
            
            {/* Left Tag */}
            <div className="bg-gradient-to-b from-[#FF0069] to-[#FF6B6B] p-4 sm:w-24 flex sm:flex-col items-center justify-center gap-2 text-white relative">
              <Tag size={24} className="opacity-80" />
              <span className="text-xs font-bold uppercase tracking-widest sm:-rotate-90 whitespace-nowrap sm:mt-6">{offer.type}</span>
              {/* Dashed line separator for desktop */}
              <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[2px] bg-[radial-gradient(circle,white_2px,transparent_2px)] bg-[length:100%_10px]" />
              {/* Dashed line separator for mobile */}
              <div className="sm:hidden absolute bottom-0 left-0 right-0 h-[2px] bg-[radial-gradient(circle,white_2px,transparent_2px)] bg-[length:10px_100%]" />
            </div>

            {/* Right Content */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-pink-50/10">
              <div>
                <div className="inline-block px-3 py-1 bg-pink-100 text-[#FF0069] font-black tracking-widest rounded-lg text-lg mb-3 border border-pink-200 border-dashed">
                  {offer.code}
                </div>
                <p className="font-bold text-gray-800 leading-snug mb-4">{offer.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Clock size={12}/> {offer.expiry}</span>
                <button onClick={() => { navigator.clipboard.writeText(offer.code); alert('Coupon Copied!'); }} className="text-sm font-bold text-[#FF0069] hover:underline">
                  Copy Code
                </button>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-br from-[#FF0069] to-[#FF6B6B] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden mt-4 shadow-[0_8px_30px_rgba(255,0,105,0.2)] hover:shadow-[0_8px_40px_rgba(255,0,105,0.3)] transition-all duration-500 group">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none mix-blend-overlay" />
        <h3 className="text-3xl sm:text-4xl font-black mb-4 relative z-10 group-hover:scale-[1.02] transition-transform duration-500">Beauty Festival Sale</h3>
        <p className="text-white/90 mb-8 max-w-lg mx-auto relative z-10 font-medium">Up to 40% off on premium skincare and cosmetics. Stack with your membership benefits for maximum savings!</p>
        <button onClick={() => navigate('/collections/sale')} className="px-8 py-3.5 bg-white text-[#FF0069] font-black rounded-xl hover:bg-pink-50 transition-all relative z-10 shadow-lg hover:shadow-xl hover:-translate-y-1">
          Shop the Sale
        </button>
      </div>

    </motion.div>
  );
}
