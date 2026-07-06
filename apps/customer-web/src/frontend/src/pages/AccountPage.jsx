import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Heart, MapPin, Settings, Shield, LogOut, ChevronRight, Edit2, Plus, Trash2, CheckCircle2, Mail, X, AlertCircle } from 'lucide-react';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (!user) {
      navigate(`/${theme}`);
    }
  }, [user, navigate, theme]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  if (!user) return null;

  // Theming
  const bgClass = "bg-gray-50/50";
  const primaryClass = "bg-theme-primary text-white";
  const textPrimaryClass = "text-theme-primary";
  const ringPrimaryClass = "focus:ring-theme-primary";
  const borderPrimaryClass = "border-theme-primary";

  return (
    <div className={`min-h-screen ${bgClass} pt-32 pb-20 font-body`}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-medium text-black mb-2">My Account</h1>
          <p className="text-gray-500">Manage your profile, orders, and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 sticky top-32">
              
              {/* User Mini Card */}
              <div className="flex items-center gap-4 p-4 border-b border-gray-100 mb-4">
                <div className={`w-14 h-14 rounded-full ${primaryClass} flex items-center justify-center text-xl font-bold shadow-sm`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg leading-tight">{user.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{user.email || 'No email added'}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-1">
                <SidebarItem icon={User} label="My Profile" id="profile" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Package} label="My Orders" id="orders" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Heart} label="Wishlist" id="wishlist" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={MapPin} label="Addresses" id="addresses" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Settings} label="Settings" id="settings" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
                <SidebarItem icon={Shield} label="Security" id="security" activeTab={activeTab} onClick={handleTabChange} themeClass={bgClass} textPrimaryClass={textPrimaryClass} />
              </nav>

            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && <ProfileTab key="profile" user={user} primaryClass={primaryClass} ringPrimaryClass={ringPrimaryClass} />}
              {activeTab === 'addresses' && <AddressesTab key="addresses" primaryClass={primaryClass} textPrimaryClass={textPrimaryClass} />}
              {activeTab === 'orders' && <OrdersTab key="orders" primaryClass={primaryClass} />}
              {activeTab === 'wishlist' && <WishlistTab key="wishlist" primaryClass={primaryClass} />}
              {activeTab === 'settings' && <SettingsTab key="settings" primaryClass={primaryClass} />}
              {activeTab === 'security' && <SecurityTab key="security" logout={logout} />}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// SIDEBAR ITEM
// ---------------------------------------------------------
function SidebarItem({ icon: Icon, label, id, activeTab, onClick, themeClass, textPrimaryClass }) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${isActive ? `${themeClass} font-bold text-black` : 'text-gray-600 hover:bg-gray-50 hover:text-black font-medium'}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={isActive ? textPrimaryClass : 'text-gray-400'} />
        <span>{label}</span>
      </div>
      {isActive && <ChevronRight size={16} className={textPrimaryClass} />}
    </button>
  );
}


// ---------------------------------------------------------
// TABS
// ---------------------------------------------------------

// 1. Profile Tab
function ProfileTab({ user, primaryClass, ringPrimaryClass }) {
  const [profile, setProfile] = useState({
    name: user.name || '',
    email: user.email || '',
    mobile: user.mobile || '',
    dob: '',
    gender: 'female'
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('coskinn_profile');
    if (saved) {
      setProfile({ ...JSON.parse(saved), mobile: user.mobile }); // mobile stays locked to auth
    }
  }, [user.mobile]);

  const handleSave = () => {
    localStorage.setItem('coskinn_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-heading font-medium text-black">Personal Information</h2>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-bold text-black hover:text-theme-primary transition-colors">
            <Edit2 size={14} /> Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Full Name</label>
          <input type="text" disabled={!isEditing} value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className={`w-full py-3 px-4 border rounded-xl outline-none font-medium bg-transparent ${isEditing ? `border-gray-300 focus:ring-1 ${ringPrimaryClass}` : 'border-transparent bg-gray-50'}`} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Email Address</label>
          <input type="email" disabled={!isEditing} value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className={`w-full py-3 px-4 border rounded-xl outline-none font-medium bg-transparent ${isEditing ? `border-gray-300 focus:ring-1 ${ringPrimaryClass}` : 'border-transparent bg-gray-50'}`} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Mobile Number (Verified)</label>
          <input type="text" disabled value={profile.mobile} className="w-full py-3 px-4 border border-transparent rounded-xl outline-none font-medium bg-gray-50 text-gray-600" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Date of Birth</label>
          <input type="date" disabled={!isEditing} value={profile.dob} onChange={(e) => setProfile({...profile, dob: e.target.value})} className={`w-full py-3 px-4 border rounded-xl outline-none font-medium bg-transparent ${isEditing ? `border-gray-300 focus:ring-1 ${ringPrimaryClass}` : 'border-transparent bg-gray-50'}`} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Gender</label>
          <select disabled={!isEditing} value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value})} className={`w-full py-3 px-4 border rounded-xl outline-none font-medium bg-transparent ${isEditing ? `border-gray-300 focus:ring-1 ${ringPrimaryClass}` : 'border-transparent bg-gray-50 appearance-none'}`}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {isEditing && (
        <div className="mt-8 flex justify-end gap-4">
          <button onClick={() => setIsEditing(false)} className="px-6 py-3 font-bold text-gray-600 hover:text-black transition-colors">Cancel</button>
          <button onClick={handleSave} className={`px-8 py-3 rounded-xl font-bold transition-all shadow-sm ${primaryClass}`}>Save Changes</button>
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 gap-4">
        <div>
          <h2 className="text-2xl font-heading font-medium text-black">Saved Addresses</h2>
          <p className="text-gray-500 text-sm mt-1">Manage where your beauty essentials are delivered.</p>
        </div>
        <button onClick={openAddModal} className={`flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-xl font-bold shadow-sm transition-all ${primaryClass} flex-shrink-0`}>
          <Plus size={16} /> Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <MapPin size={24} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-heading font-medium text-black mb-2">No address added yet</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">You haven't saved any delivery addresses. Add one now to speed up checkout.</p>
          <button onClick={openAddModal} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-sm transition-all ${primaryClass}`}>
            <Plus size={16} /> Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative group overflow-hidden flex flex-col h-full">
              {addr.isDefault && (
                <div className="absolute top-0 right-0 bg-gray-100 px-4 py-1.5 rounded-bl-xl text-xs font-bold text-gray-500 z-10">Default</div>
              )}
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className={textPrimaryClass} />
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
                <button onClick={() => openEditModal(addr)} className="text-sm font-bold text-black hover:text-theme-primary transition-colors flex items-center gap-1"><Edit2 size={14}/> Edit</button>
                <button onClick={() => setShowDeleteConfirm(addr.id)} className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"><Trash2 size={14}/> Delete</button>
              </div>

              {/* Delete Confirmation Overlay */}
              <AnimatePresence>
                {showDeleteConfirm === addr.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center">
                    <Trash2 size={24} className="text-red-500 mb-2" />
                    <h4 className="font-bold text-black mb-1">Delete Address?</h4>
                    <p className="text-xs text-gray-500 mb-4">This action cannot be undone.</p>
                    <div className="flex gap-2 w-full">
                      <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-2 text-sm font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
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

  const inputClass = "w-full py-3 px-4 border border-gray-300 rounded-xl outline-none font-medium text-gray-900 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary transition-all bg-transparent placeholder-gray-400";
  const labelClass = "absolute -top-2.5 left-4 bg-white px-1 text-xs font-semibold text-gray-500 z-10 transition-colors group-focus-within:text-theme-primary";

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
                <input type="text" value={formData.country} disabled className="w-full py-3 px-4 border border-transparent rounded-xl outline-none font-medium bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Preferences */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-3">Address Type</p>
                <div className="flex gap-3">
                  {['Home', 'Work', 'Other'].map(type => (
                    <button type="button" key={type} onClick={() => setFormData({...formData, type})} className={`px-5 py-2 rounded-full font-bold text-sm transition-all border ${formData.type === type ? `border-theme-primary bg-theme-primary/10 ${textPrimaryClass}` : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer mt-2 group">
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${formData.isDefault ? `border-theme-primary ${primaryClass}` : 'border-gray-300 group-hover:border-theme-primary'}`}>
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
              <button type="button" onClick={onClose} className="flex-1 py-4 font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
              <button type="submit" className={`flex-1 py-4 font-bold rounded-xl shadow-sm transition-all ${primaryClass}`}>
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
  const dummyOrders = [
    { id: 'ORD-839201', date: 'Oct 15, 2026', total: '₹2,450', status: 'Delivered', items: 2, image: '/mockup_product_1.png' },
    { id: 'ORD-728194', date: 'Sep 28, 2026', total: '₹1,890', status: 'Processing', items: 1, image: '/mockup_product_1.png' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-heading font-medium text-black mb-6">Order History</h2>
      
      <div className="flex flex-col gap-6">
        {dummyOrders.map(order => (
          <div key={order.id} className="flex flex-col md:flex-row gap-6 p-6 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
            <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
              <img src={order.image} alt="Product" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-black">Order {order.id}</h4>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Placed on {order.date}</p>
                <p className="text-sm font-medium text-gray-800">{order.items} Items • Total: {order.total}</p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-none">
                <button className={`px-5 py-2 text-sm font-bold rounded-lg ${primaryClass}`}>Track Order</button>
                <button className="px-5 py-2 text-sm font-bold rounded-lg bg-gray-100 text-black hover:bg-gray-200">Invoice</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// 4. Wishlist Tab
function WishlistTab({ primaryClass }) {
  const dummyWishlist = [
    { id: 1, name: 'Radiance Glow Serum', price: '₹1,299', image: '/mockup_product_1.png' },
    { id: 2, name: 'Velvet Matte Lipstick', price: '₹899', image: '/mockup_product_1.png' },
    { id: 3, name: 'Hydrating Night Cream', price: '₹1,550', image: '/mockup_product_1.png' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-heading font-medium text-black mb-6">My Wishlist</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyWishlist.map(item => (
          <div key={item.id} className="border border-gray-100 rounded-2xl p-4 flex flex-col group hover:border-gray-200 transition-colors relative">
            <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors shadow-sm">
              <Trash2 size={14} />
            </button>
            <div className="w-full h-48 bg-gray-50 rounded-xl overflow-hidden mb-4">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="font-bold text-black text-sm truncate mb-1">{item.name}</h4>
            <p className="font-medium text-gray-500 text-sm mb-4">{item.price}</p>
            <button className={`w-full py-2.5 rounded-xl font-bold text-sm mt-auto ${primaryClass}`}>
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// 5. Settings Tab
function SettingsTab({ primaryClass }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-heading font-medium text-black mb-6">Account Settings</h2>
      
      <div className="flex flex-col gap-8 max-w-xl">
        
        <div className="border-b border-gray-100 pb-8">
          <h3 className="font-bold text-black mb-4 flex items-center gap-2"><Mail size={18} /> Update Email Address</h3>
          <div className="flex gap-4">
            <input type="email" placeholder="New Email Address" className="flex-1 py-3 px-4 border border-gray-300 rounded-xl outline-none focus:border-theme-primary transition-all" />
            <button className={`px-6 py-3 rounded-xl font-bold ${primaryClass}`}>Send OTP</button>
          </div>
        </div>

        <div className="border-b border-gray-100 pb-8">
          <h3 className="font-bold text-black mb-4">Notification Preferences</h3>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-theme-primary" />
              <span className="font-medium text-gray-700">Order Updates (SMS & Email)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-theme-primary" />
              <span className="font-medium text-gray-700">Promotions & Offers</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-theme-primary" />
              <span className="font-medium text-gray-700">Newsletter</span>
            </label>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// 6. Security Tab
function SecurityTab({ logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
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

        <div className="p-6 border border-gray-200 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4">
          <div>
            <h3 className="font-bold text-black mb-1">Delete Account</h3>
            <p className="text-sm text-gray-500">Permanently delete your account and data.</p>
          </div>
          <button className="px-6 py-3 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all">
            Delete Account
          </button>
        </div>
      </div>
    </motion.div>
  );
}
