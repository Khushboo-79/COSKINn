import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, CreditCard, CheckCircle, Package, ArrowLeft, ShieldCheck, Lock,
  QrCode, Smartphone, RefreshCw, AlertCircle, Download, Truck, Building2,
  Wallet, Zap, Trash2, Plus, Minus, Tag, Check, Edit2, PlusCircle,
  CheckCircle2, Home, Briefcase, X
} from 'lucide-react';
import BnplFlow from '../components/checkout/BnplFlow';
import WalletFlow from '../components/checkout/WalletFlow';
import AddressModal from '../components/common/AddressModal';
import apiClient from '../utils/apiClient';
import { resolveProductImage } from '../utils/imageResolver';
import { normalizeOrder } from '../utils/orderUtils';

// Helper to dynamically load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const { cart, cartSubtotal, cartSummary, fetchCart, clearCart, addToCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Steps: 1: Cart, 2: Address, 3: Review, 4: Payment, 5: Success/Failed
  const [currentStep, setCurrentStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null);

  // Address Management State (Backend Integrated)
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle | processing | failed | success | bnpl-flow | wallet-flow
  
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState('State Bank of India');
  const [bnplProvider, setBnplProvider] = useState('Simpl');
  const [walletProvider, setWalletProvider] = useState('Paytm Wallet');
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('Google Pay');
  const [bankSearch, setBankSearch] = useState('');
  const [netBankingDetails, setNetBankingDetails] = useState({
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: 'HDFC0001234',
    branchName: 'Mumbai Central'
  });
  const [walletDetails, setWalletDetails] = useState({
    mobileNumber: ''
  });

  const INDIAN_BANKS = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'IndusInd Bank',
    'Yes Bank'
  ];
  const filteredBanks = INDIAN_BANKS.filter(b => b.toLowerCase().includes(bankSearch.toLowerCase()));
  const UPI_APPS = ['Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay', 'BHIM'];
  const INDIAN_WALLETS = ['Paytm Wallet', 'PhonePe Wallet', 'Amazon Pay Wallet', 'Mobikwik', 'Freecharge'];

  const isPaymentMethodValid = () => {
    if (paymentMethod === 'upi') {
      const trimmed = upiId.trim();
      return trimmed.includes('@') && trimmed.length >= 5;
    }
    if (paymentMethod === 'card') {
      const num = cardDetails.number.replace(/\s/g, '').trim();
      const name = cardDetails.name.trim();
      const exp = cardDetails.expiry.trim();
      const cvv = cardDetails.cvv.trim();
      return num.length >= 15 && name.length >= 2 && exp.length >= 5 && cvv.length >= 3;
    }
    if (paymentMethod === 'netbanking') {
      const holder = netBankingDetails.accountHolderName.trim();
      const acc = netBankingDetails.accountNumber.trim();
      const confirmAcc = netBankingDetails.confirmAccountNumber.trim();
      const ifsc = netBankingDetails.ifscCode.trim();
      const branch = netBankingDetails.branchName.trim();
      const accMatch = acc.length >= 6 && acc === confirmAcc;
      const ifscValid = /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(ifsc);
      return Boolean(selectedBank && holder.length >= 2 && accMatch && ifscValid && branch.length >= 2);
    }
    if (paymentMethod === 'wallet') {
      const mob = walletDetails.mobileNumber.trim();
      const mobValid = /^\d{10}$/.test(mob);
      return Boolean(walletProvider && mobValid);
    }
    if (paymentMethod === 'bnpl') {
      return Boolean(bnplProvider);
    }
    if (paymentMethod === 'cod') {
      return true;
    }
    return false;
  };

  // Coupon Logic
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Fetch Saved Addresses from Backend
  const fetchAddresses = useCallback(async () => {
    setIsLoadingAddresses(true);
    try {
      const res = await apiClient.get('/customer/addresses');
      const addrs = res.data || [];
      setSavedAddresses(addrs);
      if (addrs.length > 0) {
        // Auto select default address or first address
        const defaultAddr = addrs.find(a => a.isDefault) || addrs[0];
        setSelectedAddressId(prevId => prevId || defaultAddr.id);
      }
    } catch (err) {
      console.error('Failed to fetch addresses from backend:', err);
      showToast('Could not load saved addresses.', 'error');
    } finally {
      setIsLoadingAddresses(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  useEffect(() => {
    // If cart is empty and order not placed, redirect
    if (cart.length === 0 && paymentStatus !== 'success') {
      navigate('/new-arrivals');
    }
    window.scrollTo(0, 0);
  }, [cart, paymentStatus, navigate, currentStep]);

  // Pricing calculations from Backend data
  const totalMrpAmt = cartSummary?.totalMrp || cartSubtotal || 0;
  const discountedSubtotal = cartSummary?.totalDiscountPrice || cartSubtotal || 0;
  const productSavings = cartSummary?.totalSavings || Math.max(0, totalMrpAmt - discountedSubtotal);
  const offerDiscountAmt = cartSummary?.offerDiscount || 0;
  const SHIPPING_COST = discountedSubtotal > 999 ? 0 : (discountedSubtotal > 0 ? 99 : 0);
  const TAX = discountedSubtotal * 0.18; // Indicative GST breakdown
  
  const couponDiscountAmt = appliedCoupon ? Number(appliedCoupon.discountAmount || 0) : 0;
  const codCharge = paymentMethod === 'cod' ? 50 : 0;

  const baseFinalTotal = cartSummary?.finalTotal ?? (discountedSubtotal - offerDiscountAmt);
  const TOTAL_PAYABLE = Math.max(0, baseFinalTotal + SHIPPING_COST + codCharge - couponDiscountAmt);

  // Apply Coupon via Backend API
  const handleApplyCoupon = async () => {
    const code = couponCode.trim();
    if (!code) return;
    try {
      setCouponError('');
      const res = await apiClient.post('/cart/coupon/apply', { code });
      setAppliedCoupon({
        code: res.data.code,
        discountAmount: Number(res.data.discountAmount || 0),
        message: res.data.message || 'Coupon applied successfully!'
      });
      showToast(`Promo code ${res.data.code} applied successfully!`, 'success');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid or expired coupon code.';
      setCouponError(msg);
      setAppliedCoupon(null);
      showToast(msg, 'error');
    }
  };

  const handleSaveAddress = async (addressData) => {
    try {
      if (editingAddress) {
        await apiClient.put(`/customer/addresses/${editingAddress.id}`, addressData);
        showToast('Address updated successfully!', 'success');
      } else {
        const res = await apiClient.post('/customer/addresses', addressData);
        showToast('Address saved successfully!', 'success');
        if (res.data?.id) {
          setSelectedAddressId(res.data.id);
        }
      }
      setIsAddressModalOpen(false);
      setEditingAddress(null);
      await fetchAddresses();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save address.';
      showToast(msg, 'error');
      throw err;
    }
  };

  const selectedAddressObj = savedAddresses.find(a => a.id === selectedAddressId) || null;

  // Complete backend order placement
  const createOrderOnBackend = async (methodStr, extraDetails) => {
    if (!selectedAddressId) {
      showToast('Please select a delivery address.', 'error');
      setCurrentStep(2);
      return;
    }

    let backendMethod = 'ONLINE';
    if (methodStr === 'cod') backendMethod = 'COD';

    // 1. Create Order in Backend (POST /orders)
    const orderRes = await apiClient.post('/orders', {
      addressId: selectedAddressId,
      paymentMode: backendMethod,
      pointsToRedeem: 0,
      couponCode: appliedCoupon?.code || undefined
    });

    const orderData = normalizeOrder(orderRes.data, cart);

    console.log('🛍️ [ORDER PLACED ON BACKEND] Order ID:', orderData.id, '| Status:', orderData.status, '| Platform:', orderData.platform, '| Final Amount:', orderData.finalAmount, '| Mode:', orderData.paymentMode, '| Full Response:', orderData);

    let methodDisplay = methodStr.toUpperCase();
    if (methodStr === 'cod') methodDisplay = 'Cash On Delivery';
    else if (methodStr === 'upi') methodDisplay = `UPI (${selectedUpiApp || 'GPay'}) - ${upiId}`;
    else if (methodStr === 'card') methodDisplay = `Card Ending ${cardDetails.number.replace(/\s/g, '').slice(-4) || '1234'}`;
    else if (methodStr === 'netbanking') methodDisplay = `Net Banking (${selectedBank || 'SBI'}) - A/C ${netBankingDetails.accountNumber ? '***' + netBankingDetails.accountNumber.slice(-4) : ''}`;
    else if (methodStr === 'wallet') methodDisplay = `Wallet (${walletProvider || 'Paytm Wallet'}) - ${walletDetails.mobileNumber}`;
    else if (methodStr === 'bnpl') methodDisplay = `BNPL (${bnplProvider || 'Simpl'})`;

    let transactionId = methodStr === 'cod' ? 'COD-' + Date.now().toString().slice(-6) : `TXN${Date.now()}`;
    if (extraDetails && extraDetails.transactionId) {
      transactionId = extraDetails.transactionId;
    }

    const newOrder = {
      id: orderData.id,
      orderId: (orderData.id || '').substring(0, 8).toUpperCase(),
      status: orderData.status || 'PLACED',
      platform: orderData.platform,
      transactionId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      totalAmount: orderData.finalAmount || TOTAL_PAYABLE,
      subtotal: discountedSubtotal.toFixed(2),
      discount: orderData.discountAmt || 0,
      couponDiscount: couponDiscountAmt.toFixed(2),
      shipping: SHIPPING_COST,
      gst: TAX.toFixed(2),
      paymentMethod: methodDisplay,
      paymentDetails: methodStr === 'cod'
        ? 'COD'
        : (methodStr === 'card' ? `Card Ending ${cardDetails.number.replace(/\s/g, '').slice(-4) || '1234'}` : methodDisplay),
      delivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }),
      items: orderData.items?.map(item => {
        // Try to find the matching cart item for its already-resolved image
        const cartMatch = cart.find(c => c.name === item.name || c.productId === item.variantId);
        return {
          id: item.id,
          name: item.name,
          qty: item.quantity,
          variant: 'Standard',
          price: item.price,
          image: cartMatch?.image || resolveProductImage(item) || resolveProductImage(item.name)
        };
      }) || cart.map(item => ({
        id: item.id,
        name: item.name,
        qty: item.quantity,
        variant: item.variant || 'Standard',
        price: item.price,
        image: item.image
      })),
      address: orderData.address || selectedAddressObj
    };

    if (methodStr === 'cod') {
      // Backend already created order as PLACED and cleared cart!
      setOrderDetails({
        ...newOrder,
        status: orderData.status || 'PLACED',
        paymentStatus: 'Pay on Delivery',
        amount: orderData.finalAmount || TOTAL_PAYABLE,
        method: methodDisplay
      });
      placeOrder(newOrder);
      // Synchronize frontend cart state
      if (fetchCart) {
        await fetchCart();
      } else {
        clearCart();
      }
      setPaymentStatus('success');
      console.log('✅ [COD ORDER COMPLETED] Order ID:', newOrder.id, '| Short ID:', newOrder.orderId, '| Total:', newOrder.totalAmount);
      showToast('Order placed successfully via Cash on Delivery!', 'success');
      return;
    }

    // ONLINE Payment flow (Razorpay integration via POST /payments/create-order)
    try {
      const paymentRes = await apiClient.post('/payments/create-order', {
        orderId: orderData.id
      });
      const rzpData = paymentRes.data;

      const isScriptLoaded = await loadRazorpayScript();
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_mockkey12345678';

      if (isScriptLoaded && window.Razorpay && razorpayKey !== 'rzp_test_mockkey12345678') {
        const options = {
          key: razorpayKey,
          amount: rzpData.amount,
          currency: rzpData.currency || 'INR',
          name: 'COSKINn Luxury Beauty',
          description: `Order #${orderData.id.substring(0, 8).toUpperCase()}`,
          order_id: rzpData.id,
          handler: async function (response) {
            try {
              // Notify backend webhook for mock/development success if applicable
              await apiClient.post('/payments/webhook', {
                event: 'mock.payment.success',
                payload: {
                  payment: {
                    entity: {
                      order_id: rzpData.id,
                      id: response.razorpay_payment_id || `pay_${Date.now()}`
                    }
                  }
                }
              });
            } catch (err) {
              console.warn('Webhook notification warning:', err);
            }
            setOrderDetails({
              ...newOrder,
              status: 'Paid',
              transactionId: response.razorpay_payment_id || transactionId,
              amount: orderData.finalAmount || TOTAL_PAYABLE,
              method: methodDisplay
            });
            placeOrder(newOrder);
            if (fetchCart) await fetchCart(); else clearCart();
            setPaymentStatus('success');
            console.log('✅ [ONLINE ORDER COMPLETED - RAZORPAY] Order ID:', newOrder.id, '| Short ID:', newOrder.orderId, '| Total:', newOrder.totalAmount);
            showToast('Payment successful! Your order has been placed.', 'success');
          },
          prefill: {
            name: selectedAddressObj?.fullName || user?.name || '',
            contact: selectedAddressObj?.phone || user?.phone || '',
            email: user?.email || ''
          },
          theme: {
            color: '#D74D76'
          },
          modal: {
            ondismiss: function () {
              setPaymentStatus('idle');
              showToast('Payment window cancelled.', 'info');
            }
          }
        };

        const rzpInstance = new window.Razorpay(options);
        rzpInstance.open();
      } else {
        // Fallback or Test Mode simulation: complete payment successfully after brief delay
        setTimeout(async () => {
          setOrderDetails({
            ...newOrder,
            status: 'Paid',
            amount: orderData.finalAmount || TOTAL_PAYABLE,
            method: methodDisplay
          });
          placeOrder(newOrder);
          if (fetchCart) await fetchCart(); else clearCart();
          setPaymentStatus('success');
          console.log('✅ [ONLINE ORDER COMPLETED - SIMULATION] Order ID:', newOrder.id, '| Short ID:', newOrder.orderId, '| Total:', newOrder.totalAmount);
          showToast('Order placed successfully!', 'success');
        }, 1200);
      }
    } catch (err) {
      console.error('Payment Gateway Error:', err);
      showToast(err.response?.data?.message || 'Failed to initiate online payment.', 'error');
      setPaymentStatus('failed');
    }
  };

  const processPayment = async () => {
    if (!selectedAddressId) {
      showToast('Please select a delivery address.', 'error');
      setCurrentStep(2);
      return;
    }

    if (!isPaymentMethodValid()) {
      showToast('Please complete all mandatory payment details.', 'error');
      return;
    }

    if (paymentMethod === 'bnpl') {
      setPaymentStatus('bnpl-flow');
      return;
    }

    setPaymentStatus('processing');
    
    try {
      await createOrderOnBackend(paymentMethod);
      setCurrentStep(5);
    } catch (err) {
      console.error('Failed to process order:', err);
      const msg = err.response?.data?.message || 'Failed to place order. Please try again.';
      showToast(msg, 'error');
      setPaymentStatus('idle');
    }
  };

  const handleWalletSuccess = async (walletDetails) => {
    setPaymentStatus('processing');
    try {
      await createOrderOnBackend('wallet', walletDetails);
      setCurrentStep(5);
    } catch (err) {
      console.error('Wallet order failed:', err);
      const msg = err.response?.data?.message || 'Order failed.';
      showToast(msg, 'error');
      setPaymentStatus('idle');
    }
  };

  const handleBnplSuccess = async (bnplDetails) => {
    setPaymentStatus('processing');
    try {
      await createOrderOnBackend('bnpl', bnplDetails);
      setCurrentStep(5);
    } catch (err) {
      console.error('BNPL order failed:', err);
      const msg = err.response?.data?.message || 'Order failed.';
      showToast(msg, 'error');
      setPaymentStatus('idle');
    }
  };

  const updateQuantity = (product, delta) => {
    const newQty = (product.quantity || 1) + delta;
    if (newQty > 0) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-theme-secondary selection:text-theme-dark relative">
      
      {/* Checkout Header */}
      {(paymentStatus !== 'bnpl-flow' && paymentStatus !== 'wallet-flow') && (
        <div className="w-full bg-white border-b border-black/5 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
          <Link to="/" className="text-2xl font-heading font-black tracking-widest text-black">
            COSKINn
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-black/60 uppercase tracking-widest">
            <ShieldCheck className="w-5 h-5 text-green-500" /> 100% Secure Checkout
          </div>
        </div>
      )}

      {/* BNPL Flow Overlay */}
      {paymentStatus === 'bnpl-flow' && (
        <BnplFlow 
          provider={bnplProvider || 'Simpl'} 
          amount={TOTAL_PAYABLE} 
          onCancel={() => setPaymentStatus('idle')}
          onSuccess={handleBnplSuccess}
        />
      )}

      {/* Wallet Flow Overlay */}
      {paymentStatus === 'wallet-flow' && (
        <WalletFlow 
          provider={walletProvider || 'Paytm'} 
          amount={TOTAL_PAYABLE} 
          onCancel={() => setPaymentStatus('idle')}
          onSuccess={handleWalletSuccess}
        />
      )}

      {/* Full Screen Processing Loader */}
      <AnimatePresence>
        {paymentStatus === 'processing' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 mb-8">
              <motion.div 
                animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-black/5 border-t-theme-primary"
              />
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-heading font-black text-theme-primary">
                C
              </div>
            </div>
            
            <h2 className="font-heading font-bold text-3xl mb-3 text-black">
              {paymentMethod === 'bnpl' ? 'Redirecting to Provider for KYC...' : 'Processing Payment...'}
            </h2>
            <p className="text-black/50 font-medium mb-8">
              {paymentMethod === 'bnpl' 
                ? 'COSKINn does not collect Aadhaar or PAN details. Verification is securely handled by the provider.'
                : 'Please do not refresh or press back on this page.'}
            </p>
            
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-black/40">
              <div className="flex items-center gap-2"><Lock className="w-4 h-4" /> 256-bit Secure</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> PCI DSS Compliant</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reusable Address Modal for Add/Edit */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {paymentStatus === 'failed' ? (
          <div className="bg-white rounded-[3rem] p-12 md:p-24 text-center shadow-xl border border-black/5 flex flex-col items-center">
             <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
              className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8"
            >
              <AlertCircle className="w-12 h-12 text-red-500" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Payment Failed</h2>
            <p className="text-black/60 text-lg mb-10 max-w-md mx-auto">We couldn't process your payment. Your account has not been charged. Please try again or use a different payment method.</p>
            
            <button 
              onClick={() => setPaymentStatus('idle')}
              className={`px-8 py-4 font-bold uppercase tracking-widest text-sm ${
                theme === 'skincare'
                  ? 'btn-primary-skincare'
                  : 'bg-theme-primary text-white rounded-full hover:bg-pink-700 transition-colors shadow-xl'
              }`}
            >
              Retry Payment
            </button>
          </div>
        ) : currentStep === 5 ? (
          <div className="bg-white rounded-[3rem] p-10 lg:p-16 text-center shadow-xl border border-black/5 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>

            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary bg-theme-primary/10 px-4 py-2 rounded-full mb-4">
              Thank you for shopping with COSKINn
            </span>

            <h1 className="text-4xl md:text-6xl font-heading font-black mb-4">
              Order Confirmed!
            </h1>

            <p className="text-black/60 text-lg mb-8 max-w-lg mx-auto">
              Your order <strong className="text-black">#{orderDetails?.orderId || orderDetails?.id?.substring(0, 8)}</strong> has been successfully placed. We've sent a confirmation email with all the details.
            </p>

            {/* Order Info Card */}
            <div className="w-full max-w-2xl bg-[#fafafa] rounded-3xl p-8 mb-10 border border-black/5 text-left">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-black/5 mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-1">Order Date</p>
                  <p className="font-bold">{orderDetails?.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-1">Estimated Delivery</p>
                  <p className="font-bold text-green-600">{orderDetails?.delivery || 'In 3-5 Business Days'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-1">Total Amount</p>
                  <p className="font-bold text-xl text-theme-primary">₹{(orderDetails?.totalAmount || orderDetails?.amount || TOTAL_PAYABLE).toFixed(2)}</p>
                </div>
              </div>

              {/* Shipping Details */}
              {orderDetails?.address && (
                <div className="mb-6 pb-6 border-b border-black/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-2">Delivery Address</p>
                  <p className="font-bold text-black">{orderDetails.address.fullName || orderDetails.address.name} <span className="font-normal text-black/50 ml-2">{orderDetails.address.phone || orderDetails.address.mobile}</span></p>
                  <p className="text-sm text-black/70 mt-1">{orderDetails.address.addressLine1 || orderDetails.address.street}</p>
                  {orderDetails.address.addressLine2 && <p className="text-sm text-black/70">{orderDetails.address.addressLine2}</p>}
                  <p className="text-sm text-black/70">{orderDetails.address.city}, {orderDetails.address.state} - {orderDetails.address.pincode}</p>
                </div>
              )}

              {/* Items List */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-wider text-black/40">Items in Order</p>
                {orderDetails?.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 py-2">
                    <img src={resolveProductImage(item)} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-theme-secondary/20" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{item.name}</h4>
                      <p className="text-black/50 text-xs mt-0.5">Qty: {item.qty || item.quantity} | {item.variant || 'Standard'}</p>
                    </div>
                    <span className="font-bold text-sm">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/new-arrivals" className={`px-8 py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center ${
                theme === 'skincare' ? 'btn-primary-skincare' : 'bg-theme-primary text-white rounded-full hover:bg-pink-700 transition-colors shadow-xl'
              }`}>
                Continue Shopping
              </Link>
              <Link to="/account" className={`px-8 py-4 font-bold uppercase tracking-widest text-sm flex items-center gap-2 ${
                theme === 'skincare' ? 'btn-secondary-skincare' : 'bg-white border border-black/10 text-black rounded-full hover:bg-black/5 transition-colors'
              }`}>
                View My Orders
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* Main Checkout Area */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              
              {/* Step 1: Shopping Cart */}
              <div className={`bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 border ${currentStep === 1 ? 'border-theme-primary shadow-lg ring-4 ring-theme-primary/5' : 'border-black/5 opacity-70 cursor-pointer hover:border-black/20'}`} onClick={() => currentStep > 1 && setCurrentStep(1)}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= 1 ? 'bg-theme-primary text-white shadow-md' : 'bg-black/10 text-black/50'}`}>1</div>
                  <h3 className="font-heading font-bold text-2xl">Shopping Cart</h3>
                </div>

                <AnimatePresence>
                  {currentStep === 1 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex flex-col gap-4 mb-8">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 p-4 border border-black/5 rounded-2xl items-center relative group">
                            <img src={resolveProductImage(item)} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-theme-secondary/20 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-base truncate">{item.name}</h4>
                              <p className="text-black/50 text-sm mt-1 mb-2">{item.category}</p>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-theme-primary">₹{item.price}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-black/50">Qty: {item.quantity}</span>
                                </div>
                              </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 text-black/30 hover:text-red-500 transition-colors" title="Remove Item">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <button onClick={() => setCurrentStep(2)} className={`px-10 py-4 font-bold uppercase tracking-widest text-sm ${
                          theme === 'skincare' ? 'btn-primary-skincare' : 'bg-theme-primary text-white rounded-full hover:bg-pink-700 transition-colors shadow-lg'
                        }`}>
                          Continue to Shipping
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {currentStep > 1 && (
                  <div className="ml-14 text-black/60 font-medium text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {cart.length} items in cart
                  </div>
                )}
              </div>

              {/* Step 2: Shipping Address (Backend Integrated) */}
              <div className={`bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 border ${currentStep === 2 ? 'border-theme-primary shadow-lg ring-4 ring-theme-primary/5' : 'border-black/5 opacity-70 cursor-pointer hover:border-black/20'}`} onClick={() => currentStep > 2 && setCurrentStep(2)}>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= 2 ? 'bg-theme-primary text-white shadow-md' : 'bg-black/10 text-black/50'}`}>2</div>
                    <h3 className="font-heading font-bold text-2xl">Shipping Address</h3>
                  </div>
                  {currentStep === 2 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingAddress(null);
                        setIsAddressModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-theme-primary/10 text-theme-primary hover:bg-theme-primary hover:text-white transition-all"
                    >
                      <PlusCircle className="w-4 h-4" /> Add New Address
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {currentStep === 2 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      {isLoadingAddresses ? (
                        <div className="py-12 flex flex-col items-center justify-center">
                          <RefreshCw className="w-8 h-8 text-theme-primary animate-spin mb-3" />
                          <p className="text-sm font-medium text-black/50">Loading saved addresses...</p>
                        </div>
                      ) : savedAddresses.length === 0 ? (
                        <div className="py-10 text-center bg-[#fafafa] rounded-2xl border border-dashed border-black/15 p-6 mb-6">
                          <MapPin className="w-10 h-10 text-black/30 mx-auto mb-3" />
                          <p className="font-bold text-black mb-1">No Saved Addresses Found</p>
                          <p className="text-sm text-black/50 mb-6">Please add a delivery address to place your order.</p>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingAddress(null);
                              setIsAddressModalOpen(true);
                            }}
                            className="px-6 py-3 rounded-full font-bold text-sm bg-theme-primary text-white hover:bg-pink-700 transition-colors shadow-md"
                          >
                            + Add New Address
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {savedAddresses.map((addr) => {
                            const isSelected = selectedAddressId === addr.id;
                            return (
                              <div
                                key={addr.id}
                                onClick={() => setSelectedAddressId(addr.id)}
                                className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                                  isSelected
                                    ? 'border-theme-primary bg-theme-primary/5 shadow-md'
                                    : 'border-black/10 bg-white hover:border-black/30'
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/5 text-black/70">
                                        {addr.type || 'HOME'}
                                      </span>
                                      {addr.isDefault && (
                                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
                                          Default
                                        </span>
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingAddress(addr);
                                        setIsAddressModalOpen(true);
                                      }}
                                      className="text-black/40 hover:text-theme-primary p-1 transition-colors"
                                      title="Edit Address"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <p className="font-bold text-black mb-1">
                                    {addr.fullName} <span className="font-normal text-black/60 ml-1.5">{addr.phone}</span>
                                  </p>
                                  <p className="text-sm text-black/70 leading-snug">
                                    {addr.addressLine1}
                                    {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                                  </p>
                                  <p className="text-sm text-black/70">
                                    {addr.city}, {addr.state} - <span className="font-semibold text-black">{addr.pincode}</span>
                                  </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                                  <span className={`text-xs font-bold ${isSelected ? 'text-theme-primary' : 'text-black/40'}`}>
                                    {isSelected ? '✓ Selected Delivery Address' : 'Click to select'}
                                  </span>
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-theme-primary bg-theme-primary' : 'border-black/20'}`}>
                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button 
                          disabled={!selectedAddressId}
                          onClick={() => setCurrentStep(3)}
                          className={`px-10 py-4 font-bold uppercase tracking-widest text-sm disabled:opacity-50 transition-colors ${
                            theme === 'skincare' ? 'btn-primary-skincare disabled:hover:bg-[#FF0069]' : 'bg-theme-primary text-white rounded-full hover:bg-pink-700 disabled:hover:bg-black shadow-lg'
                          }`}
                        >
                          Deliver Here
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {currentStep > 2 && selectedAddressObj && (
                  <div className="ml-14 text-black/70 text-sm bg-[#fafafa] p-4 rounded-xl border border-black/5">
                    <p className="font-bold text-black mb-1">{selectedAddressObj.fullName} <span className="font-normal text-black/50 ml-2">{selectedAddressObj.phone}</span></p>
                    <p>{selectedAddressObj.addressLine1}{selectedAddressObj.addressLine2 ? `, ${selectedAddressObj.addressLine2}` : ''}, {selectedAddressObj.city}</p>
                    <p>{selectedAddressObj.state} - {selectedAddressObj.pincode}</p>
                  </div>
                )}
              </div>

              {/* Step 3: Order Review */}
              <div className={`bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 border ${currentStep === 3 ? 'border-theme-primary shadow-lg ring-4 ring-theme-primary/5' : 'border-black/5 opacity-70 cursor-pointer hover:border-black/20'}`} onClick={() => currentStep > 3 && setCurrentStep(3)}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= 3 ? 'bg-theme-primary text-white shadow-md' : 'bg-black/10 text-black/50'}`}>3</div>
                  <h3 className="font-heading font-bold text-2xl">Order Review</h3>
                </div>

                <AnimatePresence>
                  {currentStep === 3 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="text-black/60 font-medium mb-6">Please review your final order amount and apply any promotional coupons on the right before proceeding to payment.</p>
                      
                      <div className="flex justify-end">
                        <button onClick={() => setCurrentStep(4)} className={`px-10 py-4 font-bold uppercase tracking-widest text-sm ${
                          theme === 'skincare' ? 'btn-primary-skincare' : 'bg-theme-primary text-white rounded-full hover:bg-pink-700 transition-colors shadow-lg'
                        }`}>
                          Proceed to Payment
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {currentStep > 3 && (
                  <div className="ml-14 text-black/60 font-medium text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Order verified
                  </div>
                )}
              </div>

              {/* Step 4: Payment Methods */}
              <div className={`bg-white rounded-3xl p-6 md:p-8 transition-all duration-300 border ${currentStep === 4 ? 'border-theme-primary shadow-lg ring-4 ring-theme-primary/5' : 'border-black/5 opacity-70'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= 4 ? 'bg-theme-primary text-white shadow-md' : 'bg-black/10 text-black/50'}`}>4</div>
                  <h3 className="font-heading font-bold text-2xl">Payment Method</h3>
                </div>

                <AnimatePresence>
                  {currentStep === 4 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex flex-col gap-4 mb-10">
                        
                        {/* 1. UPI */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'upi' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Smartphone className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">UPI</span>
                              <span className="text-xs text-black/50 font-medium">Google Pay, PhonePe, Paytm, BHIM</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'upi' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6 space-y-4">
                                  <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                                      Select UPI App
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                      {UPI_APPS.map((app) => (
                                        <button
                                          key={app}
                                          type="button"
                                          onClick={() => setSelectedUpiApp(app)}
                                          className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                                            selectedUpiApp === app
                                              ? 'border-theme-primary bg-theme-primary/10 text-theme-primary shadow-sm'
                                              : 'border-black/10 bg-[#fafafa] text-black/70 hover:border-black/20'
                                          }`}
                                        >
                                          <span>{app}</span>
                                          <CheckCircle2 size={14} className={selectedUpiApp === app ? 'opacity-100 text-theme-primary' : 'opacity-0'} />
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="pt-3 border-t border-black/5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                      Enter UPI ID <span className="text-theme-primary">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={upiId}
                                      onChange={(e) => setUpiId(e.target.value)}
                                      placeholder="Enter UPI ID (e.g. example@okaxis)"
                                      className="w-full px-4 py-3 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa]"
                                    />
                                    <p className="text-[11px] text-gray-500 mt-1">
                                      Mandatory: Please enter a valid UPI ID (must contain '@', e.g. username@okaxis or mobile@upi)
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 2. Credit/Debit Card */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'card' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <CreditCard className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Credit / Debit Card</span>
                              <span className="text-xs text-black/50 font-medium">Visa, Mastercard, RuPay, Amex</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'card' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6 space-y-4">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {['Visa', 'MasterCard', 'RuPay', 'Amex'].map((badge) => (
                                      <span
                                        key={badge}
                                        className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-[11px] font-extrabold tracking-wide border border-gray-200"
                                      >
                                        {badge}
                                      </span>
                                    ))}
                                  </div>

                                  <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                      Card Holder Name <span className="text-theme-primary">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="John Doe"
                                      value={cardDetails.name}
                                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                      className="w-full px-4 py-3 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa]"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                      Card Number <span className="text-theme-primary">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      maxLength={19}
                                      placeholder="1234 5678 9012 3456"
                                      value={cardDetails.number}
                                      onChange={(e) => {
                                        const digits = e.target.value.replace(/\D/g, '');
                                        const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
                                        setCardDetails({ ...cardDetails, number: formatted });
                                      }}
                                      className="w-full px-4 py-3 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa] font-mono"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                        Expiry Date <span className="text-theme-primary">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        maxLength={5}
                                        placeholder="MM/YY"
                                        value={cardDetails.expiry}
                                        onChange={(e) => {
                                          let val = e.target.value.replace(/\D/g, '');
                                          if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                                          setCardDetails({ ...cardDetails, expiry: val });
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa]"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                        CVV <span className="text-theme-primary">*</span>
                                      </label>
                                      <input
                                        type="password"
                                        placeholder="CVV"
                                        maxLength={4}
                                        value={cardDetails.cvv}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                                        className="w-full px-4 py-3 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa]"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 3. Net Banking */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'netbanking' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Building2 className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Net Banking</span>
                              <span className="text-xs text-black/50 font-medium">All major Indian banks supported</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'netbanking' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6 space-y-4">
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Search banks (e.g. State Bank of India, HDFC...)"
                                      value={bankSearch}
                                      onChange={(e) => setBankSearch(e.target.value)}
                                      className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa]"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                                    {filteredBanks.map((bank) => (
                                      <button
                                        key={bank}
                                        type="button"
                                        onClick={() => setSelectedBank(bank)}
                                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                                          selectedBank === bank
                                            ? 'border-theme-primary bg-theme-primary/10 text-theme-primary shadow-sm'
                                            : 'border-black/10 bg-[#fafafa] text-black/70 hover:border-black/20'
                                        }`}
                                      >
                                        <span className="truncate pr-1">{bank}</span>
                                        <CheckCircle2 size={14} className={selectedBank === bank ? 'opacity-100 text-theme-primary shrink-0' : 'opacity-0 shrink-0'} />
                                      </button>
                                    ))}
                                  </div>

                                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-700">Selected Bank</span>
                                    <span className="text-xs font-black text-theme-primary">{selectedBank || 'None'}</span>
                                  </div>

                                  <div className="pt-4 mt-2 border-t border-gray-200 space-y-3.5">
                                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-700">
                                      Bank Account Details <span className="text-theme-primary">*</span>
                                    </h4>
                                    <div>
                                      <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
                                        Account Holder Name <span className="text-theme-primary">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Enter account holder name"
                                        value={netBankingDetails.accountHolderName}
                                        onChange={(e) => setNetBankingDetails({ ...netBankingDetails, accountHolderName: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa]"
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      <div>
                                        <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
                                          Account Number <span className="text-theme-primary">*</span>
                                        </label>
                                        <input
                                          type="password"
                                          placeholder="Enter account number"
                                          value={netBankingDetails.accountNumber}
                                          onChange={(e) => setNetBankingDetails({ ...netBankingDetails, accountNumber: e.target.value })}
                                          className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa]"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
                                          Confirm Account Number <span className="text-theme-primary">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Re-enter account number"
                                          value={netBankingDetails.confirmAccountNumber}
                                          onChange={(e) => setNetBankingDetails({ ...netBankingDetails, confirmAccountNumber: e.target.value })}
                                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none bg-[#fafafa] ${
                                            netBankingDetails.confirmAccountNumber && netBankingDetails.confirmAccountNumber !== netBankingDetails.accountNumber
                                              ? 'border-red-400 text-red-600'
                                              : 'border-black/15 focus:border-theme-primary'
                                          }`}
                                        />
                                        {netBankingDetails.confirmAccountNumber && netBankingDetails.confirmAccountNumber !== netBankingDetails.accountNumber && (
                                          <p className="text-[10px] text-red-500 font-bold mt-1">Account numbers must match</p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      <div>
                                        <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
                                          IFSC Code <span className="text-theme-primary">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          maxLength={11}
                                          placeholder="e.g. HDFC0001234"
                                          value={netBankingDetails.ifscCode}
                                          onChange={(e) => setNetBankingDetails({ ...netBankingDetails, ifscCode: e.target.value.toUpperCase() })}
                                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none bg-[#fafafa] uppercase ${
                                            netBankingDetails.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(netBankingDetails.ifscCode)
                                              ? 'border-red-400'
                                              : 'border-black/15 focus:border-theme-primary'
                                          }`}
                                        />
                                        {netBankingDetails.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(netBankingDetails.ifscCode) && (
                                          <p className="text-[10px] text-red-500 font-bold mt-1">Format: 4 letters, 0, 6 characters</p>
                                        )}
                                      </div>
                                      <div>
                                        <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
                                          Branch Name <span className="text-theme-primary">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Enter branch name"
                                          value={netBankingDetails.branchName}
                                          onChange={(e) => setNetBankingDetails({ ...netBankingDetails, branchName: e.target.value })}
                                          className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa]"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 4. Wallets */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'wallet' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Wallet className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Wallets</span>
                              <span className="text-xs text-black/50 font-medium">Amazon Pay, Paytm, PhonePe, Mobikwik</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'wallet' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6 space-y-4">
                                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                                    {INDIAN_WALLETS.map((wallet) => (
                                      <button
                                        key={wallet}
                                        type="button"
                                        onClick={() => setWalletProvider(wallet)}
                                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                                          walletProvider === wallet
                                            ? 'border-theme-primary bg-theme-primary/10 text-theme-primary shadow-sm'
                                            : 'border-black/10 bg-[#fafafa] text-black/70 hover:border-black/20'
                                        }`}
                                      >
                                        <span>{wallet}</span>
                                        <CheckCircle2 size={14} className={walletProvider === wallet ? 'opacity-100 text-theme-primary' : 'opacity-0'} />
                                      </button>
                                    ))}
                                  </div>
                                  <div className="pt-3 border-t border-black/5">
                                    <label className="block text-[11px] font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                      Mobile Number linked to Wallet <span className="text-theme-primary">*</span>
                                    </label>
                                    <input
                                      type="tel"
                                      maxLength={10}
                                      placeholder="Enter 10-digit mobile number"
                                      value={walletDetails.mobileNumber}
                                      onChange={(e) => setWalletDetails({ ...walletDetails, mobileNumber: e.target.value.replace(/\D/g, '') })}
                                      className="w-full px-4 py-3 rounded-xl border border-black/15 text-xs font-semibold focus:outline-none focus:border-theme-primary bg-[#fafafa]"
                                    />
                                    <p className="text-[11px] text-gray-500 mt-1">
                                      Mandatory: 10-digit mobile number registered with {walletProvider || 'your wallet'}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 5. BNPL */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'bnpl' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="bnpl" checked={paymentMethod === 'bnpl'} onChange={() => setPaymentMethod('bnpl')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Zap className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Buy Now, Pay Later</span>
                              <span className="text-xs text-black/50 font-medium">Simpl, LazyPay, Amazon Pay Later</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'bnpl' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                    {['Simpl', 'LazyPay', 'Amazon Pay Later', 'ICICI PayLater'].map(provider => (
                                      <button 
                                        type="button"
                                        key={provider}
                                        onClick={() => setBnplProvider(provider)}
                                        className={`py-4 border rounded-xl text-xs font-bold transition-all ${bnplProvider === provider ? 'border-theme-primary text-theme-primary bg-theme-primary/5 shadow-sm' : 'border-black/10 text-black/60 hover:border-black/30 bg-[#fafafa]'}`}
                                      >
                                        {provider}
                                      </button>
                                    ))}
                                  </div>
                                  <div className="bg-theme-secondary/20 rounded-xl p-4 border border-theme-secondary/40">
                                    <p className="text-xs text-black/70 font-medium leading-relaxed">
                                      <strong className="text-black">Note:</strong> You will be securely redirected to the provider's portal for authentication. 
                                      <strong> COSKINn does not collect or store PAN/Aadhaar details.</strong> All KYC verification is handled exclusively by the provider.
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* 6. COD */}
                        <div className={`border-2 rounded-2xl overflow-hidden transition-colors ${paymentMethod === 'cod' ? 'border-theme-primary bg-theme-primary/5' : 'border-black/5 hover:border-black/20'}`}>
                          <label className="flex items-center gap-4 p-5 cursor-pointer">
                            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 text-theme-primary accent-theme-primary" />
                            <Package className="w-6 h-6 text-black/70" />
                            <div className="flex-1">
                              <span className="font-bold text-base block">Cash on Delivery</span>
                              <span className="text-xs text-black/50 font-medium">Pay via Cash or UPI at your doorstep</span>
                            </div>
                          </label>
                          <AnimatePresence>
                            {paymentMethod === 'cod' && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-black/5">
                                <div className="p-6">
                                  <p className="text-sm font-bold text-black mb-1">Cash on Delivery Selected</p>
                                  <p className="text-sm text-black/60 mb-4">Pay when your order is delivered to your address.</p>
                                  <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-yellow-200">
                                    Extra ₹50 COD Charge Applied
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                      </div>

                      <button 
                        type="button"
                        onClick={processPayment} 
                        disabled={!selectedAddressId || !isPaymentMethodValid()}
                        className={`w-full py-5 font-bold uppercase tracking-widest text-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none ${
                          theme === 'skincare' 
                            ? 'btn-primary-skincare shadow-[0_10px_30px_rgba(255,0,105,0.3)] disabled:hover:bg-[#FF0069]'
                            : 'bg-theme-primary text-white rounded-full shadow-lg shadow-theme-primary/30 hover:shadow-xl hover:bg-pink-700/90 hover:-translate-y-1 disabled:hover:bg-theme-primary'
                        }`}
                      >
                        {paymentMethod === 'cod' 
                          ? `Place Order (COD ₹${TOTAL_PAYABLE.toFixed(2)})`
                          : paymentMethod === 'bnpl' 
                            ? 'Continue to Provider'
                            : `Pay Securely ₹${TOTAL_PAYABLE.toFixed(2)}`}
                      </button>

                      {!isPaymentMethodValid() && (
                        <p className="text-center text-xs text-red-500 font-semibold mt-3">
                          Please complete all mandatory payment details above to proceed with your order.
                        </p>
                      )}

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Sticky Price Breakdown */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/5 border border-black/5 sticky top-24">
                <h3 className="font-heading font-bold text-xl mb-6 border-b border-black/5 pb-4">Order Summary</h3>
                
                {/* Coupon Section (Backend API Integrated) */}
                <div className="mb-6 pb-6 border-b border-black/5">
                  <div className="flex flex-row items-center gap-3 w-full h-[52px]">
                    <div className="relative w-3/4 h-full">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                      <input 
                        type="text" 
                        placeholder="Enter Promo Code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full h-full pl-10 pr-4 rounded-[18px] border border-[#FFD1E5] bg-white focus:outline-none focus:border-[#FF0069] focus:ring-2 focus:ring-[#FF0069]/20 transition-all text-sm uppercase font-medium text-black placeholder:text-gray-400 placeholder:normal-case shadow-sm hover:border-[#FF5EA8]/50"
                      />
                    </div>
                    
                    <button 
                      type="button"
                      onClick={handleApplyCoupon}
                      className="w-1/4 h-full bg-gradient-to-r from-[#FF0069] to-[#FF5CA8] text-white font-semibold uppercase tracking-widest text-xs rounded-[18px] shadow-[0_4px_14px_rgba(255,0,105,0.25)] hover:shadow-[0_6px_20px_rgba(255,0,105,0.4)] hover:-translate-y-[2px] active:scale-[0.98] transition-all duration-300 flex items-center justify-center"
                    >
                      Apply
                    </button>
                  </div>
                  
                  {/* Error Message */}
                  {couponError && (
                    <div className="mt-3 flex items-center gap-1.5 px-4 py-2 bg-[#FFF0F5] border border-[#FFD1E5] rounded-full w-max text-[#FF0069]">
                      <span className="text-xs font-bold flex items-center gap-1.5"><span className="text-[10px]">⚠</span> {couponError}</span>
                    </div>
                  )}
                  
                  {/* Success Message */}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between mt-3 bg-green-50 px-4 py-2.5 rounded-full border border-green-100">
                      <span className="text-green-700 text-xs font-bold flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> {appliedCoupon.message}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponCode('');
                        }}
                        className="text-black/40 hover:text-red-500 text-xs font-bold uppercase transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3.5 mb-6 text-sm">
                  <div className="flex justify-between font-medium text-black/70">
                    <span>Total MRP ({cart.reduce((a,b)=>a+(b.quantity||1),0)} items)</span>
                    <span>₹{totalMrpAmt.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-black/70">
                    <span>Discounted Price</span>
                    <span>₹{discountedSubtotal.toFixed(2)}</span>
                  </div>
                  {productSavings > 0 && (
                    <div className="flex justify-between font-bold text-green-600">
                      <span>Product Savings</span>
                      <span>- ₹{productSavings.toFixed(2)}</span>
                    </div>
                  )}
                  {offerDiscountAmt > 0 && (
                    <div className="flex justify-between font-bold text-[#FF0069]">
                      <span>Applied Offer</span>
                      <span>- ₹{offerDiscountAmt.toFixed(2)}</span>
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="flex justify-between font-bold text-green-600">
                      <span>Coupon Discount ({appliedCoupon.code})</span>
                      <span>- ₹{couponDiscountAmt.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-black/70">
                    <span>Tax (GST 18% included)</span>
                    <span>₹{TAX.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-black/70">
                    <span>Shipping Fee</span>
                    {SHIPPING_COST === 0 ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      <span>₹{SHIPPING_COST.toFixed(2)}</span>
                    )}
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between font-medium text-yellow-700">
                      <span>COD Doorstep Charge</span>
                      <span>+ ₹50.00</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-black/10 w-full my-4"></div>
                
                <div className="flex justify-between items-end mb-6">
                  <span className="text-lg font-bold text-black">Final Payable</span>
                  <span className="text-3xl font-bold text-theme-primary">
                    ₹{TOTAL_PAYABLE.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-center items-center gap-6 text-black/40 mt-8 pt-6 border-t border-black/5">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                    <Lock className="w-4 h-4" /> 100% Secure
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" /> SSL Encrypted
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
