import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { ArrowLeft, Save, Plus, Minus, AlertTriangle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const StockAdjustmentScreen = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [adjustmentType, setAdjustmentType] = useState<'IN' | 'OUT'>('IN');
  
  const { data: warehouses = [] } = useQuery({
    queryKey: ['inventory', 'warehouses'],
    queryFn: inventoryApi.getWarehouses,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      warehouseId: '',
      sku: '',
      quantity: 1,
      reasonCode: '',
      notes: '',
      batchNumber: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      const payload = {
        ...data,
        quantity: Number(data.quantity)
      };
      return adjustmentType === 'IN' 
        ? inventoryApi.stockIn(payload) 
        : inventoryApi.stockOut(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stats'] });
      toast.success();
      reset();
      navigate('/inventory');
    },
    onError: (err: any) => {
      toast.error();
    }
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manual Stock Adjustment</h1>
          <p className="text-slate-500 text-sm mt-1">Record a manual ledger entry for stock discrepancies or damage.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setAdjustmentType('IN')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center font-medium border-2 transition-all ${
              adjustmentType === 'IN' 
                ? 'border-green-500 bg-green-50 text-green-700' 
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Plus className="h-5 w-5 mr-2" />
            Stock In (Add)
          </button>
          <button
            type="button"
            onClick={() => setAdjustmentType('OUT')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center font-medium border-2 transition-all ${
              adjustmentType === 'OUT' 
                ? 'border-red-500 bg-red-50 text-red-700' 
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Minus className="h-5 w-5 mr-2" />
            Stock Out (Remove)
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Warehouse <span className="text-red-500">*</span></label>
              <select
                {...register('warehouseId', { required: 'Warehouse is required' })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              >
                <option value="">Select warehouse...</option>
                {warehouses.map((wh: any) => (
                  <option key={wh.id} value={wh.id}>{wh.name}</option>
                ))}
              </select>
              {errors.warehouseId && <p className="text-red-500 text-xs mt-1">{errors.warehouseId.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">SKU Code <span className="text-red-500">*</span></label>
              <input
                type="text"
                {...register('sku', { required: 'SKU is required' })}
                placeholder="e.g. CSK-NIA-30ML"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Quantity <span className="text-red-500">*</span></label>
              <input
                type="number"
                min="1"
                {...register('quantity', { required: 'Quantity is required', min: 1 })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Reason Code <span className="text-red-500">*</span></label>
              <select
                {...register('reasonCode', { required: 'Reason code is required' })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              >
                <option value="">Select a reason...</option>
                {adjustmentType === 'IN' ? (
                  <>
                    <option value="OPENING_STOCK">Opening Stock</option>
                    <option value="MANUAL_CORRECTION">Manual Correction (Found)</option>
                    <option value="RETURN_RESTOCK">Return Restock</option>
                  </>
                ) : (
                  <>
                    <option value="DAMAGE_WRITE_OFF">Damage Write-Off</option>
                    <option value="EXPIRED_WRITE_OFF">Expired Write-Off</option>
                    <option value="SAMPLE_STOCK">Internal Sample</option>
                    <option value="MANUAL_CORRECTION">Manual Correction (Lost)</option>
                  </>
                )}
              </select>
              {errors.reasonCode && <p className="text-red-500 text-xs mt-1">{errors.reasonCode.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Batch Number</label>
              <input
                type="text"
                {...register('batchNumber')}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes / Approver Details</label>
              <textarea
                {...register('notes')}
                rows={3}
                placeholder="Provide context for this adjustment..."
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Compliance Notice:</strong> This action creates an immutable ledger entry. Ensure all quantities and reason codes are accurate before saving.
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm flex items-center disabled:opacity-70"
            >
              {mutation.isPending ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Save className="h-5 w-5 mr-2" />}
              Record Ledger Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
