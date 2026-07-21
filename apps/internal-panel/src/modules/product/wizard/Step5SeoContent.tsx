import { useFormContext } from 'react-hook-form';

export const Step5SeoContent = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Content & SEO</h2>
        <p className="text-sm text-slate-500">Information displayed to customers and search engines.</p>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Customer Content</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">How to Use</label>
            <textarea
              {...register('howToUse')}
              rows={3}
              placeholder="e.g. Apply 2-3 drops on clean skin..."
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Product Claims & Benefits (Comma separated)</label>
            <input
              type="text"
              {...register('claims')}
              placeholder="e.g. Dermatologically Tested, Cruelty Free, Vegan"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Warnings & Precautions</label>
            <textarea
              {...register('warnings')}
              rows={2}
              placeholder="e.g. Avoid contact with eyes. Discontinue use if irritation occurs."
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Storage Instructions</label>
            <input
              type="text"
              {...register('storageInstructions')}
              placeholder="e.g. Store in a cool, dry place"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Return Policy</label>
            <select 
              {...register('returnPolicy')}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
            >
              <option value="7_days">7 Days Returnable</option>
              <option value="14_days">14 Days Returnable</option>
              <option value="non_returnable">Non-Returnable</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isReturnable" {...register('isReturnable')} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="isReturnable" className="text-sm font-medium text-slate-700">Is Returnable</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isCodAvailable" {...register('isCodAvailable')} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="isCodAvailable" className="text-sm font-medium text-slate-700">COD Available</label>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="space-y-6 pt-6">
        <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">SEO Fields</h3>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meta Title</label>
            <input
              type="text"
              {...register('seoTitle')}
              placeholder="Keep under 60 characters"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
            <textarea
              {...register('seoDescription')}
              rows={2}
              placeholder="Keep under 160 characters"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Meta Keywords</label>
            <input
              type="text"
              {...register('seoKeywords')}
              placeholder="e.g. face serum, skincare, glowing skin"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
