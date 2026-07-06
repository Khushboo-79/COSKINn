import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ArrowLeft, Box } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function StockIntake() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    warehouseId: '',
    sku: '',
    quantity: 1,
    reference: '',
  });

  const { data: warehouses = [] } = useQuery({
    queryKey: ['warehouses'],
    queryFn: async () => {
      const res = await api.get('/inventory/warehouses');
      return res.data;
    }
  });

  // For Day 13 we'll let them type SKU or pick from a simple product feed
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/product');
      return res.data.data || res.data;
    }
  });

  const intakeMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return api.post('/inventory/stock-in', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
      navigate('/inventory');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.warehouseId || !formData.sku || formData.quantity <= 0) return;
    intakeMutation.mutate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
          Stock Intake
        </h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Add Available Stock</h3>
            <p className="text-sm text-slate-500">Creates a StockMovement ledger entry and updates Available count.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Destination Warehouse</label>
            <select
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.warehouseId}
              onChange={e => setFormData({ ...formData, warehouseId: e.target.value })}
            >
              <option value="">Select a warehouse...</option>
              {warehouses.map((w: any) => (
                <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Product SKU</label>
            <select
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.sku}
              onChange={e => setFormData({ ...formData, sku: e.target.value })}
            >
              <option value="">Select a product/variant SKU...</option>
              {products.flatMap((p: any) => p.variants || []).map((v: any) => (
                <option key={v.sku} value={v.sku}>{v.sku} - {v.name}</option>
              ))}
            </select>
            {products.length === 0 && (
              <p className="text-xs text-amber-600 mt-2">Make sure you have products created with variants to select SKUs.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity to Intake</label>
              <input
                type="number"
                min="1"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Reference Note</label>
              <input
                type="text"
                placeholder="e.g. Opening Stock, Manual Adj."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.reference}
                onChange={e => setFormData({ ...formData, reference: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={intakeMutation.isPending}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {intakeMutation.isPending ? 'Processing Ledger Entry...' : 'Confirm Stock Intake'}
            </button>
          </div>
          
          {intakeMutation.isError && (
            <div className="text-red-500 text-sm mt-2">
              Failed to intake stock. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
