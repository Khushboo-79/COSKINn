import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
import apiClient from '../../utils/apiClient';

export default function AddressModal({ isOpen, onClose, onSave, initialData }) {
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
  const [isCheckingPin, setIsCheckingPin] = useState(false);
  const [pinServiceable, setPinServiceable] = useState(null);
  const [pinMessage, setPinMessage] = useState('');

  useEffect(() => {
    const checkPin = async () => {
      const pinStr = formData.pin.replace(/\D/g, '');
      if (pinStr.length === 6) {
        setIsCheckingPin(true);
        try {
          const { data } = await apiClient.get(`/customer/addresses/serviceability?pincode=${pinStr}`);
          setPinServiceable(data.serviceable);
          setPinMessage(data.message);
        } catch (err) {
          setPinServiceable(false);
          setPinMessage('Failed to check serviceability');
        } finally {
          setIsCheckingPin(false);
        }
      } else {
        setPinServiceable(null);
        setPinMessage('');
      }
    };
    checkPin();
  }, [formData.pin]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.fullName || initialData.name || '',
          phone: initialData.phone || '',
          altPhone: initialData.altPhone || '',
          house: initialData.addressLine1 || initialData.house || '',
          street: initialData.addressLine2 ? '' : (initialData.street || ''),
          landmark: initialData.addressLine2 || initialData.landmark || '',
          city: initialData.city || '',
          state: initialData.state || '',
          pin: initialData.pincode || initialData.pin || '',
          country: initialData.country || 'India',
          type: initialData.type ? (initialData.type.charAt(0).toUpperCase() + initialData.type.slice(1)) : 'Home',
          isDefault: initialData.isDefault || false
        });
      } else {
        setFormData({
          name: '', phone: '', altPhone: '', house: '', street: '', landmark: '', city: '', state: '', pin: '', country: 'India', type: 'Home', isDefault: false
        });
      }
      setErrorMsg('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

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
    if (pinServiceable === false) {
      setErrorMsg('Delivery is not available to this PIN code.');
      return;
    }

    try {
      const mappedPayload = {
        fullName: formData.name,
        phone: formData.phone.replace(/\D/g, ''),
        addressLine1: [formData.house, formData.street].filter(Boolean).join(', '),
        addressLine2: formData.landmark || undefined,
        city: formData.city,
        state: formData.state,
        pincode: formData.pin.replace(/\D/g, ''),
        country: formData.country || 'India',
        type: (formData.type || 'home').toLowerCase(),
        isDefault: formData.isDefault || false
      };
      await onSave(mappedPayload);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to save address');
    }
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
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Jane Doe" className={inputClass} autoFocus />
              </div>
              <div className="relative group">
                <label className={labelClass}>Mobile Number *</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit number" className={inputClass} />
              </div>
              <div className="relative group md:col-span-2">
                <label className={labelClass}>Alternate Mobile (Optional)</label>
                <input type="tel" value={formData.altPhone} onChange={e => setFormData({ ...formData, altPhone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit number" className={inputClass} />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Address Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group md:col-span-2">
                <label className={labelClass}>House / Flat / Apartment No. *</label>
                <input type="text" value={formData.house} onChange={e => setFormData({ ...formData, house: e.target.value })} placeholder="e.g. Flat 101, Luxury Towers" className={inputClass} />
              </div>
              <div className="relative group md:col-span-2">
                <label className={labelClass}>Street / Area *</label>
                <input type="text" value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} placeholder="e.g. MG Road, Near Metro Station" className={inputClass} />
              </div>
              <div className="relative group">
                <label className={labelClass}>Landmark (Optional)</label>
                <input type="text" value={formData.landmark} onChange={e => setFormData({ ...formData, landmark: e.target.value })} placeholder="e.g. Behind City Mall" className={inputClass} />
              </div>
              <div className="relative group">
                <label className={labelClass}>PIN Code *</label>
                <input type="text" value={formData.pin} onChange={e => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, '').slice(0, 6) })} placeholder="6-digit PIN" className={inputClass} />
                {isCheckingPin && <p className="text-xs text-gray-500 mt-1">Checking serviceability...</p>}
                {!isCheckingPin && pinServiceable === true && <p className="text-xs text-green-600 font-bold mt-1">{pinMessage}</p>}
                {!isCheckingPin && pinServiceable === false && <p className="text-xs text-red-500 font-bold mt-1">{pinMessage}</p>}
              </div>
              <div className="relative group">
                <label className={labelClass}>City *</label>
                <input type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="e.g. Mumbai" className={inputClass} />
              </div>
              <div className="relative group">
                <label className={labelClass}>State *</label>
                <input type="text" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} placeholder="e.g. Maharashtra" className={inputClass} />
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
                    <button type="button" key={type} onClick={() => setFormData({ ...formData, type })} className={`px-5 py-2 rounded-full font-bold text-sm transition-all border ${formData.type === type ? 'border-[#FF0069] bg-[#FF0069]/10 text-[#FF0069]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer mt-2 group">
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${formData.isDefault ? 'border-[#FF0069] bg-[#FF0069]' : 'border-gray-300 group-hover:border-[#FF0069]'}`}>
                  {formData.isDefault && <CheckCircle2 size={14} className="text-white" />}
                </div>
                <input type="checkbox" checked={formData.isDefault} onChange={e => setFormData({ ...formData, isDefault: e.target.checked })} className="hidden" />
                <span className="font-medium text-gray-700">Set as Default Address</span>
              </label>
            </div>

            {errorMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mt-2 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
                <AlertCircle size={16} className="flex-shrink-0" />
                <p className="text-sm font-bold text-red-500 px-2">{errorMsg}</p>
              </motion.div>
            )}

            {/* Footer Buttons */}
            <div className="flex gap-4 sticky bottom-0 bg-white pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-4 font-bold text-gray-600 hover:text-black transition-colors rounded-xl">Cancel</button>
              <button type="submit" disabled={pinServiceable === false} className="flex-1 py-4 rounded-xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FF6B6B] hover:opacity-95 text-white transition-all shadow-sm disabled:opacity-50">
                {initialData ? 'Save Changes' : 'Save Address'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
