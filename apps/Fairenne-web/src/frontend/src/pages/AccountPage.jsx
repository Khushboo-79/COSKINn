import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { fonts } from '../constants/theme';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { downloadInvoice } from '../utils/downloadInvoice';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Heart, MapPin, Settings, Shield, LogOut, ChevronRight, Edit2, Plus, Trash2, CheckCircle2, Mail, X, AlertCircle, Camera, MessageSquare, Bell, Eye, CreditCard, Globe, HelpCircle, ChevronDown, Check, Laptop, Key, Smartphone, Wallet, Gift, Share2, Award, Crown, Tag, Download, Copy, ArrowUpRight, ArrowDownLeft, History, Clock, Send, Ghost, Bookmark, Briefcase, MessageCircle } from 'lucide-react';
import CancelOrderModal from '../components/orders/CancelOrderModal';
import NeedHelpModal from '../components/orders/NeedHelpModal';
import ReturnReplaceModal from '../components/orders/ReturnReplaceModal';
import { skincareProducts } from '../constants/skincareProducts';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';
import apiClient from '../utils/apiClient';
import AddressModal from '../components/common/AddressModal';
import { resolveProductImage } from '../utils/imageResolver';

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

  const [backendMembership, setBackendMembership] = useState(null);

  useEffect(() => {
    if (!user) return;
    apiClient.get('/membership/my-tier')
      .then(({ data }) => {
        if (data?.tier) {
          setBackendMembership(data.tier);
          console.log('👑 [MEMBERSHIP] Tier fetched from backend:', data.tier);
        } else {
          console.log('👑 [MEMBERSHIP] No active membership tier found for user.');
        }
      })
      .catch(err => console.error('❌ [MEMBERSHIP] Failed to fetch my-tier:', err));
  }, [user]);

  // Read explicit memberships from localStorage (ONLY purchase status)
  const explicitMemberships = JSON.parse(localStorage.getItem('fairenne_memberships') || '{}');
  const userEmail = user?.email || 'guest';
  const userMemberships = explicitMemberships[userEmail] || {};

  const skincareMembership = userMemberships['skincare']
    ? { ...userMemberships['skincare'], isExplicit: true }
    : null;

  const cosmeticsMembership = userMemberships['cosmetics']
    ? { ...userMemberships['cosmetics'], isExplicit: true }
    : null;

  // Fallback generic membership for the rest of the dashboard
  let membershipTier = skincareMembership?.tier || cosmeticsMembership?.tier || null;
  let nextTier = null;
  let pointsForNextTier = 0;
  let tierProgress = 0;

  // Wallet balance from backend — GET /wallet
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    if (!user) return;
    apiClient.get('/wallet')
      .then(({ data }) => {
        const balance = Number(data?.balance || 0);
        setWalletBalance(balance);
        console.log('💰 [WALLET] Balance fetched from backend:', {
          balance,
          transactionsCount: data?.transactions?.length || 0,
          walletId: data?.id,
          fullData: data
        });
      })
      .catch(err => console.error('❌ [WALLET] Failed to fetch wallet balance:', err));
  }, [user]);

  const dynamicData = {
    user,
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
      return 'profile';
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
            Hello, {(user?.name || user?.firstName || 'User').split(' ')[0]} ✨
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
                  <div className={`w-14 h-14 rounded-full ${primaryClass} flex items-center justify-center text-xl font-bold shadow-sm`}>
                    {(user?.name || user?.firstName || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-black text-lg leading-tight truncate">{user?.name || user?.firstName || 'User'}</h3>
                  <p className="text-sm text-gray-500 truncate">{user.email || 'No email added'}</p>
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
              </nav>

            </div>
          </div>

          {/* Main Content Area */}
          <div className={`flex-1 min-w-0 ${activeTab === 'menu' ? 'hidden lg:block' : 'block'}`}>
              {/* Back Button for mobile */}
              {activeTab !== 'menu' && (
                <button
                  onClick={() => navigate(`/${theme}`)}
                  className="lg:hidden flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors font-bold text-sm tracking-wider uppercase font-sans"
                >
                  <ChevronRight size={18} className="rotate-180 text-gray-400" /> Back to Home
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
              {activeTab === 'membership' && <MembershipTab key="membership" dynamicData={dynamicData} user={user} />}
              {activeTab === 'offers' && <OffersTab key="offers" dynamicData={dynamicData} />}
              {activeTab === 'reviews' && <ReviewsTab key="reviews" primaryClass={primaryClass} />}
              {activeTab === 'notifications' && <NotificationsTab key="notifications" primaryClass={primaryClass} />}
              {activeTab === 'settings' && <SettingsTab key="settings" primaryClass={primaryClass} />}
              {activeTab === 'security' && <SecurityTab key="security" primaryClass={primaryClass} ringPrimaryClass={ringPrimaryClass} />}
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
              {/* Context-aware recommendations: skincare on skincare site, cosmetics on cosmetics site */}
              {(theme === 'cosmetics' ? cosmeticsProducts : skincareProducts).slice(0, 4).map((prod) => (
                <Link to={`/product/${prod.id}`} key={prod.id} className="block">
                  <motion.div whileHover={{ y: -8 }} className="group relative bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm hover:shadow-[0_15px_40px_rgba(255,0,105,0.1)] overflow-hidden transition-all duration-500">
                    <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden">
                      <img src={resolveProductImage(prod)} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(prod); }} className={`absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-sm ${isInWishlist(prod.id) ? 'text-[#FF0069]' : 'text-gray-400 hover:text-[#FF0069]'}`}>
                        <Heart size={18} fill={isInWishlist(prod.id) ? 'currentColor' : 'none'} />
                      </button>
                      <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(prod); }} className="w-full py-3 bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:opacity-95">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <h4 className="font-bold text-[#1B1B1B] text-base mb-1 truncate">{prod.name}</h4>
                      <p className="font-medium text-[#FF0069]">₹{prod.price}</p>
                    </div>
                  </motion.div>
                </Link>
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
      className={`relative w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 overflow-hidden ${isActive
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
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || user?.phone || '',
    dob: user?.dob ? (user.dob.includes('T') ? user.dob.split('T')[0] : user.dob) : '',
    gender: user?.gender ? user.gender.toLowerCase() : 'female'
  });

  const [beautyProfile, setBeautyProfile] = useState({
    skinType: user?.skinType || 'Combination',
    goals: user?.goals || 'Anti-aging, Hydration',
    favCategory: user?.favCategory || 'Serums & Essences',
    favShade: user?.favShade || 'Rosewood Blush'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Avatar Upload State
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    setProfile({
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || user?.phone || '',
      dob: user?.dob ? (user.dob.includes('T') ? user.dob.split('T')[0] : user.dob) : '',
      gender: user?.gender ? user.gender.toLowerCase() : 'female'
    });
    setBeautyProfile({
      skinType: user?.skinType || 'Combination',
      goals: user?.goals || 'Anti-aging, Hydration',
      favCategory: user?.favCategory || 'Serums & Essences',
      favShade: user?.favShade || 'Rosewood Blush'
    });
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setUploadError('');
    setSuccessMessage('');
    try {
      const data = {
        name: profile.name,
        email: profile.email,
        mobile: profile.mobile,
        dob: profile.dob,
        gender: profile.gender,
        skinType: beautyProfile.skinType,
        goals: beautyProfile.goals,
        favCategory: beautyProfile.favCategory,
        favShade: beautyProfile.favShade
      };

      await updateUserProfile(data);
      setIsEditing(false);
      setSuccessMessage('✓ Profile settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setProfile({
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || user?.phone || '',
      dob: user?.dob ? (user.dob.includes('T') ? user.dob.split('T')[0] : user.dob) : '',
      gender: user?.gender ? user.gender.toLowerCase() : 'female'
    });
    setBeautyProfile({
      skinType: user?.skinType || 'Combination',
      goals: user?.goals || 'Anti-aging, Hydration',
      favCategory: user?.favCategory || 'Serums & Essences',
      favShade: user?.favShade || 'Rosewood Blush'
    });
    setIsEditing(false);
    setUploadError('');
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

  const handleSaveAvatar = async () => {
    if (previewAvatar) {
      setUploadError('');
      setSuccessMessage('');
      try {
        await updateUserProfile({ avatarUrl: previewAvatar });
        setPreviewAvatar(null);
        setSuccessMessage('✓ Profile photo updated successfully!');
        setTimeout(() => setSuccessMessage(''), 4000);
      } catch (err) {
        setUploadError(err.response?.data?.message || 'Failed to update avatar.');
      }
    }
  };

  const handleCancelAvatar = () => {
    setPreviewAvatar(null);
    setUploadError('');
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

      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-8 border-b border-gray-100">
        {/* Avatar with Camera Upload Overlay */}
        <div className="relative group flex-shrink-0">
          {previewAvatar || user.avatarUrl ? (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <img loading="lazy" src={previewAvatar || user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full ${primaryClass} flex items-center justify-center text-4xl font-bold shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-4 border-white`}>
              {(user?.name || user?.firstName || 'U').charAt(0).toUpperCase()}
            </div>
          )}
          {/* Camera upload overlay */}
          <label
            htmlFor="avatarFileInput"
            className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all rounded-full flex items-center justify-center cursor-pointer"
            title="Upload photo"
          >
            <Camera size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
          </label>
          <input
            id="avatarFileInput"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Main Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Crown size={14} /> {dynamicData?.membershipTier || 'Beauty'} Member
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1B1B1B] mb-2">{user?.name || user?.firstName || 'User'}</h2>
          <p className="text-gray-500 font-medium">{user.email || 'No email added'}</p>

          {/* Quick Actions for Avatar */}
          {previewAvatar && (
            <div className="flex gap-3 mt-4 justify-center sm:justify-start">
              <button onClick={handleSaveAvatar} className="px-5 py-2 text-sm font-bold rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white shadow-md hover:-translate-y-0.5 transition-all">Save Photo</button>
              <button onClick={handleCancelAvatar} className="px-5 py-2 text-sm font-bold rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          )}
          {uploadError && <p className="text-xs font-medium text-red-500 mt-2">{uploadError}</p>}
        </div>

        {/* Beauty Progress */}
        <div className="w-full sm:w-auto md:w-64 bg-white/50 rounded-2xl p-5 border border-white shadow-sm flex-shrink-0">
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

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        <StatCard icon={Package} title="Orders" value={dynamicData?.ordersCount || 0} gradient="from-blue-400 to-blue-600" onClick={() => handleTabChange('orders')} />
        <StatCard icon={Heart} title="Wishlist" value={dynamicData?.wishlistCount || 0} gradient="from-pink-400 to-[#FF0069]" onClick={() => handleTabChange('wishlist')} />
        <StatCard icon={Wallet} title="Wallet" value={`₹${(dynamicData?.walletBalance || 0).toFixed(2)}`} gradient="from-emerald-400 to-emerald-600" onClick={() => handleTabChange('wallet')} />
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
                  disabled={!isEditing || field.key === 'mobile'}
                  value={profile[field.key]}
                  onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                  className={`w-full py-3 px-4 border rounded-xl outline-none font-semibold transition-all ${isEditing && field.key !== 'mobile' ? 'bg-white border-[#FF0069]/30 focus:border-[#FF0069] focus:ring-2 focus:ring-[#FF0069]/20 shadow-inner' : 'border-transparent bg-white/50 text-gray-800'}`}
                />
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</label>
              <select disabled={!isEditing} value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className={`w-full py-3 px-4 border rounded-xl outline-none font-semibold transition-all ${isEditing ? 'bg-white border-[#FF0069]/30 focus:border-[#FF0069] focus:ring-2 focus:ring-[#FF0069]/20 shadow-inner' : 'border-transparent bg-white/50 text-gray-800 appearance-none'}`}>
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
                  <select disabled={!isEditing} value={beautyProfile[field.key]} onChange={(e) => setBeautyProfile({ ...beautyProfile, [field.key]: e.target.value })} className={`w-full py-3 px-4 border rounded-xl outline-none font-semibold transition-all ${isEditing ? 'bg-white border-[#FF0069]/30 focus:border-[#FF0069] focus:ring-2 focus:ring-[#FF0069]/20 shadow-inner' : 'border-transparent bg-white/50 text-gray-800 appearance-none'}`}>
                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={beautyProfile[field.key]}
                    onChange={(e) => setBeautyProfile({ ...beautyProfile, [field.key]: e.target.value })}
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
        <div className="mt-8 flex justify-end gap-4">
          <button onClick={() => setIsEditing(false)} disabled={isSaving} className="px-6 py-3 font-bold text-gray-600 hover:text-black transition-colors disabled:opacity-50">Cancel</button>
          <button onClick={handleSaveProfile} disabled={isSaving} className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm disabled:opacity-50">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const { showToast } = useToast();

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.get('/customer/addresses');
      setAddresses(data);
    } catch (err) {
      console.error('Failed to fetch addresses', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSave = async (addressData) => {
    setIsSavingAddress(true);
    console.log('[AddressesTab] Saving address payload:', addressData);
    try {
      if (editingAddress) {
        const res = await apiClient.put(`/customer/addresses/${editingAddress.id}`, addressData);
        console.log('[AddressesTab] Address updated:', res.data);
        showToast('✓ Address updated successfully!', 'success');
      } else {
        const res = await apiClient.post('/customer/addresses', addressData);
        console.log('[AddressesTab] Address saved:', res.data);
        showToast('✓ Address saved successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingAddress(null);
      await fetchAddresses();
    } catch (err) {
      console.error('[AddressesTab] Failed to save address:', err);
      console.error('[AddressesTab] Error response:', err.response?.data);
      const errMsg = err.response?.data?.message || 'Failed to save address. Please try again.';
      showToast(errMsg, 'error');
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/customer/addresses/${id}`);
      setShowDeleteConfirm(null);
      await fetchAddresses();
    } catch (err) {
      console.error('Failed to delete address', err);
    }
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
              <h4 className="font-bold text-lg text-black mb-1">{addr.fullName || addr.name}</h4>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                {addr.addressLine1 || addr.house}
                {(addr.addressLine2 || addr.landmark) && <><br />{addr.addressLine2 || addr.landmark}</>}<br />
                {addr.city}, {addr.state} {addr.pincode || addr.pin}<br />
                Mobile: {addr.phone}
              </p>
              <div className="flex gap-4 pt-4 border-t border-gray-100 mt-auto">
                <button onClick={() => openEditModal(addr)} className="text-sm font-bold text-[#FF0069] hover:underline transition-colors flex items-center gap-1"><Edit2 size={14} /> Edit</button>
                <button onClick={() => setShowDeleteConfirm(addr.id)} className="text-sm font-bold text-red-500 hover:underline transition-colors flex items-center gap-1"><Trash2 size={14} /> Delete</button>
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

// 3. Orders Tab
function OrdersTab({ primaryClass }) {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { theme } = useTheme();
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
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={32} className="text-[#FF0069]" />
          </div>
          <h3 className="text-xl font-heading font-medium text-black mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders. Start exploring our collections!</p>
          <button onClick={() => navigate(`/${theme}`)} className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm">
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
                    <img loading="lazy" src={resolveProductImage(item)} alt={item.variant?.product?.name || item.name || 'Product'} className="w-full h-full object-cover mix-blend-multiply opacity-85" />
                    <div className="absolute bottom-1 right-1 bg-white/90 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-pink-100/30 text-[#FF0069]">
                      x{item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-black text-lg">Order {String(order.id).split('-')[0]}...</h4>
                    <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full 
                    ${order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border border-green-100' :
                        order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border border-red-100' :
                          order.status === 'OUT_FOR_DELIVERY' || order.status === 'SHIPPED' ? 'bg-pink-50 text-[#FF0069] border border-pink-100/50' :
                            'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                      {order.status === 'CANCELLED' ? 'Refund Processing' : order.status}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-500 mb-4">
                    <p><span className="font-medium text-gray-700">Placed:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><span className="font-medium text-gray-700">Total:</span> ₹{order.finalAmount} ({order.paymentMode})</p>
                  </div>
                  {order.items.length === 1 && (
                    <p className="text-sm font-medium text-black line-clamp-1 mb-2 max-w-md">
                      {order.items[0].variant?.product?.name}
                    </p>
                  )}
                  {order.items.length > 1 && (
                    <p className="text-sm font-medium text-black line-clamp-1 mb-2 max-w-md">
                      {order.items[0].variant?.product?.name || order.items[0].name} <span className="text-gray-500 font-normal">and {order.items.length - 1} more items</span>
                    </p>
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

                      {['PLACED', 'Order Placed', 'Order Confirmed', 'PACKED', 'Packed', 'Ready to Ship'].includes(order.status) && (
                        <button
                          onClick={() => handleCancelClick(order)}
                          className="px-5 py-2.5 text-sm font-bold rounded-xl text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
                        >
                          Cancel Order
                        </button>
                      )}

                      {['SHIPPED', 'Shipped', 'Out For Delivery', 'OUT_FOR_DELIVERY'].includes(order.status) && (
                        <button
                          onClick={() => handleCancelClick(order)}
                          className="px-5 py-2.5 text-sm font-bold rounded-xl text-gray-400 bg-pink-50/10 border border-pink-100/10 cursor-not-allowed"
                          title="Cancellation not allowed after shipping"
                        >
                          Cancel Order
                        </button>
                      )}

                      {/* Return/Replace - Allow DELIVERED orders */}
                      {['DELIVERED', 'Delivered'].includes(order.status) && (
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
  const { theme } = useTheme();
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
        <button onClick={() => navigate(`/${theme}`)} className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm font-sans">
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
          const displayName = item.name.startsWith('Fairenne') ? item.name : `Fairenne ${item.name}`;
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
                <img loading="lazy" src={resolveProductImage(item)} alt={displayName} className="w-full h-full object-cover mix-blend-multiply opacity-85 group-hover:scale-105 transition-transform duration-500" />
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
                  <img src={resolveProductImage(quickViewItem)} alt={quickViewItem.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-[#FF0069] uppercase tracking-wider">Fairenne Brand</span>
                  <h3 className="text-lg font-bold text-black mt-1 leading-tight truncate">
                    {quickViewItem.name.startsWith('Fairenne') ? quickViewItem.name : `Fairenne ${quickViewItem.name}`}
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

  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileMobile, setProfileMobile] = useState(user?.mobile || user?.phone || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [previewPhoto, setPreviewPhoto] = useState(user?.avatarUrl || null);

  useEffect(() => {
    setProfileName(user?.name || '');
    setProfileMobile(user?.mobile || user?.phone || '');
    setProfileEmail(user?.email || '');
    setPreviewPhoto(user?.avatarUrl || null);
  }, [user]);

  // Address Settings state
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('fairenne_addresses');
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
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profileName.trim()) {
      alert('Name cannot be empty.');
      return;
    }
    try {
      await updateUserProfile({
        name: profileName,
        mobile: profileMobile,
        email: profileEmail,
        avatarUrl: previewPhoto
      });
      alert('✓ Profile settings saved successfully.');
    } catch (error) {
      console.error(error);
      alert('Failed to save profile settings.');
    }
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

  // Privacy Settings Handler
  const handlePrivacyToggle = async (key, value) => {
    try {
      await apiClient.post('/compliance/consent', { [key]: value });
      if (key === 'recommendationsEnabled') setRecommendationsEnabled(value);
      if (key === 'dataSharingEnabled') setDataSharingEnabled(value);
      if (key === 'cookiesAccepted') setCookiesAccepted(value);
    } catch (err) {
      console.error(err);
      alert('Failed to update privacy settings. Please try again.');
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
    localStorage.setItem('fairenne_addresses', JSON.stringify(updated));
    setIsAddrAdding(false);
    setIsAddrEditing(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('fairenne_addresses', JSON.stringify(updated));
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
    link.download = `fairenne_user_data_${user?.name?.replace(/\s+/g, '_') || 'account'}.json`;
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

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    if (!supportMsg.subject.trim() || !supportMsg.message.trim()) {
      alert('Please fill in both subject and message.');
      return;
    }
    try {
      await apiClient.post('/support/contact', {
        subject: supportMsg.subject,
        message: supportMsg.message
      });
      alert('✓ Your support request has been received. Our team will contact you shortly.');
      setSupportMsg({ subject: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to send support request. Please try again later.');
    }
  };

  const subSectionsList = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'privacy', label: 'Privacy Policy', icon: Key },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
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


        {/* SECURITY VIEW */}
        {subSection === 'security' && (
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Security</h3>
            
            <div className="flex items-center justify-between p-4 border border-pink-100/30 rounded-2xl bg-pink-50/5">
              <div>
                <p className="text-sm font-bold text-black">Two-Factor Authentication (OTP)</p>
                <p className="text-xs text-gray-500 mt-0.5">Require OTP verification when logging in from new devices.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={otpVerifyEnabled} onChange={(e) => setOtpVerifyEnabled(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div>
              <h4 className="text-sm font-bold text-black mb-3">Active Devices</h4>
              <div className="flex flex-col gap-3">
                {devices.map(device => (
                  <div key={device.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                      <Laptop size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-black">{device.name}</p>
                        <p className="text-xs text-gray-500">{device.status}</p>
                      </div>
                    </div>
                    <button onClick={() => handleRevokeDevice(device.id)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* NOTIFICATIONS PREFERENCES VIEW */}
        {subSection === 'notifications' && (
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Notification Preferences</h3>
            <p className="text-xs text-gray-500 -mt-2">Manage communication consent across channels.</p>

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

            <button onClick={() => alert('✓ Notification preferences saved locally.')} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white font-bold text-sm shadow-sm hover:opacity-95 transition-all mt-2">
              Save Preferences
            </button>
          </div>
        )}

        {/* PRIVACY & DATA VIEW */}
        {subSection === 'privacy' && (
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Privacy Policy & Data Control</h3>

            <div className="p-5 border border-pink-100 bg-pink-50/30 rounded-2xl">
              <h4 className="text-sm font-bold text-black mb-3">Fairenne Privacy Policy</h4>
              <div className="h-48 overflow-y-auto pr-2 text-xs text-gray-600 leading-relaxed custom-scrollbar space-y-3">
                <p>
                  <strong>1. Data Collection:</strong> We collect information such as your name, email, phone number, and shipping address when you create an account or place an order. We also collect browsing behavior to offer tailored skincare and cosmetics recommendations.
                </p>
                <p>
                  <strong>2. Use of Information:</strong> The collected data is used exclusively to process your orders, deliver products securely, provide customer support, and enhance your shopping experience on our platform.
                </p>
                <p>
                  <strong>3. Data Protection:</strong> We employ industry-standard encryption protocols to protect your personal data. Payment transactions are processed securely through certified partners, and we do not store your credit card details on our servers.
                </p>
                <p>
                  <strong>4. Third-Party Sharing:</strong> Fairenne strictly respects your privacy. We do not sell, rent, or share your personal data with third-party advertisers. Data is only shared with trusted logistic partners (like ShadowFox) strictly for order fulfillment.
                </p>
                <p>
                  <strong>5. Your Rights:</strong> You retain full control over your data. You can download a copy of your personal data or request permanent deletion of your account at any time from this privacy panel.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-pink-100/30 rounded-2xl bg-pink-50/5">
              <div>
                <p className="text-sm font-bold text-black">Personalized Recommendations</p>
                <p className="text-xs text-gray-500 mt-0.5">Allow tracking of skincare preferences to show tailored matches.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={recommendationsEnabled} onChange={(e) => handlePrivacyToggle('recommendationsEnabled', e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-pink-100/30 rounded-2xl bg-pink-50/5">
              <div>
                <p className="text-sm font-bold text-black">Share Profile Analytics</p>
                <p className="text-xs text-gray-500 mt-0.5">Share usage insights with partners to improve cosmetics formulations.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={dataSharingEnabled} onChange={(e) => handlePrivacyToggle('dataSharingEnabled', e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-pink-100/30 rounded-2xl bg-pink-50/5">
              <div>
                <p className="text-sm font-bold text-black">Marketing Cookies & Scripts</p>
                <p className="text-xs text-gray-500 mt-0.5">Toggle tracking scripts and browser pixel storage.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={cookiesAccepted} onChange={(e) => handlePrivacyToggle('cookiesAccepted', e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF0069]"></div>
              </label>
            </div>

            <div className="border border-red-100 bg-red-50/20 rounded-2xl p-5 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm font-bold text-black">Delete My Account</p>
                <p className="text-xs text-gray-500 mt-0.5">Request account deletion. This action is permanent and cannot be undone.</p>
              </div>
              <button
                onClick={async () => {
                  if (window.confirm("Are you sure you want to request permanent account deletion? This action cannot be undone.")) {
                    try {
                      await apiClient.post('/compliance/data-request', { requestType: 'DELETE' });
                      alert("✓ Account deletion request submitted. Our team will verify and process it within 72 hours.");
                    } catch (err) {
                      console.error(err);
                      alert("Failed to submit account deletion request. Please try again.");
                    }
                  }
                }}
                className="px-5 py-2.5 text-xs font-bold text-red-500 border border-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              >
                Request Deletion
              </button>
            </div>
          </div>
        )}

        {/* HELP & SUPPORT VIEW */}
        {subSection === 'help' && (
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-xl font-heading font-medium text-black border-b border-gray-50 pb-2">Help & Support</h3>
            
            <div className="grid grid-cols-1 gap-4 mb-2">
              <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50 flex items-start gap-3">
                <Mail size={20} className="text-[#FF0069]" />
                <div>
                  <h4 className="text-sm font-bold text-black">Email Support</h4>
                  <p className="text-xs text-gray-500 mt-1">We usually reply within 24 hours</p>
                  <a href="mailto:support@fairenne.com" className="mt-2 text-xs font-bold text-[#FF0069] hover:underline block">support@fairenne.com</a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-black mb-3">Send a Message</h4>
              <form onSubmit={handleSupportSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Subject"
                  value={supportMsg.subject}
                  onChange={(e) => setSupportMsg({...supportMsg, subject: e.target.value})}
                  className="w-full py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] text-sm"
                />
                <textarea
                  placeholder="How can we help you?"
                  rows="4"
                  value={supportMsg.message}
                  onChange={(e) => setSupportMsg({...supportMsg, message: e.target.value})}
                  className="w-full py-2.5 px-4 border border-gray-300 rounded-xl outline-none focus:border-[#FF0069] text-sm resize-none"
                ></textarea>
                <button type="submit" className="w-full sm:w-auto self-start px-6 py-2.5 rounded-xl font-bold bg-[#FF0069] text-white hover:opacity-95 transition-all text-sm">
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="mt-2">
               <button onClick={() => navigate('/faqs')} className="text-sm font-bold text-[#FF0069] flex items-center gap-1 hover:underline">
                 View all FAQs <ArrowUpRight size={16} />
               </button>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}


function ReviewsTab({ primaryClass }) {
  const { user } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const { addToast } = useToast();

  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [reviewingProduct, setReviewingProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const productsMap = new Map();
      orders.forEach(order => {
        if (order.status === 'DELIVERED') {
          order.items?.forEach(item => {
            if (item.product && !productsMap.has(item.product.id)) {
              productsMap.set(item.product.id, item.product);
            }
          });
        }
      });
      setPurchasedProducts(Array.from(productsMap.values()));
    }
  }, [orders]);

  const handleSubmitReview = async () => {
    if (!reviewContent.trim()) {
      addToast('Please write a review comment', 'error');
      return;
    }
    try {
      setIsSubmitting(true);
      await apiClient.post(`/catalog/products/${reviewingProduct.id}/reviews`, {
        rating,
        title: `Review by ${user?.firstName || 'User'}`,
        content: reviewContent
      });
      addToast('Review submitted successfully! Pending admin approval.', 'success');
      setReviewingProduct(null);
      setReviewContent('');
      setRating(5);
    } catch (e) {
      console.error(e);
      addToast(e.response?.data?.message || 'Failed to submit review', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 font-sans">
      <h2 className="text-2xl font-heading font-medium text-black mb-6">Review Your Purchases</h2>

      {ordersLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF0069]"></div>
        </div>
      ) : purchasedProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <MessageSquare className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-heading font-medium text-black mb-2">No Products to Review</h3>
          <p className="text-gray-500 mb-6">You haven't received any delivered orders yet. Purchase and receive products to share your experience!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {purchasedProducts.map(product => (
            <div key={product.id} className="p-4 sm:p-5 border border-gray-100 rounded-2xl flex flex-col items-center text-center hover:border-gray-200 hover:shadow-sm transition-all bg-gray-50/50">
              <img
                src={resolveProductImage(product)}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-xl mb-4 bg-white border border-gray-100 shadow-sm"
              />
              <h4 className="font-bold text-black text-sm mb-4 line-clamp-2">{product.name}</h4>

              {reviewingProduct?.id === product.id ? (
                <div className="w-full bg-white p-4 rounded-xl border border-pink-100 shadow-sm">
                  <div className="flex justify-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl transition-colors ${rating >= star ? 'text-[#FF0069]' : 'text-gray-200 hover:text-pink-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#FF0069]/20"
                    rows="3"
                    placeholder="What did you like or dislike?"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReviewingProduct(null)}
                      className="flex-1 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitReview}
                      className="flex-1 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] rounded-lg shadow-md hover:shadow-lg disabled:opacity-70"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setReviewingProduct(product);
                    setRating(5);
                    setReviewContent('');
                  }}
                  className="w-full py-2.5 px-4 bg-white border border-gray-200 text-black font-bold text-sm rounded-xl shadow-sm hover:border-black transition-colors"
                >
                  Write a Review
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// 8. Notifications Tab
function NotificationsTab({ primaryClass }) {
  const { orders } = useOrders();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotificationsData = async () => {
      try {
        setLoading(true);
        const newNotifications = [];
        let idCounter = 1;

        // 1. Derive notifications from User Orders
        if (orders && orders.length > 0) {
          const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
          recentOrders.forEach(order => {
            let title = 'Order Update';
            let desc = `Your order ${order.orderNumber} is currently ${order.status}.`;
            let read = true;
            let dateStr = new Date(order.createdAt).toLocaleDateString();

            if (order.status === 'DELIVERED') {
              title = 'Order Delivered! 🎉';
              desc = `Your order ${order.orderNumber} has been delivered successfully.`;
              read = false; // Mark delivered as unread to catch attention
            } else if (order.status === 'SHIPPED' || order.status === 'OUT_FOR_DELIVERY') {
              title = 'Order on the way! 🚚';
              desc = `Your order ${order.orderNumber} has been shipped and is on its way.`;
              read = false;
            } else if (order.status === 'CONFIRMED' || order.status === 'PENDING') {
              title = 'Order Confirmed! ✅';
              desc = `We have received your order ${order.orderNumber} and are processing it.`;
            } else if (order.status === 'CANCELLED') {
              title = 'Order Cancelled ❌';
              desc = `Your order ${order.orderNumber} was cancelled.`;
            }

            newNotifications.push({
              id: idCounter++,
              title,
              desc,
              date: dateStr,
              read
            });
          });
        }

        // 2. Fetch available coupons to show as a notification
        try {
          const couponsRes = await apiClient.get('/cart/coupon/available');
          const coupons = couponsRes.data || [];
          if (coupons.length > 0) {
            const coupon = coupons[0];
            newNotifications.push({
              id: idCounter++,
              title: 'Exclusive Offer for you! 🎁',
              desc: `Use code ${coupon.code} to get ${coupon.discountType === 'PERCENTAGE' ? coupon.discountValue + '%' : '₹' + coupon.discountValue} off. Don't miss out!`,
              date: 'New',
              read: false
            });
          }
        } catch (e) {
          console.error("Failed to fetch coupons for notifications", e);
        }

        // 3. Fallback Welcome Notification
        if (newNotifications.length === 0) {
          newNotifications.push({
            id: idCounter++,
            title: 'Welcome to Fairenne! ✨',
            desc: 'Thank you for joining our exclusive beauty community. Explore our collections!',
            date: 'System',
            read: true
          });
        }

        // Sort notifications: Unread first
        newNotifications.sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1));

        setNotifications(newNotifications);
      } catch (err) {
        console.error('Failed to generate notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationsData();
  }, [orders]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-medium text-black">Notifications</h2>
        {notifications.some(n => !n.read) && (
          <button onClick={markAllAsRead} className="text-sm font-bold text-[#FF0069] hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF0069]"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <Bell className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-heading font-medium text-black mb-2">No Notifications</h3>
          <p className="text-gray-500 mb-6">You are all caught up!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {notifications.map(item => (
            <div key={item.id} className={`p-4 sm:p-5 rounded-2xl border transition-colors flex gap-4 items-start ${item.read ? 'bg-white border-gray-100' : 'bg-pink-50/30 border-pink-100/50'}`}>
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 transition-colors ${item.read ? 'bg-transparent' : 'bg-[#FF0069]'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 gap-4">
                  <h4 className={`font-bold text-sm sm:text-base leading-tight ${item.read ? 'text-gray-700' : 'text-black'}`}>{item.title}</h4>
                  <span className="text-xs text-gray-400 shrink-0 mt-0.5">{item.date}</span>
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
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const { data } = await apiClient.get('/wallet');
        setWallet(data);
        console.log('💰 [WALLET TAB] Wallet data fetched from backend:', {
          walletId: data?.id,
          balance: data?.balance,
          transactionsCount: data?.transactions?.length || 0,
          creditTransactions: (data?.transactions || []).filter(t => t.type === 'CREDIT').length,
          debitTransactions: (data?.transactions || []).filter(t => t.type === 'DEBIT').length,
          fullData: data
        });
      } catch (err) {
        console.error('❌ [WALLET TAB] Failed to fetch wallet:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  if (loading) {
    return <div className="p-8 text-center"><div className="w-8 h-8 border-4 border-[#FF0069] border-t-transparent rounded-full animate-spin mx-auto"></div></div>;
  }

  const transactions = wallet?.transactions || [];
  const filteredTransactions = filter === 'All' ? transactions : transactions.filter(t =>
    filter === 'Credit' ? t.type === 'CREDIT' : t.type === 'DEBIT'
  );

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
          <h3 className="text-5xl font-black mb-1">₹{wallet?.balance !== undefined && wallet?.balance !== null ? Number(wallet.balance).toFixed(2) : '0.00'}</h3>
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
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Reference</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTransactions.map(t => (
              <tr key={t.id} className="hover:bg-pink-50/10 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-gray-900 text-sm">{new Date(t.createdAt).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">{t.id.slice(0, 8)}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'CREDIT' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {t.type === 'CREDIT' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                    </span>
                    <span className="font-medium text-gray-700 text-sm">{t.reference}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`font-black ${t.type === 'CREDIT' ? 'text-green-600' : 'text-gray-900'}`}>
                    {t.type === 'CREDIT' ? '+' : '-'}₹{t.amount}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Completed</span>
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function BonusesTab() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const { data } = await apiClient.get('/wallet');
        setWallet(data);
        const bonusTransactions = (data?.transactions || []).filter(t => t.type === 'CREDIT');
        console.log('🎁 [BONUSES TAB] Wallet fetched from backend:', {
          walletId: data?.id,
          balance: data?.balance,
          totalBonusCredits: bonusTransactions.length,
          bonuses: bonusTransactions.map(t => ({
            id: t.id,
            reference: t.reference,
            amount: t.amount,
            date: t.createdAt
          })),
          fullData: data
        });
      } catch (err) {
        console.error('❌ [BONUSES TAB] Failed to fetch wallet:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  // Map backend wallet CREDIT transactions → bonus cards
  const bonusTransactions = (wallet?.transactions || []).filter(t => t.type === 'CREDIT');

  // Bonus label icons config
  const bonusConfig = {
    'Sign-up Bonus': { icon: '🎉', statusLabel: 'Claimed', statusColor: 'bg-blue-50 text-blue-700 border-blue-100' },
    'First Order Bonus': { icon: '🛍️', statusLabel: 'Claimed', statusColor: 'bg-green-50 text-green-700 border-green-100' },
    'Referral Bonus': { icon: '👥', statusLabel: 'Credited', statusColor: 'bg-pink-50 text-[#FF0069] border-pink-100' },
    'Referred Sign-up Bonus': { icon: '🤝', statusLabel: 'Credited', statusColor: 'bg-pink-50 text-[#FF0069] border-pink-100' },
  };

  const getConfig = (reference) => {
    for (const key of Object.keys(bonusConfig)) {
      if (reference?.toLowerCase().includes(key.toLowerCase())) return bonusConfig[key];
    }
    if (reference?.toLowerCase().includes('refund')) return { icon: '↩️', statusLabel: 'Refunded', statusColor: 'bg-yellow-50 text-yellow-700 border-yellow-100' };
    return { icon: '💰', statusLabel: 'Credited', statusColor: 'bg-green-50 text-green-700 border-green-100' };
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-4 border-[#FF0069] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 text-sm mt-3">Loading bonuses...</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6 font-sans">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white">
        <h2 className="text-2xl font-heading font-medium text-black">My Bonuses</h2>
        <p className="text-gray-500 text-sm mt-1">Your earned bonuses and credits from Fairenne rewards program.</p>
      </div>

      {bonusTransactions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
          <Gift size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">No bonuses yet</p>
          <p className="text-gray-400 text-sm mt-1">Place your first order or refer a friend to earn bonuses!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bonusTransactions.map((t) => {
            const cfg = getConfig(t.reference);
            const dateStr = new Date(t.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
            return (
              <div key={t.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-[#FF0069]/30 transition-colors flex flex-col h-full relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#FF0069]/10 text-2xl">
                    {cfg.icon}
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${cfg.statusColor}`}>
                    {cfg.statusLabel}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-500 mb-1">{t.reference}</p>
                  <h3 className="text-2xl font-black text-black">+₹{Number(t.amount).toFixed(2)}</h3>
                </div>

                <div className="mt-auto border-t border-gray-100 pt-4 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Clock size={14} /> Credited on: {dateStr}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}


function ReferralTab() {
  const { user } = useAuth();
  const [referralData, setReferralData] = useState(null);
  const [referralTx, setReferralTx] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);

  // Apply code state
  const [inputCode, setInputCode] = useState('');
  const [applyStatus, setApplyStatus] = useState(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchReferralAndStats = async () => {
      try {
        const { data } = await apiClient.get('/referral/my-code');
        setReferralData(data);
        console.log('✨ [REFERRAL TAB] Referral code fetched from backend:', {
          referralCode: data?.referralCode,
          referrerId: data?.referrerId,
          fullData: data
        });

        // Fetch wallet to compute real referral earnings & history
        try {
          const walletRes = await apiClient.get('/wallet');
          const refTx = (walletRes.data?.transactions || []).filter(t =>
            t.type === 'CREDIT' && t.reference?.toLowerCase().includes('referral')
          );
          setReferralTx(refTx);
          console.log('💰 [REFERRAL TAB] Referral reward transactions from backend wallet:', {
            totalEarnings: refTx.reduce((sum, t) => sum + Number(t.amount || 0), 0),
            successfulCount: refTx.length,
            transactions: refTx
          });
        } catch (wErr) {
          console.error('❌ [REFERRAL TAB] Failed to fetch wallet history for referral stats:', wErr);
        }
      } catch (err) {
        console.error('❌ [REFERRAL TAB] Failed to fetch referral code:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReferralAndStats();
  }, []);

  const referralCode = referralData?.referralCode || 'FAIRENNE-BEAUTY';
  const totalEarnings = referralTx.reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const successfulCount = referralTx.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral Code Copied!');
  };

  const shareText = `✨ Join Fairenne and discover luxury skincare & cosmetics.\n\nUse my referral code:\n${referralCode}\n\nSign up and enjoy exclusive rewards.\n\nhttps://yourdomain.com/referral/${referralCode}`;

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Fairenne',
          text: shareText,
        });
        return;
      } catch (err) {
        console.log('Native share failed', err);
      }
    }
    setIsShareSheetOpen(true);
  };

  const handleApplyCode = async (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setApplying(true);
    setApplyStatus(null);
    try {
      console.log('✨ [REFERRAL TAB] Applying referral code on backend (POST /referral/apply):', { code: inputCode.trim() });
      const { data } = await apiClient.post('/referral/apply', { code: inputCode.trim() });
      console.log('✅ [REFERRAL TAB] Referral code applied successfully:', data);
      setApplyStatus({ type: 'success', msg: 'Referral code applied successfully! Bonus rewards unlocked.' });
      setInputCode('');
    } catch (err) {
      console.error('❌ [REFERRAL TAB] Error applying referral code:', err);
      const errMsg = err.response?.data?.message || 'Invalid or already used referral code.';
      setApplyStatus({ type: 'error', msg: errMsg });
    } finally {
      setApplying(false);
    }
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
    { name: 'Gmail', icon: Mail, color: 'bg-[#EA4335] text-white', url: (text) => `mailto:?subject=Join Fairenne&body=${encodeURIComponent(text)}` },
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

      {/* Apply Friend's Code Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-black mb-2">Have a Referral Code?</h3>
        <p className="text-gray-500 text-sm mb-4">Enter a friend&apos;s referral code to unlock your welcome bonus.</p>
        <form onSubmit={handleApplyCode} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            placeholder="ENTER CODE (e.g. A1B2C3)"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-black uppercase tracking-wider focus:outline-none focus:border-[#FF0069]"
          />
          <button
            type="submit"
            disabled={applying || !inputCode.trim()}
            className="bg-black hover:bg-gray-900 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-sm"
          >
            {applying ? 'Applying...' : 'Apply Code'}
          </button>
        </form>
        {applyStatus && (
          <p className={`text-xs font-bold mt-3 ${applyStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {applyStatus.msg}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#FF0069]/5 to-transparent border border-pink-100 rounded-3xl p-6 text-center">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Total Earnings</p>
          <h3 className="text-4xl font-black text-[#FF0069]">₹{totalEarnings.toFixed(2)}</h3>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Successful</p>
          <h3 className="text-4xl font-black text-black">{successfulCount}</h3>
          <p className="text-xs text-green-600 font-bold mt-1">Friends joined</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Bonus Per Friend</p>
          <h3 className="text-4xl font-black text-black">₹100</h3>
          <p className="text-xs text-gray-500 font-bold mt-1">Instant Wallet Credit</p>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-[#FF0069]/10 rounded-full flex items-center justify-center text-[#FF0069] mb-4">
          <Share2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-black mb-2">Your Unique Referral Code</h3>
        <p className="text-gray-500 text-sm mb-6 max-w-md">Share this code with your friends to give them rewards on their sign up. You earn ₹100 for every successful referral.</p>

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
        {referralTx.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-sm font-medium">
            No referral rewards yet. Share your code to start earning ₹100 per friend!
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {referralTx.map((ref, idx) => (
              <div key={ref.id || idx} className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center font-bold text-[#FF0069] text-sm">
                    🤝
                  </div>
                  <div>
                    <p className="font-bold text-sm text-black">{ref.reference || 'Referral Bonus'}</p>
                    <p className="text-xs text-gray-500">{new Date(ref.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-green-600">+₹{Number(ref.amount || 100).toFixed(2)}</p>
                  <p className="text-xs font-bold text-gray-500">Credited to Wallet</p>
                </div>
              </div>
            ))}
          </div>
        )}
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

function RewardPointsTab() {
  const [rewardData, setRewardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const { data } = await apiClient.get('/reward-point');
        setRewardData(data);
        console.log('🏆 [REWARDS TAB] Reward Points fetched from backend:', {
          balance: data?.balance || 0,
          storeCreditValue: `₹${((data?.balance || 0) * 0.1).toFixed(2)}`,
          lifetimeEarned: (data?.history || []).filter(h => h.type === 'EARN').reduce((sum, h) => sum + Number(h.points || 0), 0),
          totalRedeemed: (data?.history || []).filter(h => h.type === 'REDEEM').reduce((sum, h) => sum + Math.abs(Number(h.points || 0)), 0),
          historyCount: (data?.history || []).length,
          history: data?.history || [],
          fullData: data
        });
      } catch (err) {
        console.error('❌ [REWARDS TAB] Failed to fetch reward points:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  const balance = rewardData?.balance || 0;
  const history = rewardData?.history || [];

  const lifetimeEarned = history.filter(h => h.type === 'EARN').reduce((sum, h) => sum + Number(h.points || 0), 0);
  const totalRedeemed = history.filter(h => h.type === 'REDEEM').reduce((sum, h) => sum + Math.abs(Number(h.points || 0)), 0);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-4 border-[#FF0069] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 text-sm mt-3">Loading reward points...</p>
      </div>
    );
  }

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
          <h3 className="text-4xl font-black mb-4">{balance.toLocaleString()}</h3>
          <p className="text-sm font-medium">Equal to ₹{(balance * 0.1).toFixed(2)} store credit</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Lifetime Earned</p>
              <h4 className="text-2xl font-black text-black">{lifetimeEarned.toLocaleString()} <span className="text-sm font-bold text-gray-400">pts</span></h4>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Redeemed</p>
              <h4 className="text-2xl font-black text-black">{totalRedeemed.toLocaleString()} <span className="text-sm font-bold text-gray-400">pts</span></h4>
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
          <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2"><Plus size={18} className="text-[#FF0069]" /> Ways to Earn</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Make a purchase</span>
              <span className="font-bold text-[#FF0069]">1 pt / ₹150</span>
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
          <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2"><Gift size={18} className="text-[#FF0069]" /> Ways to Redeem</h3>
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
          {history.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-sm font-medium">
              No reward points history yet. Earn points automatically on every Fairenne order!
            </div>
          ) : (
            history.map((hist, idx) => (
              <div key={hist.id || idx} className="flex justify-between items-center py-4">
                <div>
                  <p className="font-bold text-sm text-black">{hist.reference || hist.description || hist.reason || 'Reward Points'}</p>
                  <p className="text-xs text-gray-500">{new Date(hist.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <p className={`font-black text-sm ${hist.type === 'EARN' ? 'text-green-600' : 'text-gray-900'}`}>
                  {hist.type === 'EARN' ? '+' : '-'}{Math.abs(Number(hist.points || 0))} pts
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
// 9. Membership Tab
// 9. Membership Tab - STRICT PURCHASE-ONLY IMPLEMENTATION
function MembershipTab({ dynamicData, user: propUser }) {
  const navigate = useNavigate();
  const user = propUser || dynamicData?.user || { email: 'guest' };
  const { skincareMembership, cosmeticsMembership } = dynamicData || {};
  const [selectedCategory, setSelectedCategory] = useState('skincare');
  const [selectedBenefitsModal, setSelectedBenefitsModal] = useState(null);

  const MEMBERSHIP_TIERS = [
    {
      id: 'silver',
      title: 'Silver',
      price: 299,
      tag: '',
      benefits: [
        '1.5x Reward Points on All Purchases',
        '10% Member Discount on All Products',
        'Priority Customer Support',
        'Exclusive Birthday Coupon'
      ]
    },
    {
      id: 'gold',
      title: 'Gold',
      price: 699,
      tag: 'Recommended',
      benefits: [
        '2x Reward Points on All Purchases',
        '15% Member Discount on All Products',
        'Free Express Shipping on Orders',
        'Priority Customer Support',
        'Luxury Birthday Skincare Gift',
        'Early Access to New Products'
      ]
    },
    {
      id: 'platinum',
      title: 'Platinum',
      price: 1299,
      tag: 'VIP',
      benefits: [
        '3x Reward Points on All Purchases',
        '20% Discount on All Orders',
        'Free Express Shipping Everywhere',
        '24/7 Dedicated VIP Support',
        'Premium Birthday & Anniversary Gift',
        'VIP Event & Masterclass Invitations',
        'Early Launch & Limited Edition Access',
        'Dedicated Personal Beauty Consultant'
      ]
    }
  ];

  const handleContinue = (tier) => {
    navigate('/membership/checkout', {
      state: {
        tierId: tier.id,
        tier: {
          id: tier.id,
          title: tier.title,
          price: tier.price,
          tag: tier.tag || '',
          benefitsText: tier.benefits
        },
        activeType: selectedCategory,
        membershipName: `Fairenne ${selectedCategory === 'skincare' ? 'Skincare' : 'Cosmetics'} ${tier.title} Membership`,
        price: tier.price,
        duration: '1 Year (365 Days)',
        benefitsText: tier.benefits
      }
    });
    window.scrollTo(0, 0);
  };

  const handleUpgradeToTier = (tierTitle, categoryType) => {
    const targetTier = MEMBERSHIP_TIERS.find(t => t.title.toLowerCase() === tierTitle.toLowerCase()) || MEMBERSHIP_TIERS[1];
    navigate('/membership/checkout', {
      state: {
        tierId: targetTier.id,
        tier: targetTier,
        activeType: categoryType,
        membershipName: `Fairenne ${categoryType === 'skincare' ? 'Skincare' : 'Cosmetics'} ${targetTier.title} Membership`,
        price: targetTier.price,
        duration: '1 Year (365 Days)',
        benefitsText: targetTier.benefits
      }
    });
    window.scrollTo(0, 0);
  };

  const hasSkincare = !!skincareMembership;
  const hasCosmetics = !!cosmeticsMembership;

  // CASE 1: NEW USER (Never Purchased any Membership)
  if (!hasSkincare && !hasCosmetics) {
    const activeTabFont = fonts[selectedCategory] || fonts.skincare;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col gap-6 account-membership-container"
        style={{ fontFamily: activeTabFont.body }}
      >
        <style>{`
          .account-membership-container h1,
          .account-membership-container h2,
          .account-membership-container h3,
          .account-membership-container h4 {
            font-family: ${activeTabFont.heading} !important;
          }
        `}</style>
        {/* Notice Banner */}
        <div className="bg-gradient-to-r from-[#FFF0F3] via-[#FFE5EC] to-[#FFF0F3] border border-[#FF0069]/20 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#FF0069] text-3xl shrink-0 shadow-inner">
            ✨
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-[#1B1B1B]">
              You don't have an active membership.
            </h2>
            <p className="text-sm md:text-base font-medium text-gray-600 mt-1">
              Select a luxury Fairenne membership tier below to unlock member pricing, reward point multipliers, early access, and free shipping.
            </p>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex justify-center mt-2">
          <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 inline-flex shadow-sm">
            <button
              type="button"
              onClick={() => setSelectedCategory('skincare')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${selectedCategory === 'skincare'
                  ? 'bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#1B1B1B]'
                }`}
            >
              <span>🌿 Skincare Membership</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('cosmetics')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${selectedCategory === 'cosmetics'
                  ? 'bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#1B1B1B]'
                }`}
            >
              <span>💄 Cosmetics Membership</span>
            </button>
          </div>
        </div>

        {/* Three Membership Cards: Silver, Gold, Platinum */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {MEMBERSHIP_TIERS.map((tier) => {
            const isGold = tier.id === 'gold';
            const isPlatinum = tier.id === 'platinum';
            return (
              <div
                key={tier.id}
                className={`rounded-[2.5rem] p-8 flex flex-col justify-between border shadow-sm transition-all duration-300 hover:-translate-y-1 ${isGold
                    ? 'bg-gradient-to-b from-[#FFF5F8] to-white border-[#FF0069]/30 shadow-[0_12px_35px_rgba(255,0,105,0.08)]'
                    : isPlatinum
                      ? 'bg-gradient-to-br from-[#70003C] via-[#9B0054] to-[#C7006C] text-white border-white/30'
                      : 'bg-white border-gray-200'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full ${isGold
                        ? 'bg-[#FF0069] text-white'
                        : isPlatinum
                          ? 'bg-gradient-to-r from-[#FFE599] to-[#FFDA66] text-[#70003C]'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                      {tier.title}
                    </span>
                    {tier.tag && (
                      <span className="text-xs font-bold opacity-80 uppercase tracking-widest">
                        {tier.tag}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-2xl font-black mb-2 ${isPlatinum ? 'text-white' : 'text-[#1B1B1B]'}`}>
                    Fairenne {selectedCategory === 'skincare' ? 'Skincare' : 'Cosmetics'} {tier.title} Membership
                  </h3>

                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-3xl font-black">₹{tier.price}</span>
                    <span className="text-sm opacity-70 mb-1">/ Year (365 Days)</span>
                  </div>

                  <hr className={`my-6 ${isPlatinum ? 'border-white/10' : 'border-gray-100'}`} />

                  <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isPlatinum ? 'text-gray-400' : 'text-gray-400'}`}>
                    Included Features
                  </p>
                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium">
                        <span className={`shrink-0 mt-0.5 ${isGold ? 'text-[#FF0069]' : isPlatinum ? 'text-[#FFDA66]' : 'text-gray-600'}`}>
                          ✓
                        </span>
                        <span className="leading-tight opacity-95">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleContinue(tier);
                  }}
                  className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${isGold
                      ? 'bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] text-white shadow-[0_8px_20px_rgba(255,0,105,0.25)] hover:opacity-95'
                      : isPlatinum
                        ? 'bg-gradient-to-r from-[#FFE599] to-[#FFDA66] text-[#1B1B1B] hover:opacity-95'
                        : 'bg-gradient-to-r from-[#70003C] to-[#990052] text-white hover:opacity-95'
                    }`}
                >
                  <span>Continue</span>
                  <span>→</span>
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // CASE 2: USER HAS ACTIVE MEMBERSHIP (After Successful Purchase)
  const allMemberships = JSON.parse(localStorage.getItem('fairenne_memberships') || '{}');
  const currentEmail = user?.email || 'guest';
  const userMemObj = allMemberships[currentEmail] || {};
  const historyList = userMemObj.history || [];

  // Synthesize history fallback if history array is missing but active membership exists
  const displayHistory = historyList.length > 0 ? historyList : [
    hasSkincare && {
      id: skincareMembership.id || 'MEM-CSK-10294',
      purchaseDate: skincareMembership.since || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      expiryDate: skincareMembership.validTill || skincareMembership.expiry || '30 July 2027',
      amountPaid: `₹${MEMBERSHIP_TIERS.find(t => t.title === skincareMembership.tier)?.price || 699}`,
      transactionId: skincareMembership.transactionId || 'TXN-CSK-892104',
      membershipType: `Fairenne Skincare ${skincareMembership.tier} Membership`,
      tier: skincareMembership.tier
    },
    hasCosmetics && {
      id: cosmeticsMembership.id || 'MEM-CSK-93812',
      purchaseDate: cosmeticsMembership.since || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      expiryDate: cosmeticsMembership.validTill || cosmeticsMembership.expiry || '30 July 2027',
      amountPaid: `₹${MEMBERSHIP_TIERS.find(t => t.title === cosmeticsMembership.tier)?.price || 699}`,
      transactionId: cosmeticsMembership.transactionId || 'TXN-CSK-492810',
      membershipType: `Fairenne Cosmetics ${cosmeticsMembership.tier} Membership`,
      tier: cosmeticsMembership.tier
    }
  ].filter(Boolean);

  const renderActiveCard = (title, emoji, membership, colorScheme, categoryType) => {
    const isExpired = membership.status === 'Expired';
    const tierName = membership.tier || 'Gold';

    return (
      <div key={title} className={`bg-gradient-to-br ${colorScheme.bg} rounded-3xl p-8 ${colorScheme.text} shadow-[0_15px_40px_rgba(255,0,105,0.15)] relative overflow-hidden flex-1 flex flex-col justify-between`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl drop-shadow-sm">{emoji}</span>
              <span className="bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
              <div className={`w-2 h-2 rounded-full ${isExpired ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`} />
              <span>{isExpired ? 'Expired' : 'Active Status'}</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-2">
            Fairenne {categoryType === 'skincare' ? 'Skincare' : 'Cosmetics'} {tierName} Membership
          </h2>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm opacity-90 font-medium mb-6">
            <span>Valid till: <strong className="font-bold">{membership.validTill || membership.expiry || '30 July 2027'}</strong></span>
            <span>ID: <strong className="font-bold">{membership.id || 'MEM-CSK-8910'}</strong></span>
            <span>Purchased: <strong className="font-bold">{membership.since || '30 July 2026'}</strong></span>
          </div>
        </div>

        <div className="relative z-10 pt-5 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
          {/* View Benefits button */}
          <button
            type="button"
            onClick={() => setSelectedBenefitsModal({ tierName, title })}
            className="text-xs md:text-sm font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-full transition-all shadow-sm border border-white/20"
          >
            View Benefits
          </button>

          {/* Upgrade System & Renew System */}
          <div className="flex flex-wrap gap-2">
            {isExpired ? (
              <button
                type="button"
                onClick={() => handleUpgradeToTier(tierName, categoryType)}
                className="text-xs md:text-sm font-bold bg-white text-[#1B1B1B] px-5 py-2.5 rounded-full transition-all shadow-md hover:bg-gray-100"
              >
                Renew Membership
              </button>
            ) : tierName.toLowerCase() === 'silver' ? (
              <>
                <button
                  type="button"
                  onClick={() => handleUpgradeToTier('Gold', categoryType)}
                  className="text-xs font-bold bg-white/90 text-[#FF0069] px-4 py-2 rounded-full transition-all shadow-sm hover:bg-white"
                >
                  Upgrade to Gold
                </button>
                <button
                  type="button"
                  onClick={() => handleUpgradeToTier('Platinum', categoryType)}
                  className="text-xs font-bold bg-gradient-to-r from-[#70003C] to-[#990052] text-[#FFDA66] px-4 py-2 rounded-full transition-all shadow-sm hover:opacity-95"
                >
                  Upgrade to Platinum
                </button>
              </>
            ) : tierName.toLowerCase() === 'gold' ? (
              <button
                type="button"
                onClick={() => handleUpgradeToTier('Platinum', categoryType)}
                className="text-xs md:text-sm font-bold bg-gradient-to-r from-[#70003C] to-[#990052] text-[#FFDA66] px-5 py-2.5 rounded-full transition-all shadow-sm hover:opacity-95"
              >
                Upgrade to Platinum
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-black bg-gradient-to-r from-[#FFE599] to-[#FFDA66] text-[#70003C] px-5 py-2.5 rounded-full shadow-sm">
                Highest Membership Achieved 👑
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const activeMemFont = fonts[hasSkincare ? 'skincare' : 'cosmetics'] || fonts.skincare;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-8 account-membership-active-container"
      style={{ fontFamily: activeMemFont.body }}
    >
      <style>{`
        .account-membership-active-container h1,
        .account-membership-active-container h2,
        .account-membership-active-container h3,
        .account-membership-active-container h4 {
          font-family: ${activeMemFont.heading} !important;
        }
      `}</style>
      {/* Active Membership Cards */}
      <div className={`flex flex-col ${hasSkincare && hasCosmetics ? 'lg:flex-row' : ''} gap-6`}>
        {hasSkincare && renderActiveCard(
          'Skincare Membership',
          '🌿',
          skincareMembership,
          { bg: 'from-[#FF0069] to-[#FF758C]', text: 'text-white' },
          'skincare'
        )}

        {hasCosmetics && renderActiveCard(
          'Cosmetics Membership',
          '💄',
          cosmeticsMembership,
          { bg: 'from-[#70003C] to-[#9B0054]', text: 'text-white' },
          'cosmetics'
        )}
      </div>

      {/* View Benefits Modal */}
      {selectedBenefitsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-6 md:p-8 max-w-lg w-full shadow-2xl border border-gray-100 text-left relative"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-xl md:text-2xl font-black text-[#1B1B1B]">
                Fairenne {selectedBenefitsModal.tierName} Benefits
              </h3>
              <button
                type="button"
                onClick={() => setSelectedBenefitsModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            <ul className="space-y-4 mb-8">
              {(
                MEMBERSHIP_TIERS.find(t => t.title.toLowerCase() === selectedBenefitsModal.tierName.toLowerCase())?.benefits || [
                  'Free Shipping on all orders',
                  'Reward Point multiplier',
                  'Exclusive birthday surprises',
                  'Early access to limited editions'
                ]
              ).map((ben, index) => (
                <li key={index} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-[#FF0069]/10 text-[#FF0069] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{ben}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setSelectedBenefitsModal(null)}
              className="w-full py-3.5 rounded-xl bg-[#FF0069] text-white font-bold text-sm shadow-md hover:opacity-95"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* MEMBERSHIP HISTORY SECTION */}
      <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-200">
        <h3 className="text-xl font-heading font-bold text-[#1B1B1B] mb-6">Membership History</h3>

        {displayHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Purchase Date</th>
                  <th className="py-3 px-4">Expiry Date</th>
                  <th className="py-3 px-4">Amount Paid</th>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Membership Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                {displayHistory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">{row.purchaseDate}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{row.expiryDate}</td>
                    <td className="py-4 px-4 whitespace-nowrap font-bold text-[#FF0069]">{row.amountPaid}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-gray-500 font-mono text-xs">{row.transactionId}</td>
                    <td className="py-4 px-4 font-bold text-[#1B1B1B]">{row.membershipType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500 font-medium">No membership transaction history yet.</p>
        )}
      </div>
    </motion.div>
  );
}

function OffersTab() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        // 1. Fetch available coupons
        const couponsRes = await apiClient.get('/cart/coupon/available').catch(() => ({ data: [] }));
        const mappedCoupons = (couponsRes.data || []).map(coupon => ({
          code: coupon.code,
          desc: coupon.discountType === 'PERCENTAGE'
            ? `Flat ${coupon.discountValue}% off` + (coupon.minPurchase ? ` on orders above ₹${coupon.minPurchase}` : '')
            : `Flat ₹${coupon.discountValue} off` + (coupon.minPurchase ? ` on orders above ₹${coupon.minPurchase}` : ''),
          expiry: coupon.endDate ? `Ends ${new Date(coupon.endDate).toLocaleDateString()}` : 'No Expiry',
          type: 'Coupon',
          id: coupon.id
        }));

        // 2. Fetch sitewide tiered offers
        const offersRes = await apiClient.get('/offer/active').catch(() => ({ data: [] }));
        let mappedOffers = [];
        if (Array.isArray(offersRes.data)) {
          mappedOffers = offersRes.data.map(milestone => ({
            code: 'AUTO-APPLIED',
            desc: `Spend ₹${milestone.targetAmount} to get ${milestone.reward}`,
            expiry: 'Active Offer',
            type: 'Sitewide',
            id: milestone.offer?.id || Math.random()
          }));
        }

        setOffers([...mappedCoupons, ...mappedOffers]);
      } catch (err) {
        console.error("Error fetching offers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6 font-sans">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white">
        <h2 className="text-2xl font-heading font-medium text-black">Special Offers & Deals</h2>
        <p className="text-gray-500 text-sm mt-1">Exclusive coupons and personalized deals just for you.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : offers.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-3xl shadow-sm border border-pink-100">
          <p className="text-gray-500">No active offers available right now. Check back later!</p>
        </div>
      ) : (
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
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Clock size={12} /> {offer.expiry}</span>
                  {offer.code !== 'AUTO-APPLIED' && (
                    <button onClick={() => { navigator.clipboard.writeText(offer.code); alert('Coupon Copied!'); }} className="text-sm font-bold text-[#FF0069] hover:underline">
                      Copy Code
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

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
