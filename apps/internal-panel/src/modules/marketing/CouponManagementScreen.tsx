import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketingApi } from '../../core/api/marketing';
import { Plus, Tag, Percent, IndianRupee, Loader2, Save, Trash2, Edit, Calendar } from 'lucide-react';

export const CouponManagementScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minPurchase, setMinPurchase] = useState<number>(0);
  const [maxDiscount, setMaxDiscount] = useState<number>(0);
  const [usageLimit, setUsageLimit] = useState<number>(100);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isActive, setIsActive] = useState(true);

  const { data: coupons, isLoading } = useQuery({
    queryKey: ['marketing', 'coupons'],
    queryFn: () => marketingApi.getCoupons()
  });

  const saveMutation = useMutation({
    mutationFn: () => {
      const data = {
        code: code.toUpperCase(),
        description,
        discountType,
        discountValue,
        minPurchase: minPurchase > 0 ? minPurchase : null,
        maxDiscount: maxDiscount > 0 ? maxDiscount : null,
        usageLimit: usageLimit > 0 ? usageLimit : null,
        startDate: startDate ? new Date(startDate).toISOString() : null,
        endDate: endDate ? new Date(endDate).toISOString() : null,
        isActive
      };
      return editingId ? marketingApi.updateCoupon(editingId, data) : marketingApi.createCoupon(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing', 'coupons'] });
      setIsAdding(false);
      setEditingId(null);
      setCode('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => marketingApi.deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing', 'coupons'] });
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Discount Coupons</h1>
          <p className="text-slate-500 text-sm mt-1">Manage promotional codes and cart rules.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setCode('');
            setDescription('');
            setDiscountType('PERCENTAGE');
            setDiscountValue(10);
            setMinPurchase(0);
            setMaxDiscount(0);
            setUsageLimit(100);
            setStartDate('');
            setEndDate('');
            setIsActive(true);
            setIsAdding(true);
          }}
          className="bg-[#FF3E7F] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-[#FF3E7F] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Create Coupon
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#FF3E7F]/5 border border-[#FF3E7F]/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">{editingId ? 'Edit Coupon' : 'New Coupon Code'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            <div className="md:col-span-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">Coupon Code <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF3E7F]/70" />
                  <input 
                    type="text" 
                    value={code}
                    onChange={e => setCode(e.target.value.toUpperCase().replace(/\s/g, ''))}
                    placeholder="SUMMER20"
                    className="w-full pl-9 pr-4 border-[#FF3E7F]/20 rounded-lg p-2 focus:ring-2 focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F] bg-white uppercase font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">Description</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. 20% off all summer skincare"
                  className="w-full border-[#FF3E7F]/20 rounded-lg p-2 focus:ring-2 focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F] bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="rounded text-[#FF3E7F] focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F]"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-900">Active immediately</label>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">Discount Type</label>
                  <select 
                    value={discountType}
                    onChange={e => setDiscountType(e.target.value)}
                    className="w-full border-[#FF3E7F]/20 rounded-lg p-2 focus:ring-2 focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F] bg-white"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED_AMOUNT">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">
                    Value {discountType === 'PERCENTAGE' ? '(%)' : '(₹)'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    {discountType === 'PERCENTAGE' ? (
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF3E7F]/70" />
                    ) : (
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF3E7F]/70" />
                    )}
                    <input 
                      type="number" 
                      value={discountValue}
                      onChange={e => setDiscountValue(Number(e.target.value))}
                      min="1"
                      className="w-full pl-9 pr-4 border-[#FF3E7F]/20 rounded-lg p-2 focus:ring-2 focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F] bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">Min. Spend (₹)</label>
                  <input 
                    type="number" 
                    value={minPurchase}
                    onChange={e => setMinPurchase(Number(e.target.value))}
                    min="0"
                    placeholder="0 = No limit"
                    className="w-full border-[#FF3E7F]/20 rounded-lg p-2 focus:ring-2 focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">Max Discount (₹)</label>
                  <input 
                    type="number" 
                    value={maxDiscount}
                    onChange={e => setMaxDiscount(Number(e.target.value))}
                    min="0"
                    placeholder="0 = No limit"
                    disabled={discountType === 'FIXED_AMOUNT'}
                    className="w-full border-[#FF3E7F]/20 rounded-lg p-2 focus:ring-2 focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F] bg-white disabled:bg-slate-100 disabled:opacity-70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">Usage Limit</label>
                  <input 
                    type="number" 
                    value={usageLimit}
                    onChange={e => setUsageLimit(Number(e.target.value))}
                    min="0"
                    placeholder="0 = Unlimited"
                    className="w-full border-[#FF3E7F]/20 rounded-lg p-2 focus:ring-2 focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full border-[#FF3E7F]/20 rounded-lg p-2 focus:ring-2 focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F] bg-white text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">End Date</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    min={startDate}
                    className="w-full border-[#FF3E7F]/20 rounded-lg p-2 focus:ring-2 focus:ring-[#FF3E7F]/30 focus:border-[#FF3E7F] bg-white text-slate-700"
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-3 border-t border-[#FF3E7F]/10 pt-4">
            <button 
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="px-4 py-2 text-sm font-medium text-[#FF3E7F] bg-white border border-[#FF3E7F]/20 rounded-lg hover:bg-[#FF3E7F]/5"
            >
              Cancel
            </button>
            <button 
              onClick={() => saveMutation.mutate()}
              disabled={!code || discountValue <= 0 || saveMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF3E7F] rounded-lg hover:bg-[#FF3E7F] disabled:opacity-50 flex items-center"
            >
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              {editingId ? 'Update Coupon' : 'Create Coupon'}
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading coupons...</div>
      ) : !coupons || coupons.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <Tag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-medium text-slate-900">No coupons found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {coupons.map((coupon: any) => (
            <div key={coupon.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-4 flex-shrink-0 ${coupon.isActive ? 'bg-[#FF3E7F]/10 text-[#FF3E7F]' : 'bg-slate-100 text-slate-500'}`}>
                    <Tag className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-mono text-lg">{coupon.code}</h3>
                    <p className="text-xs text-slate-500 truncate max-w-[200px]">{coupon.description || 'No description'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${coupon.isActive ? 'text-[#FF3E7F]' : 'text-slate-500'}`}>
                    {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}% OFF` : formatCurrency(coupon.discountValue)}
                  </div>
                  {coupon.maxDiscount && coupon.discountType === 'PERCENTAGE' && (
                    <div className="text-xs text-slate-500 mt-1">Upto {formatCurrency(coupon.maxDiscount)}</div>
                  )}
                </div>
              </div>
              
              <div className="p-5 flex-1 grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div>
                  <span className="block text-slate-500 text-xs">Min. Purchase</span>
                  <span className="font-medium text-slate-900">{coupon.minPurchase ? formatCurrency(coupon.minPurchase) : 'None'}</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-xs">Usage Limit</span>
                  <span className="font-medium text-slate-900">
                    {coupon.usedCount} / {coupon.usageLimit ? coupon.usageLimit : '∞'} used
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="block text-slate-500 text-xs mb-1">Validity</span>
                  <div className="flex items-center text-slate-700 font-medium">
                    <Calendar className="h-3 w-3 mr-1" />
                    {coupon.startDate ? new Date(coupon.startDate).toLocaleDateString() : 'Always Valid'}
                    {coupon.endDate ? ` - ${new Date(coupon.endDate).toLocaleDateString()}` : ''}
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
                <button 
                  onClick={() => {
                    setEditingId(coupon.id);
                    setCode(coupon.code);
                    setDescription(coupon.description || '');
                    setDiscountType(coupon.discountType);
                    setDiscountValue(coupon.discountValue);
                    setMinPurchase(coupon.minPurchase || 0);
                    setMaxDiscount(coupon.maxDiscount || 0);
                    setUsageLimit(coupon.usageLimit || 0);
                    setStartDate(coupon.startDate ? new Date(coupon.startDate).toISOString().split('T')[0] : '');
                    setEndDate(coupon.endDate ? new Date(coupon.endDate).toISOString().split('T')[0] : '');
                    setIsActive(coupon.isActive);
                    setIsAdding(true);
                  }}
                  className="p-2 text-slate-400 hover:text-[#FF3E7F] transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => {
                    if(window.confirm('Delete this coupon?')) deleteMutation.mutate(coupon.id);
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
