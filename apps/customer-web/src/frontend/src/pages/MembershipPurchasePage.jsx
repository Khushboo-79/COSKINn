import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, CreditCard, Wallet, Smartphone, ShieldCheck, Gift, Truck, Sparkles, Gem, Clock, Shield, ChevronRight, Building2, AlertCircle, Download, RotateCcw, Building, Tag, HeadphonesIcon, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { themes } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

const TIERS = [
  { 
    id: 'silver', 
    title: 'Silver', 
    price: 299,
    tag: '',
    benefits: [
      { icon: <Gem size={16} />, text: '1.5x Reward Points' },
      { icon: <Tag size={16} />, text: '10% Member Discount' },
      { icon: <HeadphonesIcon size={16} />, text: 'Priority Support' }
    ]
  },
  { 
    id: 'gold', 
    title: 'Gold', 
    price: 699,
    tag: 'Recommended',
    benefits: [
      { icon: <Gem size={16} />, text: '2x Reward Points' },
      { icon: <Tag size={16} />, text: '15% Member Discount' },
      { icon: <Truck size={16} />, text: 'Free Shipping' },
      { icon: <Gift size={16} />, text: 'Birthday Gift' },
      { icon: <HeadphonesIcon size={16} />, text: 'Priority Support' }
    ]
  },
  { 
    id: 'platinum', 
    title: 'Platinum', 
    price: 1299,
    tag: 'Premium',
    benefits: [
      { icon: <Gem size={16} />, text: '3x Reward Points' },
      { icon: <Tag size={16} />, text: '20% Member Discount' },
      { icon: <Truck size={16} />, text: 'Free Shipping' },
      { icon: <Gift size={16} />, text: 'Premium Birthday Gift' },
      { icon: <Clock size={16} />, text: 'Early Sale Access' },
      { icon: <Sparkles size={16} />, text: 'Exclusive Coupons' },
      { icon: <ShieldCheck size={16} />, text: 'VIP Support' }
    ]
  },
];

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: <Smartphone size={24} /> },
  { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={24} /> },
  { id: 'netbanking', name: 'Net Banking', icon: <Building2 size={24} /> },
  { id: 'wallet', name: 'Wallet', icon: <Wallet size={24} /> },
];

const BANKS = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra'];
const WALLETS = [
  { name: 'Paytm Wallet', balance: '₹4,520' },
  { name: 'PhonePe Wallet', balance: '₹120' },
  { name: 'Amazon Pay', balance: '₹890' },
  { name: 'Mobikwik', balance: '₹0' },
];

export default function MembershipPurchasePage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleTheme } = useTheme();
  
  const [activeType, setActiveType] = useState(type || 'skincare');
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  
  // Realistic Checkout States
  const [upiId, setUpiId] = useState('');
  const [upiStatus, setUpiStatus] = useState('idle');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    if (!user) navigate('/skincare');
    window.scrollTo(0, 0);
  }, [user, navigate, step]);

  useEffect(() => {
    if (activeType === 'skincare' || activeType === 'cosmetics') {
      toggleTheme(activeType);
      navigate(`/membership/${activeType}`, { replace: true });
    }
  }, [activeType, toggleTheme, navigate]);

  const currentThemeData = themes[activeType] || themes.skincare;
  const colors = currentThemeData.colors;
  const fonts = currentThemeData.fonts;
  
  const isSkincare = activeType === 'skincare';
  const bgGradient = isSkincare 
    ? `linear-gradient(to right, ${colors.gradientStart}, ${colors.gradientEnd})`
    : `linear-gradient(to right, ${colors.accent}, ${colors.primary})`;

  const tax = selectedTier ? Math.round(selectedTier.price * 0.18) : 0;
  const total = selectedTier ? selectedTier.price + tax : 0;

  const handleVerifyUPI = () => {
    if (!upiId.includes('@')) return;
    setUpiStatus('verifying');
    setTimeout(() => {
      setUpiStatus('requested');
    }, 1500);
  };

  const handleFormatCard = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    setCardDetails(prev => ({ ...prev, number: formatted.slice(0, 19) }));
  };

  const handleFormatExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setCardDetails(prev => ({ ...prev, expiry: value }));
  };

  const handleConfirmPayment = () => {
    setStep(5);
    setTimeout(() => {
      if (simulateFailure) {
        setStep(7);
      } else {
        processSuccess();
      }
    }, 3000);
  };

  const processSuccess = () => {
    const memberships = JSON.parse(localStorage.getItem('coskinn_memberships') || '{}');
    const userEmail = user?.email || 'guest';
    const userMemberships = memberships[userEmail] || {};
    
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const txId = `TXN${Math.random().toString().slice(2, 12)}`;
    const memId = `MEM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    userMemberships[activeType] = {
      tier: selectedTier.title,
      points: 500,
      since: new Date().toLocaleDateString(),
      expiry: expiryDate.toLocaleDateString(),
      id: memId,
      plan: '1 Year',
      status: 'Active'
    };

    memberships[userEmail] = userMemberships;
    localStorage.setItem('coskinn_memberships', JSON.stringify(memberships));
    
    setTransactionDetails({
      id: txId,
      membershipId: memId,
      amount: total,
      method: selectedPayment.toUpperCase(),
      date: new Date().toLocaleString()
    });

    setStep(6);
  };

  const isFormValid = () => {
    if (selectedPayment === 'upi') return upiStatus === 'requested';
    if (selectedPayment === 'card') return cardDetails.number.length >= 19 && cardDetails.name && cardDetails.expiry.length === 5 && cardDetails.cvv.length >= 3;
    if (selectedPayment === 'netbanking') return selectedBank !== '';
    if (selectedPayment === 'wallet') return selectedWallet !== '';
    return false;
  };

  // --- STEPS RENDERERS ---

  const renderStep1 = () => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="max-w-5xl mx-auto w-full">
      
      {/* Dynamic Theme Switcher */}
      <div className="flex justify-center mb-10">
        <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100 flex gap-2">
          <button 
            onClick={() => { setActiveType('skincare'); setSelectedTier(null); }}
            className={`px-8 py-3 rounded-full font-bold transition-all ${activeType === 'skincare' ? 'text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            style={activeType === 'skincare' ? { background: bgGradient, fontFamily: fonts.heading } : { fontFamily: fonts.heading }}
          >
            🌿 Skincare
          </button>
          <button 
            onClick={() => { setActiveType('cosmetics'); setSelectedTier(null); }}
            className={`px-8 py-3 rounded-full font-bold transition-all ${activeType === 'cosmetics' ? 'text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            style={activeType === 'cosmetics' ? { background: bgGradient, fontFamily: fonts.heading } : { fontFamily: fonts.heading }}
          >
            💄 Cosmetics
          </button>
        </div>
      </div>

      <div className="text-center mb-10">
        <motion.h2 animate={{ fontFamily: fonts.heading }} className="text-4xl md:text-5xl font-black text-[#1B1B1B] mb-4">Select Your Tier</motion.h2>
        <motion.p animate={{ fontFamily: fonts.body }} className="text-gray-500 font-medium text-lg">Choose a premium membership tier to unlock exclusive rewards.</motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {TIERS.map((tier) => {
          const isSelected = selectedTier?.id === tier.id;
          return (
            <motion.div 
              key={tier.id}
              onClick={() => setSelectedTier(tier)}
              animate={{ 
                borderColor: isSelected ? colors.primary : 'transparent',
                scale: isSelected ? 1.03 : 1,
                fontFamily: fonts.body
              }}
              className={`relative bg-white rounded-[2.5rem] p-8 border-2 cursor-pointer transition-shadow duration-300 flex flex-col ${isSelected ? 'shadow-[0_20px_50px_rgba(0,0,0,0.1)]' : 'shadow-sm hover:shadow-lg hover:-translate-y-1'}`}
            >
              {tier.tag && (
                <motion.div animate={{ background: bgGradient, fontFamily: fonts.heading }} className={`absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-6 py-1.5 rounded-full shadow-sm whitespace-nowrap`}>
                  {tier.tag}
                </motion.div>
              )}
              {isSelected && (
                <motion.div animate={{ color: colors.primary }} className={`absolute top-6 right-6`}>
                  <CheckCircle2 size={28} fill="currentColor" className="text-white drop-shadow-sm" />
                </motion.div>
              )}
              
              <div className="mt-4 mb-8 text-center border-b border-gray-100 pb-8">
                <motion.div animate={{ color: isSelected ? colors.primary : '#D1D5DB' }}>
                  <Crown size={32} className={`mx-auto mb-4`} />
                </motion.div>
                <motion.h3 animate={{ fontFamily: fonts.heading }} className="text-2xl font-black text-[#1B1B1B] mb-3">{tier.title}</motion.h3>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-black text-[#1B1B1B]">₹{tier.price}</span>
                  <span className="text-gray-400 font-medium mb-1">/ Year</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                    <motion.div animate={{ color: colors.primary }} className="mt-0.5">{benefit.icon}</motion.div>
                    <span className="leading-tight">{benefit.text}</span>
                  </li>
                ))}
              </ul>

              <motion.button 
                animate={{
                  background: isSelected ? bgGradient : '#F3F4F6',
                  color: isSelected ? '#FFFFFF' : '#9CA3AF',
                  fontFamily: fonts.heading
                }}
                className={`w-full py-4 font-bold rounded-2xl shadow-sm`}
              >
                {isSelected ? 'Selected' : 'Select Tier'}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <motion.button 
          onClick={() => setStep(2)} 
          disabled={!selectedTier}
          animate={{
            background: selectedTier ? bgGradient : '#E5E7EB',
            color: selectedTier ? '#FFFFFF' : '#9CA3AF',
            fontFamily: fonts.heading
          }}
          className={`px-12 py-4 text-lg font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 ${selectedTier ? 'hover:opacity-95 hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
        >
          Continue <ChevronRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0, fontFamily: fonts.body }} exit={{ opacity: 0, x: -50 }} className="max-w-4xl mx-auto w-full">
      <motion.div animate={{ background: bgGradient }} className={`rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden mb-8`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-5xl drop-shadow-lg">{isSkincare ? '🌿' : '💄'}</span>
            <Crown size={40} className="text-white drop-shadow-sm opacity-90" />
          </div>
          <motion.p animate={{ fontFamily: fonts.heading }} className="text-sm font-bold uppercase tracking-widest mb-2 opacity-90">
            COSKINn {activeType === 'skincare' ? 'Skincare' : 'Cosmetics'} Membership
          </motion.p>
          <motion.h1 animate={{ fontFamily: fonts.heading }} className="text-4xl md:text-5xl font-black mb-4 drop-shadow-sm">{selectedTier?.title} Tier</motion.h1>
          <p className="text-lg opacity-90 max-w-2xl">You have selected our premium {selectedTier?.title} membership. Get ready to unlock an elevated beauty experience.</p>
        </div>
      </motion.div>

      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 shadow-sm border border-white mb-8">
        <motion.h2 animate={{ fontFamily: fonts.heading }} className="text-2xl font-bold text-[#1B1B1B] mb-6 text-center">Your {selectedTier?.title} Benefits</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTier?.benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <motion.div animate={{ background: bgGradient }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white shadow-sm`}>
                {benefit.icon}
              </motion.div>
              <h3 className="font-bold text-[#1B1B1B] text-base">{benefit.text}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={() => setStep(1)} className="py-4 px-8 bg-white text-[#1B1B1B] font-bold rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
          <ChevronLeft size={20} /> Change Tier
        </button>
        <motion.button onClick={() => setStep(3)} animate={{ background: bgGradient, fontFamily: fonts.heading }} className={`flex-1 py-4 text-white text-lg font-bold rounded-2xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2`}>
          Review & Checkout
        </motion.button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0, fontFamily: fonts.body }} exit={{ opacity: 0, x: -50 }} className="max-w-2xl mx-auto w-full">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 shadow-sm border border-white mb-8">
        <motion.h2 animate={{ fontFamily: fonts.heading }} className="text-2xl font-bold text-[#1B1B1B] mb-6 border-b border-gray-100 pb-4">Checkout Summary</motion.h2>
        
        <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
          <motion.div animate={{ background: bgGradient }} className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm`}>
            {isSkincare ? '🌿' : '💄'}
          </motion.div>
          <div className="flex-1">
            <motion.h3 animate={{ fontFamily: fonts.heading }} className="font-bold text-[#1B1B1B] text-lg leading-tight">
              COSKINn {activeType === 'skincare' ? 'Skincare' : 'Cosmetics'} Membership
            </motion.h3>
            <div className="flex items-center gap-2 mt-1">
              <motion.div animate={{ color: colors.primary }}><Crown size={14} /></motion.div>
              <p className="text-gray-500 text-sm font-medium">{selectedTier?.title} Tier</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
          <div className="flex justify-between text-[#1B1B1B] font-medium">
            <span>Membership Price (1 Year)</span>
            <span>₹{selectedTier?.price}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Estimated GST (18%)</span>
            <span>₹{tax}</span>
          </div>
        </div>

        <div className="flex justify-between text-[#1B1B1B] font-black text-2xl">
          <span>Final Payable Amount</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={() => setStep(2)} className="py-4 px-8 bg-white text-[#1B1B1B] font-bold rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
          <ChevronLeft size={20} /> Back
        </button>
        <motion.button onClick={() => setStep(4)} animate={{ background: bgGradient, fontFamily: fonts.heading }} className={`flex-1 py-4 text-white text-lg font-bold rounded-2xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center`}>
          Proceed to Payment
        </motion.button>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0, fontFamily: fonts.body }} exit={{ opacity: 0, x: -50 }} className="max-w-3xl mx-auto w-full">
      
      <div className="mb-6 flex justify-end">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
          <input type="checkbox" className="accent-[#1B1B1B]" checked={simulateFailure} onChange={(e) => setSimulateFailure(e.target.checked)} />
          Simulate Payment Failure
        </label>
      </div>

      <div className="flex flex-col md:flex-row gap-8 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 shadow-sm border border-white mb-8">
        
        <div className="w-full md:w-1/3 space-y-3">
          <motion.h2 animate={{ fontFamily: fonts.heading }} className="text-xl font-bold text-[#1B1B1B] mb-4">Payment Options</motion.h2>
          {PAYMENT_METHODS.map(method => (
            <motion.div 
              key={method.id}
              onClick={() => { setSelectedPayment(method.id); setUpiStatus('idle'); }}
              animate={{ 
                borderColor: selectedPayment === method.id ? colors.primary : '#F3F4F6',
                backgroundColor: selectedPayment === method.id ? `${colors.primary}10` : '#FFFFFF' 
              }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors`}
            >
              <motion.div animate={{ color: selectedPayment === method.id ? colors.primary : '#9CA3AF' }}>
                {method.icon}
              </motion.div>
              <span className="font-bold text-[#1B1B1B] text-sm flex-1">{method.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="w-full md:w-2/3 bg-white rounded-2xl p-6 border border-gray-100 shadow-inner min-h-[300px] flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
            <h3 className="font-bold text-[#1B1B1B] text-lg">
              {PAYMENT_METHODS.find(m => m.id === selectedPayment)?.name}
            </h3>
            <motion.span animate={{ color: colors.primary }} className="font-black text-xl">₹{total}</motion.span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            
            {selectedPayment === 'upi' && (
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Enter UPI ID</label>
                <div className="flex gap-2">
                  <motion.input 
                    type="text" 
                    placeholder="username@bank" 
                    value={upiId}
                    onChange={(e) => { setUpiId(e.target.value); setUpiStatus('idle'); }}
                    disabled={upiStatus === 'verifying' || upiStatus === 'requested'}
                    whileFocus={{ borderColor: colors.primary }}
                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:outline-none transition-all disabled:bg-gray-50"
                  />
                  <button 
                    onClick={handleVerifyUPI}
                    disabled={!upiId.includes('@') || upiStatus !== 'idle'}
                    className="px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {upiStatus === 'verifying' ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
                
                <AnimatePresence>
                  {upiStatus === 'requested' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center animate-pulse"><Smartphone size={16} /></div>
                      <div>
                        <p className="font-bold text-sm">Request sent to your UPI app!</p>
                        <p className="text-xs">Please check your phone and approve the payment to continue.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {selectedPayment === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Card Number</label>
                  <motion.input whileFocus={{ borderColor: colors.primary }} type="text" placeholder="0000 0000 0000 0000" value={cardDetails.number} onChange={handleFormatCard} maxLength={19} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Name on Card</label>
                  <motion.input whileFocus={{ borderColor: colors.primary }} type="text" placeholder="Jane Doe" value={cardDetails.name} onChange={e => setCardDetails(p => ({...p, name: e.target.value}))} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:outline-none transition-all" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Expiry Date</label>
                    <motion.input whileFocus={{ borderColor: colors.primary }} type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={handleFormatExpiry} maxLength={5} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:outline-none transition-all" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">CVV</label>
                    <motion.input whileFocus={{ borderColor: colors.primary }} type="password" placeholder="123" value={cardDetails.cvv} onChange={e => setCardDetails(p => ({...p, cvv: e.target.value.replace(/\D/g, '').slice(0,4)}))} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:outline-none transition-all" />
                  </div>
                </div>
              </div>
            )}

            {selectedPayment === 'netbanking' && (
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Select your Bank</label>
                <div className="grid grid-cols-2 gap-3">
                  {BANKS.map(bank => (
                    <motion.div 
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      animate={{ 
                        borderColor: selectedBank === bank ? colors.primary : '#E5E7EB',
                        backgroundColor: selectedBank === bank ? `${colors.primary}10` : '#FFFFFF',
                        color: selectedBank === bank ? colors.primary : '#4B5563'
                      }}
                      className={`p-3 border rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors text-sm font-bold hover:border-gray-300`}
                    >
                      <Building size={16} /> {bank}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {selectedPayment === 'wallet' && (
              <div className="space-y-3">
                {WALLETS.map(wallet => (
                  <motion.div 
                    key={wallet.name}
                    onClick={() => setSelectedWallet(wallet.name)}
                    animate={{ 
                      borderColor: selectedWallet === wallet.name ? colors.primary : '#E5E7EB',
                      backgroundColor: selectedWallet === wallet.name ? `${colors.primary}10` : '#FFFFFF' 
                    }}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors hover:border-gray-300`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div animate={{ borderColor: selectedWallet === wallet.name ? colors.primary : '#D1D5DB' }} className={`w-4 h-4 rounded-full border-2 flex items-center justify-center`}>
                        {selectedWallet === wallet.name && <motion.div animate={{ backgroundColor: colors.primary }} className="w-2 h-2 rounded-full" />}
                      </motion.div>
                      <span className="font-bold text-[#1B1B1B] text-sm">{wallet.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-500">Bal: {wallet.balance}</span>
                  </motion.div>
                ))}
              </div>
            )}
            
          </div>

          <div className="mt-6 pt-6 border-t border-gray-50">
            <motion.button 
              onClick={handleConfirmPayment}
              disabled={!isFormValid()}
              animate={{ background: isFormValid() ? bgGradient : '#E5E7EB', fontFamily: fonts.heading }}
              className={`w-full py-4 text-white text-lg font-bold rounded-2xl shadow-lg flex items-center justify-center gap-3 ${isFormValid() ? 'hover:opacity-95' : 'opacity-50 cursor-not-allowed'}`}
            >
              <ShieldCheck size={24} /> Confirm & Pay ₹{total}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={() => setStep(3)} className="py-4 px-8 bg-white text-[#1B1B1B] font-bold rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
          <ChevronLeft size={20} /> Back to Summary
        </button>
      </div>
    </motion.div>
  );

  const renderStep5 = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, fontFamily: fonts.body }} className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center min-h-screen">
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360, borderColor: colors.primary }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className={`w-40 h-40 rounded-full border-[3px] border-dashed opacity-40`}
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3], background: bgGradient }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`absolute inset-0 w-40 h-40 rounded-full mix-blend-multiply`}
        />
        <motion.div animate={{ background: bgGradient }} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl text-3xl`}>
          {isSkincare ? '🌿' : '💄'}
        </motion.div>
      </div>
      
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="mt-12 text-center">
        <motion.h2 animate={{ fontFamily: fonts.heading }} className="text-2xl font-black text-[#1B1B1B] mb-2">Processing Payment...</motion.h2>
        <p className="text-gray-500 font-medium">Please do not refresh or close this window.</p>
        <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1"><ShieldCheck size={14} /> Secure Encrypted Connection</p>
      </motion.div>
    </motion.div>
  );

  const renderStep6 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, fontFamily: fonts.body }} className="max-w-xl mx-auto w-full pt-10">
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden relative">
        <motion.div animate={{ background: bgGradient }} className={`h-4 w-full`} />
        
        <div className="p-8 md:p-10 text-center">
          <div className={`w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 shadow-sm border border-green-100`}>
            <CheckCircle2 size={40} />
          </div>
          <motion.h1 animate={{ fontFamily: fonts.heading }} className="text-3xl font-black text-[#1B1B1B] mb-2">Payment Successful!</motion.h1>
          <p className="text-gray-500 font-medium mb-8">Your COSKINn {activeType === 'skincare' ? 'Skincare' : 'Cosmetics'} Membership is now active.</p>

          <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 mb-8">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <span className="text-gray-500 text-sm">Amount Paid</span>
              <span className="font-black text-xl text-[#1B1B1B]">₹{transactionDetails?.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Transaction ID</span>
              <span className="font-bold text-[#1B1B1B] text-sm">{transactionDetails?.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Membership Tier</span>
              <span className="font-bold text-[#1B1B1B] text-sm">{selectedTier?.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Membership ID</span>
              <span className="font-bold text-[#1B1B1B] text-sm">{transactionDetails?.membershipId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Payment Method</span>
              <span className="font-bold text-[#1B1B1B] text-sm">{transactionDetails?.method}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <motion.button onClick={() => navigate('/account/membership')} animate={{ background: bgGradient, fontFamily: fonts.heading }} className={`w-full py-4 text-white font-bold rounded-xl shadow-lg hover:opacity-95 transition-all`}>
              Go to My Membership
            </motion.button>
            <button className="w-full py-4 bg-white text-[#1B1B1B] font-bold rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Download size={18} /> Download Invoice
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep7 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, fontFamily: fonts.body }} className="max-w-lg mx-auto w-full pt-10 text-center">
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(255,0,0,0.05)] border border-red-100 p-8 md:p-10 mb-8">
        <div className={`w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6 border border-red-100`}>
          <AlertCircle size={48} />
        </div>
        <motion.h1 animate={{ fontFamily: fonts.heading }} className="text-3xl font-black text-[#1B1B1B] mb-2">Payment Failed</motion.h1>
        <p className="text-gray-500 font-medium mb-6">We couldn't process your transaction due to a bank server timeout. No charges were made.</p>
        
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-8 flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Attempted Amount:</span>
            <span className="font-bold text-[#1B1B1B]">₹{total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Error Code:</span>
            <span className="font-bold text-red-500">ERR_TIMEOUT_0X92</span>
          </div>
        </div>

        <button onClick={() => setStep(4)} className="w-full py-4 bg-[#1B1B1B] text-white font-bold rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 mb-3">
          <RotateCcw size={18} /> Retry Payment
        </button>
        <button onClick={() => setStep(3)} className="w-full py-4 bg-white text-gray-600 font-bold rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-all">
          Change Payment Method
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen pt-32 pb-20 font-body relative overflow-hidden bg-[#FAFAFA]`}>
      {step !== 5 && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], background: bgGradient }} transition={{ duration: 10, repeat: Infinity }} className={`absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-multiply opacity-20`} />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], background: bgGradient }} transition={{ duration: 12, repeat: Infinity, delay: 2 }} className={`absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full blur-[100px] mix-blend-multiply opacity-10`} />
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {step < 5 && (
          <div className="max-w-md mx-auto flex items-center justify-between mb-12 relative px-4">
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full overflow-hidden">
              <motion.div animate={{ background: bgGradient, width: `${((step - 1) / 3) * 100}%` }} transition={{ duration: 0.5 }} className="h-full" />
            </div>
            {['Tier', 'Details', 'Summary', 'Payment'].map((label, idx) => {
              const num = idx + 1;
              return (
                <div key={num} className="relative z-10 flex flex-col items-center gap-2">
                  <motion.div animate={{ background: step >= num ? bgGradient : '#FFFFFF', borderColor: step >= num ? 'transparent' : '#E5E7EB', color: step >= num ? '#FFFFFF' : '#9CA3AF' }} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-shadow duration-500 shadow-sm border-2`}>
                    {step > num ? <CheckCircle2 size={16} /> : num}
                  </motion.div>
                  <span className={`text-xs font-bold absolute -bottom-6 whitespace-nowrap transition-colors duration-500 ${step >= num ? 'text-[#1B1B1B]' : 'text-gray-400'}`}>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}
          {step === 7 && renderStep7()}
        </AnimatePresence>

      </div>
    </div>
  );
}
