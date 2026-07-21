import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

export const Step3Variants = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Product Variants</h2>
          <p className="text-sm text-slate-500">Manage SKUs, sizes, shades, and pricing.</p>
        </div>
        <button
          type="button"
          onClick={() => append({ sku: '', size: '', price: 0, mrp: 0, shadeName: '', shadeHex: '' })}
          className="flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add Variant
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group">
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mr-8">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">SKU <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  {...register(`variants.${index}.sku` as const)}
                  placeholder="e.g. CSK-NIA-30ML"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Size / Volume</label>
                <input
                  type="text"
                  {...register(`variants.${index}.size` as const)}
                  placeholder="e.g. 30ml, 50g"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">MRP (₹) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  {...register(`variants.${index}.mrp` as const, { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Selling Price (₹) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  {...register(`variants.${index}.price` as const, { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Shade Name (Optional)</label>
                <input
                  type="text"
                  {...register(`variants.${index}.shadeName` as const)}
                  placeholder="e.g. Ruby Red"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Shade Hex (Optional)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    {...register(`variants.${index}.shadeHex` as const)}
                    className="h-9 w-9 rounded border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    {...register(`variants.${index}.shadeHex` as const)}
                    placeholder="#E11D48"
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Tags & Classifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Key Ingredients (Comma separated)</label>
            <input
              type="text"
              {...register('ingredients')}
              placeholder="e.g. Niacinamide, Zinc PCA, Aloe Vera"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Skin Concerns (Comma separated)</label>
            <input
              type="text"
              {...register('skinConcerns')}
              placeholder="e.g. Acne, Dark Spots, Pores"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
