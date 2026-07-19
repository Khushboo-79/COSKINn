import { useFormContext } from 'react-hook-form';

export const Step1BaseDetails = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Base Details</h2>
        <p className="text-sm text-slate-500 mb-6">Enter the primary information for this product.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Product Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register('name')}
            placeholder="e.g. Niacinamide 10% Face Serum"
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Category <span className="text-red-500">*</span></label>
          <select 
            {...register('categoryId')}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          >
            <option value="">Select a category</option>
            <option value="skincare">Skincare</option>
            <option value="makeup">Makeup</option>
            <option value="haircare">Haircare</option>
            <option value="bodycare">Bodycare</option>
          </select>
          {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Brand <span className="text-red-500">*</span></label>
          <select 
            {...register('brandId')}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          >
            <option value="">Select a brand</option>
            <option value="coskinn">COSKINn</option>
            <option value="partner">Partner Brand</option>
          </select>
          {errors.brandId && <p className="mt-1 text-sm text-red-600">{errors.brandId.message as string}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Product Description <span className="text-red-500">*</span></label>
          <textarea
            {...register('description')}
            rows={5}
            placeholder="Enter a detailed description of the product..."
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>}
        </div>
      </div>
    </div>
  );
};
