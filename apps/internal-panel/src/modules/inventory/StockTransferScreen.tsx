import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { ArrowLeft, ArrowRightLeft, AlertTriangle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const StockTransferScreen = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: warehouses } = useQuery({
    queryKey: ['inventory', 'warehouses'],
    queryFn: inventoryApi.getWarehouses,
  });

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      sku: '',
      fromWarehouseId: '',
      toWarehouseId: '',
      quantity: 1,
      notes: '',
      batchNumber: ''
    }
  });

  const fromWarehouseId = watch('fromWarehouseId');
  const toWarehouseId = watch('toWarehouseId');

  const mutation = useMutation({
    mutationFn: (data: any) => {
      const payload = {
        ...data,
        quantity: Number(data.quantity)
      };
      return inventoryApi.transferStock(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
      alert(`Stock transfer recorded successfully.`);
      reset();
      navigate('/inventory');
    },
    onError: (err: any) => {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  });

  const onSubmit = (data: any) => {
    if (data.fromWarehouseId === data.toWarehouseId) {
      alert("Source and Destination warehouses cannot be the same.");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transfer Stock</h1>
          <p className="text-slate-500 text-sm mt-1">Move stock between warehouses or bins.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
            <ArrowRightLeft className="h-8 w-8" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
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
              <label className="block text-sm font-medium text-slate-700 mb-2">From Warehouse <span className="text-red-500">*</span></label>
              <select
                {...register('fromWarehouseId', { required: 'Source warehouse is required' })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              >
                <option value="">Select source...</option>
                {warehouses?.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
              {errors.fromWarehouseId && <p className="text-red-500 text-xs mt-1">{errors.fromWarehouseId.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">To Warehouse <span className="text-red-500">*</span></label>
              <select
                {...register('toWarehouseId', { required: 'Destination warehouse is required' })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              >
                <option value="">Select destination...</option>
                {warehouses?.map(w => (
                  <option key={w.id} value={w.id} disabled={w.id === fromWarehouseId}>{w.name}</option>
                ))}
              </select>
              {errors.toWarehouseId && <p className="text-red-500 text-xs mt-1">{errors.toWarehouseId.message as string}</p>}
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Batch Number</label>
              <input
                type="text"
                {...register('batchNumber')}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Transfer Notes</label>
              <textarea
                {...register('notes')}
                rows={2}
                placeholder="e.g. Replenishing regional fulfillment center..."
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              This will deduct stock from the Source warehouse and add it to the Destination warehouse simultaneously in a single ledger transaction.
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm flex items-center disabled:opacity-70"
            >
              {mutation.isPending ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <ArrowRightLeft className="h-5 w-5 mr-2" />}
              Execute Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
