import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '../../lib/axios';
import { Layers, Plus, Edit2, Trash2, X, ArrowLeft } from 'lucide-react';

const variantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().min(1, 'SKU is required'),
  mrp: z.coerce.number().min(0, 'MRP must be positive'),
  price: z.coerce.number().min(0, 'Selling Price must be positive'),
  shadeCode: z.string().optional(),
  fragrance: z.string().optional(),
  flavor: z.string().optional(),
});

type VariantFormValues = z.infer<typeof variantSchema>;

export default function VariantManager({ productId, onClose }: { productId: string, onClose: () => void }) {
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  // Fetch product to get existing variants and product info
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data } = await api.get(`/product/${productId}`);
      return data;
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema),
  });

  const createMutation = useMutation({
    mutationFn: (newVariant: VariantFormValues) => api.post(`/product/${productId}/variant`, newVariant),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      setIsCreating(false);
      reset();
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to create variant');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (variantId: string) => api.delete(`/product/${productId}/variant/${variantId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product', productId] }),
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to delete variant');
    }
  });

  const onSubmit = (data: VariantFormValues) => {
    createMutation.mutate(data);
  };

  const isMakeup = product?.category?.mode === 'makeup' || product?.category?.mode === 'both';
  const isSkincare = product?.category?.mode === 'skincare' || product?.category?.mode === 'both';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
            <Layers className="w-6 h-6 text-rose-500" />
            Manage Variants
          </h2>
          <p className="text-slate-500 text-sm">{product?.name}</p>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Variant
        </button>
      </div>

      {isCreating && (
        <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-slate-800">New Variant</h3>
            <button onClick={() => {setIsCreating(false); reset();}} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Variant Name</label>
                <input {...register('name')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" placeholder="e.g. 50ml, Ruby Red" />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">SKU</label>
                <input {...register('sku')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" placeholder="e.g. SKU-123" />
                {errors.sku && <p className="text-red-500 text-xs">{errors.sku.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">MRP (₹)</label>
                <input type="number" {...register('mrp')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
                {errors.mrp && <p className="text-red-500 text-xs">{errors.mrp.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Selling Price (₹)</label>
                <input type="number" {...register('price')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
                {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
              </div>

              {/* Mode Specific Fields */}
              {isMakeup && (
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    Shade Code
                    <span className="text-xs font-normal text-slate-400">(Hex)</span>
                  </label>
                  <div className="flex gap-2">
                    <input type="color" {...register('shadeCode')} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                    <input type="text" {...register('shadeCode')} className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 uppercase" placeholder="#FFFFFF" />
                  </div>
                </div>
              )}

              {isSkincare && (
                <>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Fragrance</label>
                    <input {...register('fragrance')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" placeholder="e.g. Lavender" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Flavor (Lip Products)</label>
                    <input {...register('flavor')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" placeholder="e.g. Strawberry" />
                  </div>
                </>
              )}
            </div>
            
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={createMutation.isPending} className="px-5 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium disabled:opacity-50">
                {createMutation.isPending ? 'Saving...' : 'Save Variant'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400">Loading variants...</div>
        ) : product?.variants?.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No variants found.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name / Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {product?.variants?.map((v: any) => (
                <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-sm text-slate-600">{v.sku}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{v.name}</div>
                    <div className="text-xs flex items-center gap-2 mt-1">
                      {v.shadeCode && (
                         <span className="flex items-center gap-1.5 text-slate-500">
                           <span className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: v.shadeCode }} />
                           {v.shadeCode}
                         </span>
                      )}
                      {v.fragrance && <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{v.fragrance}</span>}
                      {v.flavor && <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{v.flavor}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-800">₹{v.price}</div>
                    {v.price < v.mrp && <div className="text-xs text-slate-400 line-through">₹{v.mrp}</div>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm('Are you sure you want to delete this variant?')) {
                            deleteMutation.mutate(v.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
