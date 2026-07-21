import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { ArrowLeft, AlertOctagon, ShieldAlert, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ReportDamageScreen = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [reportType, setReportType] = useState<'DAMAGED' | 'EXPIRED'>('DAMAGED');

  const { data: warehouses } = useQuery({
    queryKey: ['inventory', 'warehouses'],
    queryFn: inventoryApi.getWarehouses,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      sku: '',
      warehouseId: '',
      quantity: 1,
      batchNumber: '',
      reason: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      const payload = {
        ...data,
        quantity: Number(data.quantity)
      };
      
      if (reportType === 'DAMAGED') {
        return inventoryApi.reportDamaged({
          sku: payload.sku,
          warehouseId: payload.warehouseId,
          quantity: payload.quantity,
          reason: payload.reason,
          batchNumber: payload.batchNumber || undefined
        });
      } else {
        return inventoryApi.reportExpired({
          sku: payload.sku,
          warehouseId: payload.warehouseId,
          quantity: payload.quantity,
          batchNumber: payload.batchNumber, // Mandatory for expired
          reason: payload.reason || undefined
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stats'] });
      alert(`${reportType === 'DAMAGED' ? 'Damage' : 'Expiration'} report filed successfully. Inventory adjusted.`);
      reset();
      navigate('/inventory');
    },
    onError: (err: any) => {
      alert(`Error: ${err.response?.data?.message || err.message}`);
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
          <h1 className="text-2xl font-bold text-slate-900">Report Damaged / Expired</h1>
          <p className="text-slate-500 text-sm mt-1">Quarantine stock and remove it from available inventory.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setReportType('DAMAGED')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center font-medium border-2 transition-all ${
              reportType === 'DAMAGED' 
                ? 'border-amber-500 bg-amber-50 text-amber-800' 
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <AlertOctagon className="h-5 w-5 mr-2" />
            Report Damaged
          </button>
          <button
            type="button"
            onClick={() => setReportType('EXPIRED')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center font-medium border-2 transition-all ${
              reportType === 'EXPIRED' 
                ? 'border-red-500 bg-red-50 text-red-800' 
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="h-5 w-5 mr-2" />
            Report Expired
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Warehouse <span className="text-red-500">*</span></label>
              <select
                {...register('warehouseId', { required: 'Warehouse is required' })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              >
                <option value="">Select location...</option>
                {warehouses?.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
              {errors.warehouseId && <p className="text-red-500 text-xs mt-1">{errors.warehouseId.message as string}</p>}
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
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Batch Number {reportType === 'EXPIRED' && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                {...register('batchNumber', { required: reportType === 'EXPIRED' ? 'Batch number required for expiry' : false })}
                placeholder={reportType === 'EXPIRED' ? "Required" : "Optional"}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.batchNumber && <p className="text-red-500 text-xs mt-1">{errors.batchNumber.message as string}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reason / Notes {reportType === 'DAMAGED' && <span className="text-red-500">*</span>}
              </label>
              <textarea
                {...register('reason', { required: reportType === 'DAMAGED' ? 'Reason is required for damage report' : false })}
                rows={3}
                placeholder={reportType === 'DAMAGED' ? "e.g. Forklift accident during unloading..." : "Optional details..."}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message as string}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={mutation.isPending}
              className={`px-6 py-2.5 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center disabled:opacity-70 ${
                reportType === 'DAMAGED' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {mutation.isPending ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : reportType === 'DAMAGED' ? (
                <AlertOctagon className="h-5 w-5 mr-2" />
              ) : (
                <ShieldAlert className="h-5 w-5 mr-2" />
              )}
              Confirm & Quarantine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
