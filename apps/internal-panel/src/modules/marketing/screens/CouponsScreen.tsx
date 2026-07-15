import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { Plus, Tag, Trash2, Edit3, Save } from 'lucide-react';

export default function CouponManager() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isCreating, setIsCreating] = useState(false);

  const { data: coupons, isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await api.get('/marketing/coupons');
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/marketing/coupons', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsCreating(false);
      setEditForm({});
    },
    onError: (err: any) => alert(err.response?.data?.message || 'Error creating coupon')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => api.put(`/marketing/coupons/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsEditing(null);
    },
    onError: (err: any) => alert(err.response?.data?.message || 'Error updating coupon')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/marketing/coupons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    }
  });

  const handleSave = (id?: string) => {
    // Parse numeric fields properly
    const data = {
      ...editForm,
      discountValue: parseFloat(editForm.discountValue),
      minPurchase: editForm.minPurchase ? parseFloat(editForm.minPurchase) : null,
      maxDiscount: editForm.maxDiscount ? parseFloat(editForm.maxDiscount) : null,
      usageLimit: editForm.usageLimit ? parseInt(editForm.usageLimit) : null,
    };

    if (id) {
      updateMutation.mutate({ id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const renderForm = (id?: string) => (
    <div className={`border rounded-xl p-4 shadow-sm space-y-4 ${id ? 'bg-white' : 'bg-orange-50'}`}>
      <h3 className="font-bold text-gray-900">{id ? 'Edit Coupon' : 'New Coupon'}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">Code</label>
          <input 
            type="text" 
            placeholder="e.g. SUMMER50" 
            className="w-full border rounded px-3 py-2 text-sm uppercase"
            value={editForm.code || ''}
            onChange={e => setEditForm({...editForm, code: e.target.value.toUpperCase()})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">Discount Type</label>
          <select 
            className="w-full border rounded px-3 py-2 text-sm"
            value={editForm.discountType || 'PERCENTAGE'}
            onChange={e => setEditForm({...editForm, discountType: e.target.value})}
          >
            <option value="PERCENTAGE">Percentage (%)</option>
            <option value="FIXED_AMOUNT">Fixed Amount (₹)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">Discount Value</label>
          <input 
            type="number" 
            className="w-full border rounded px-3 py-2 text-sm"
            value={editForm.discountValue || ''}
            onChange={e => setEditForm({...editForm, discountValue: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">Min Purchase (₹)</label>
          <input 
            type="number" 
            className="w-full border rounded px-3 py-2 text-sm"
            value={editForm.minPurchase || ''}
            onChange={e => setEditForm({...editForm, minPurchase: e.target.value})}
          />
        </div>
        <div className="space-y-1 col-span-2">
          <label className="text-xs font-semibold text-gray-600">Description</label>
          <input 
            type="text" 
            className="w-full border rounded px-3 py-2 text-sm"
            value={editForm.description || ''}
            onChange={e => setEditForm({...editForm, description: e.target.value})}
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input 
            type="checkbox" 
            checked={editForm.isActive} 
            onChange={e => setEditForm({...editForm, isActive: e.target.checked})}
          /> Active
        </label>
        <div className="flex gap-2">
          <button onClick={() => id ? setIsEditing(null) : setIsCreating(false)} className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded">Cancel</button>
          <button onClick={() => handleSave(id)} className="px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 flex items-center gap-1">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Coupons</h2>
          <p className="text-sm text-gray-500">Manage promotional discount codes</p>
        </div>
        <button 
          onClick={() => { setIsCreating(true); setEditForm({ isActive: true, discountType: 'PERCENTAGE' }); }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-4 h-4" /> Add Coupon
        </button>
      </div>

      <div className="space-y-6">
        {isCreating && renderForm()}

        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading coupons...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Code</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Value</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Usage</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="p-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coupons?.map((coupon: any) => (
                  <tr key={coupon.id}>
                    {isEditing === coupon.id ? (
                      <td colSpan={5} className="p-4 bg-gray-50">
                        {renderForm(coupon.id)}
                      </td>
                    ) : (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-orange-500" />
                            <span className="font-bold text-gray-900">{coupon.code}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{coupon.description}</div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-orange-600">
                            {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                          </span>
                          {coupon.minPurchase && <div className="text-xs text-gray-500">Min: ₹{coupon.minPurchase}</div>}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {coupon.usedCount} {coupon.usageLimit ? `/ ${coupon.usageLimit}` : 'uses'}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {coupon.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => { setIsEditing(coupon.id); setEditForm(coupon); }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => { if(confirm('Delete coupon?')) deleteMutation.mutate(coupon.id); }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
