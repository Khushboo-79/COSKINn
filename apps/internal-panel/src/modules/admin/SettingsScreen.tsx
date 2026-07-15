import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Settings, Save, AlertCircle } from 'lucide-react';

export const SettingsScreen = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    returnWindowDays: 7,
    autoCancelHours: 24,
    codEnabled: true,
    maxCodAmount: 5000,
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ['globalSettings'],
    queryFn: async () => {
      const { data } = await api.get('/admin/config/settings');
      return data;
    },
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        returnWindowDays: settings.returnWindowDays ?? 7,
        autoCancelHours: settings.autoCancelHours ?? 24,
        codEnabled: settings.codEnabled ?? true,
        maxCodAmount: settings.maxCodAmount ?? 5000,
      });
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.put('/admin/config/settings', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['globalSettings'] });
      alert('Settings updated successfully!');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <div className="p-12 text-center text-gray-500">Loading settings...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center">
          <Settings className="w-6 h-6 text-rose-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Global Settings</h2>
          <p className="text-gray-500">Configure platform-wide rules for orders, returns, and payments.</p>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl shadow-rose-100/20 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Order Configuration
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Default Return Window (Days)</label>
                <input 
                  type="number" 
                  value={formData.returnWindowDays}
                  onChange={e => setFormData({...formData, returnWindowDays: parseInt(e.target.value) || 0})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <p className="text-xs text-gray-400 mt-1">Number of days a customer has to initiate a return after delivery.</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Auto-Cancel Unpaid Orders (Hours)</label>
                <input 
                  type="number" 
                  value={formData.autoCancelHours}
                  onChange={e => setFormData({...formData, autoCancelHours: parseInt(e.target.value) || 0})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Payment Configuration
              </h3>
              
              <div>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-white cursor-pointer hover:border-rose-300 transition-colors">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        checked={formData.codEnabled}
                        onChange={e => setFormData({...formData, codEnabled: e.target.checked})}
                        className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-sm">Enable Cash on Delivery</span>
                    <span className="text-xs text-gray-500">Allow customers to pay via COD site-wide.</span>
                  </div>
                </label>
              </div>

              {formData.codEnabled && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Maximum COD Amount (₹)</label>
                  <input 
                    type="number" 
                    value={formData.maxCodAmount}
                    onChange={e => setFormData({...formData, maxCodAmount: parseFloat(e.target.value) || 0})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Orders above this value will require prepaid online payment.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl text-sm font-medium">
              <AlertCircle className="w-4 h-4" />
              Changes take effect immediately across all live modules.
            </div>
            <button 
              type="submit"
              disabled={updateMutation.isPending}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-rose-500/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Saving...' : (
                <>
                  <Save className="w-5 h-5" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
