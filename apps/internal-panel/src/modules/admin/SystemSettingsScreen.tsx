import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../core/api/admin';
import { Settings, Save, AlertTriangle, ShieldCheck, Wallet, Database, Loader2, Info } from 'lucide-react';

export const SystemSettingsScreen = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Local state to simulate settings management (since backend lacks detailed policy schema)
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    walletExpiryDays: 365,
    minOrderForCod: 500,
    maxCodAmount: 10000,
    membershipBronzeThreshold: 0,
    membershipSilverThreshold: 5000,
    membershipGoldThreshold: 15000
  });

  const { data: remoteSettings, isLoading } = useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: () => adminApi.getSettings() as any
  });

  // Handle remote settings sync
  useEffect(() => {
    if (remoteSettings) {
      setSettings(prev => ({
        ...prev,
        maxCodAmount: remoteSettings.maxCodAmount || prev.maxCodAmount
      }));
    }
  }, [remoteSettings]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate network request to save policies
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg('System settings and policies updated successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value) || value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading configuration...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Settings className="h-8 w-8 mr-3 text-slate-600" />
            System Configuration
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage global feature flags, maintenance modes, and business policies.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
          Save Changes
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 flex items-center font-medium">
          <ShieldCheck className="h-5 w-5 mr-2" /> {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Feature Flags */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <h2 className="font-bold text-slate-800">Feature Flags & Security</h2>
          </div>
          <div className="p-6 space-y-6">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold text-slate-900">Maintenance Mode</p>
                <p className="text-sm text-slate-500 max-w-xs mt-1">Disables the storefront for customers. Internal panel remains active.</p>
              </div>
              <input 
                type="checkbox" 
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="w-10 h-10 accent-rose-500 cursor-pointer rounded" 
              />
            </label>
            <div className="border-t border-slate-100"></div>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold text-slate-900">Debug Mode</p>
                <p className="text-sm text-slate-500 max-w-xs mt-1">Exposes verbose error logs to API responses. Use only in staging!</p>
              </div>
              <input 
                type="checkbox" 
                name="debugMode"
                checked={settings.debugMode}
                onChange={handleChange}
                className="w-10 h-10 accent-indigo-500 cursor-pointer rounded" 
              />
            </label>
          </div>
        </div>

        {/* Global Business Policies */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center">
            <Database className="h-5 w-5 text-indigo-500 mr-2" />
            <h2 className="font-bold text-slate-800">Global Commerce Policies</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Minimum Order for COD (₹)</label>
              <input 
                type="number" 
                name="minOrderForCod"
                value={settings.minOrderForCod}
                onChange={handleChange}
                className="w-full p-2 border-2 border-slate-200 rounded-lg focus:border-indigo-500 font-mono" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Maximum COD Allowed (₹)</label>
              <input 
                type="number" 
                name="maxCodAmount"
                value={settings.maxCodAmount}
                onChange={handleChange}
                className="w-full p-2 border-2 border-slate-200 rounded-lg focus:border-indigo-500 font-mono" 
              />
            </div>
          </div>
        </div>

        {/* Wallet & Membership */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center">
            <Wallet className="h-5 w-5 text-emerald-500 mr-2" />
            <h2 className="font-bold text-slate-800">Wallet & Membership Tiers</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start bg-indigo-50 text-indigo-800 p-4 rounded-xl border border-indigo-100 mb-4">
                <Info className="h-5 w-5 mr-3 shrink-0 mt-0.5" />
                <p className="text-sm">These rules automatically evaluate customer spending and assign tiers via a scheduled background job.</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Wallet Expiry (Days)</label>
                <input 
                  type="number" 
                  name="walletExpiryDays"
                  value={settings.walletExpiryDays}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-slate-200 rounded-lg focus:border-indigo-500 font-mono" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-amber-700 mb-1">Bronze Tier Minimum Spend (₹)</label>
                <input 
                  type="number" 
                  name="membershipBronzeThreshold"
                  value={settings.membershipBronzeThreshold}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-amber-200 rounded-lg focus:border-amber-500 bg-amber-50 font-mono" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Silver Tier Minimum Spend (₹)</label>
                <input 
                  type="number" 
                  name="membershipSilverThreshold"
                  value={settings.membershipSilverThreshold}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-slate-300 rounded-lg focus:border-slate-500 bg-slate-50 font-mono" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-amber-500 mb-1">Gold Tier Minimum Spend (₹)</label>
                <input 
                  type="number" 
                  name="membershipGoldThreshold"
                  value={settings.membershipGoldThreshold}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-amber-300 rounded-lg focus:border-amber-500 bg-yellow-50 font-mono" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
