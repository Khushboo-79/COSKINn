import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Shield, X, Save, AlertCircle, Plus } from 'lucide-react';

export default function ComplianceManager({ 
  product, 
  onClose, 
  onRefresh 
}: { 
  product: any, 
  onClose: () => void, 
  onRefresh: () => void 
}) {
  const [activeTab, setActiveTab] = useState<'compliance' | 'stock'>('compliance');

  const { register: registerCompliance, handleSubmit: handleSubmitCompliance, reset: resetCompliance } = useForm({
    defaultValues: {
      gstRate: product.gstRate || 18,
      hsnCode: product.hsnCode || '',
      manufacturerName: product.manufacturerName || '',
      manufacturerAddress: product.manufacturerAddress || '',
      countryOfOrigin: product.countryOfOrigin || 'India',
      testReportRef: product.testReportRef || '',
    }
  });

  useEffect(() => {
    resetCompliance({
      gstRate: product.gstRate || 18,
      hsnCode: product.hsnCode || '',
      manufacturerName: product.manufacturerName || '',
      manufacturerAddress: product.manufacturerAddress || '',
      countryOfOrigin: product.countryOfOrigin || 'India',
      testReportRef: product.testReportRef || '',
    });
  }, [product, resetCompliance]);

  const complianceMutation = useMutation({
    mutationFn: (data: any) => api.patch(`/product/${product.id}/compliance`, {
      ...data,
      gstRate: Number(data.gstRate)
    }),
    onSuccess: () => {
      onRefresh();
      alert('Compliance info saved!');
    }
  });

  const onSubmitCompliance = (data: any) => {
    complianceMutation.mutate(data);
  };

  // Stock Form state for the selected variant
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.id || '');
  const [stockForm, setStockForm] = useState({
    batchNumber: '',
    manufacturingDate: '',
    expiryDate: '',
    quantity: 0,
    netQuantity: ''
  });

  const stockMutation = useMutation({
    mutationFn: (data: any) => api.post(`/product/${product.id}/variant/${selectedVariant}/stock`, data),
    onSuccess: () => {
      onRefresh();
      setStockForm({ batchNumber: '', manufacturingDate: '', expiryDate: '', quantity: 0, netQuantity: '' });
      alert('Opening stock initialized!');
    }
  });

  const onSubmitStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVariant) return alert('Select a variant first');
    stockMutation.mutate({
      ...stockForm,
      quantity: Number(stockForm.quantity)
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Compliance & Stock</h3>
              <p className="text-sm text-slate-500">Manage Rules 2020 data for {product.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-slate-100 px-6 pt-2">
          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'compliance' ? 'border-amber-600 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Compliance & Commerce
          </button>
          <button
            onClick={() => setActiveTab('stock')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'stock' ? 'border-amber-600 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Opening Stock Entry
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">
          {activeTab === 'compliance' && (
            <form onSubmit={handleSubmitCompliance(onSubmitCompliance)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">GST Rate (%)</label>
                  <input type="number" {...registerCompliance('gstRate', { valueAsNumber: true })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">HSN Code</label>
                  <input type="text" {...registerCompliance('hsnCode')} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Manufacturer Name</label>
                <input type="text" {...registerCompliance('manufacturerName')} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Manufacturer Address</label>
                <textarea {...registerCompliance('manufacturerAddress')} rows={3} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Country of Origin</label>
                  <input type="text" {...registerCompliance('countryOfOrigin')} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Test Report Reference</label>
                  <input type="text" {...registerCompliance('testReportRef')} placeholder="e.g. TR-2023-XYZ" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={complianceMutation.isPending} className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                  <Save className="w-4 h-4" />
                  {complianceMutation.isPending ? 'Saving...' : 'Save Compliance Details'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'stock' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-amber-800">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Opening Stock Initialization</p>
                  <p className="opacity-90">Use this to intake the initial warehouse stock and bind it to a manufacturing batch. Further stock changes should happen via the Inventory Panel.</p>
                </div>
              </div>

              <form onSubmit={onSubmitStock} className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Select Variant</label>
                    <select 
                      value={selectedVariant} 
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="">-- Choose Variant --</option>
                      {product.variants?.map((v: any) => (
                        <option key={v.id} value={v.id}>{v.name} (SKU: {v.sku})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Net Quantity (e.g. 50ml, 100g)</label>
                    <input 
                      type="text" 
                      value={stockForm.netQuantity}
                      onChange={e => setStockForm({...stockForm, netQuantity: e.target.value})}
                      placeholder="Updates variant net quantity"
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Batch Number *</label>
                    <input 
                      type="text" 
                      required
                      value={stockForm.batchNumber}
                      onChange={e => setStockForm({...stockForm, batchNumber: e.target.value})}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Opening Stock Quantity *</label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      value={stockForm.quantity}
                      onChange={e => setStockForm({...stockForm, quantity: Number(e.target.value)})}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Manufacturing Date</label>
                    <input 
                      type="date" 
                      value={stockForm.manufacturingDate}
                      onChange={e => setStockForm({...stockForm, manufacturingDate: e.target.value})}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Expiry Date</label>
                    <input 
                      type="date" 
                      value={stockForm.expiryDate}
                      onChange={e => setStockForm({...stockForm, expiryDate: e.target.value})}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" 
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button type="submit" disabled={stockMutation.isPending} className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    {stockMutation.isPending ? 'Initializing...' : 'Initialize Stock Intake'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
