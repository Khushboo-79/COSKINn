import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Save, X, Globe, HelpCircle } from 'lucide-react';

export default function SeoManager({ product, onClose }: { product: any, onClose: () => void }) {
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      seoTitle: product.seoTitle || '',
      seoDesc: product.seoDesc || '',
      seoKeywords: product.seoKeywords || '',
    }
  });

  const mutation = useMutation({
    mutationFn: (data: any) => api.patch(`/product/${product.id}/seo`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('SEO fields saved successfully!');
      onClose();
    }
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">SEO Management</h3>
              <p className="text-sm text-slate-500">Configure search engine tags for {product.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
              <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Why is this important?</p>
                <p className="opacity-90">These fields are used to populate the meta tags on the customer-facing website. Proper SEO helps products rank higher on Google and improves click-through rates.</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex justify-between">
                <span>SEO Meta Title</span>
                <span className="text-xs text-slate-400">Recommended: 50-60 characters</span>
              </label>
              <input 
                type="text" 
                {...register('seoTitle')} 
                placeholder={`e.g. Buy ${product.name} Online | COSKINn`}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex justify-between">
                <span>SEO Meta Description</span>
                <span className="text-xs text-slate-400">Recommended: 150-160 characters</span>
              </label>
              <textarea 
                {...register('seoDesc')} 
                rows={3} 
                placeholder="Write a compelling description for search engine results..."
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                SEO Keywords
              </label>
              <textarea 
                {...register('seoKeywords')} 
                rows={2}
                placeholder="e.g. face wash, glowing skin, natural cleanser (comma separated)"
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
              />
              <p className="text-xs text-slate-500 mt-1">Comma separated list of keywords. Note: Google relies less on keywords today, but it helps internal search.</p>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 mt-6 pt-6">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={mutation.isPending || isSubmitting} 
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {mutation.isPending || isSubmitting ? 'Saving...' : 'Save SEO Fields'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
