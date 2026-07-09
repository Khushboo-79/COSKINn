import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { BarChart2, Search, Edit2, Check, X, AlertCircle } from 'lucide-react';

export default function PricingManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', searchTerm],
    queryFn: async () => {
      const { data } = await api.get('/product', { params: { search: searchTerm } });
      return data;
    },
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ mrp: 0, discountPrice: 0 });

  const startEditing = (product: any) => {
    setEditingId(product.id);
    setEditForm({
      mrp: product.mrp,
      discountPrice: product.discountPrice || product.mrp,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const updateMutation = useMutation({
    mutationFn: (data: { id: string, mrp: number, discountPrice: number }) => 
      api.patch(`/product/${data.id}`, { mrp: data.mrp, discountPrice: data.discountPrice }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingId(null);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to update pricing');
    }
  });

  const handleSave = (id: string) => {
    updateMutation.mutate({ id, ...editForm });
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-emerald-500" />
            Pricing Manager
          </h1>
          <p className="text-slate-500 text-sm mt-1">Quickly adjust MRP and selling prices across your catalog.</p>
        </div>
        <div className="relative w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-slate-400">Loading pricing data...</div>
        ) : products?.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <AlertCircle className="w-12 h-12 text-slate-300" />
            <p>No products found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">MRP (₹)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Selling Price (₹)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products?.map((product: any) => {
                  const isEditing = editingId === product.id;

                  return (
                    <tr key={product.id} className={`transition-colors ${isEditing ? 'bg-emerald-50/50' : 'hover:bg-slate-50/50'}`}>
                      <td className="px-6 py-4 font-mono text-sm text-slate-500">{product.sku}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{product.name}</div>
                        <div className="text-xs text-slate-500">{product.category?.name}</div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            product.status === 'LIVE' ? 'bg-emerald-100 text-emerald-700' : 
                            product.status === 'DRAFT' ? 'bg-slate-100 text-slate-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {product.status}
                          </span>
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input 
                            type="number"
                            value={editForm.mrp}
                            onChange={(e) => setEditForm(prev => ({...prev, mrp: parseFloat(e.target.value) || 0}))}
                            className="w-24 px-3 py-1.5 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        ) : (
                          <span className="text-slate-800 font-medium">₹{product.mrp}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input 
                            type="number"
                            value={editForm.discountPrice}
                            onChange={(e) => setEditForm(prev => ({...prev, discountPrice: parseFloat(e.target.value) || 0}))}
                            className="w-24 px-3 py-1.5 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        ) : (
                          <span className="text-emerald-600 font-bold">₹{product.discountPrice || product.mrp}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleSave(product.id)}
                              disabled={updateMutation.isPending}
                              className="p-1.5 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 rounded transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={cancelEditing}
                              className="p-1.5 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => startEditing(product)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors inline-block"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
