import { useState, useEffect } from 'react';
import { Save, Settings, Clock, Truck, Shield, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';

export default function OrderSettingsScreen() {
  const queryClient = useQueryClient();

  const [returnWindowDays, setReturnWindowDays] = useState('7');
  const [codEnabled, setCodEnabled] = useState(true);
  const [maxCodAmount, setMaxCodAmount] = useState('5000');
  const [autoCancelHours, setAutoCancelHours] = useState('24');

  const { data: settings, isLoading } = useQuery({
    queryKey: ['orderSettings'],
    queryFn: async () => {
      const res = await api.get('/admin/orders/settings/config');
      return res.data;
    }
  });

  useEffect(() => {
    if (settings) {
      setReturnWindowDays(settings.returnWindowDays?.toString() || '7');
      setCodEnabled(settings.codEnabled ?? true);
      setMaxCodAmount(settings.maxCodAmount?.toString() || '5000');
      setAutoCancelHours(settings.autoCancelHours?.toString() || '24');
    }
  }, [settings]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.put('/admin/orders/settings/config', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Order settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['orderSettings'] });
    },
    onError: () => {
      toast.error('Failed to update settings');
    }
  });

  const handleSave = () => {
    updateSettingsMutation.mutate({
      returnWindowDays: parseInt(returnWindowDays, 10),
      autoCancelHours: parseInt(autoCancelHours, 10),
      codEnabled,
      maxCodAmount: parseFloat(maxCodAmount)
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
            Order Settings
          </h2>
          <p className="text-sm text-slate-500 mt-1">Configure global order rules, COD limits, and return policies</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Settings className="w-5 h-5 text-slate-500" />
          <h3 className="font-bold text-slate-800">General Order Rules</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Returns */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <h4 className="font-semibold text-slate-700">Return Window</h4>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Days allowed for return after delivery</label>
                <input 
                  type="number" 
                  value={returnWindowDays}
                  onChange={(e) => setReturnWindowDays(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Auto Cancel */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-500" />
                <h4 className="font-semibold text-slate-700">Unpaid Auto-Cancel</h4>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Cancel pending payment orders after (hours)</label>
                <input 
                  type="number" 
                  value={autoCancelHours}
                  onChange={(e) => setAutoCancelHours(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
            </div>

            {/* COD Config */}
            <div className="space-y-4 md:col-span-2 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-4 h-4 text-amber-500" />
                <h4 className="font-semibold text-slate-700">Cash on Delivery (COD)</h4>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Enable COD</p>
                  <p className="text-xs text-slate-500 mt-0.5">Allow customers to pay on delivery</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={codEnabled} onChange={(e) => setCodEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {codEnabled && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Maximum COD Order Value (₹)</label>
                  <p className="text-[10px] text-slate-500 mb-2">Orders above this amount will require prepaid methods.</p>
                  <input 
                    type="number" 
                    value={maxCodAmount}
                    onChange={(e) => setMaxCodAmount(e.target.value)}
                    className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              )}
            </div>
            
          </div>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={updateSettingsMutation.isPending}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 flex items-center gap-2 disabled:opacity-50"
          >
            {updateSettingsMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
