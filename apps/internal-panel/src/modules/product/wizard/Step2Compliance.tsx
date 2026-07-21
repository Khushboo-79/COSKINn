import { useFormContext } from 'react-hook-form';

export const Step2Compliance = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Compliance & Meta</h2>
        <p className="text-sm text-slate-500 mb-6">Tax codes and regulatory information required for billing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">HSN Code <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register('hsnCode')}
            placeholder="e.g. 33049910"
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
          {errors.hsnCode && <p className="mt-1 text-sm text-red-600">{errors.hsnCode.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">GST Rate (%) <span className="text-red-500">*</span></label>
          <select 
            {...register('gstRate')}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          >
            <option value={0}>0%</option>
            <option value={5}>5%</option>
            <option value={12}>12%</option>
            <option value={18}>18%</option>
            <option value={28}>28%</option>
          </select>
          {errors.gstRate && <p className="mt-1 text-sm text-red-600">{errors.gstRate.message as string}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Manufacturer Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register('manufacturerName')}
            placeholder="e.g. COSKINn Manufacturing Unit"
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Manufacturer Address <span className="text-red-500">*</span></label>
          <textarea
            {...register('manufacturerAddress')}
            rows={2}
            placeholder="e.g. Plot No 12, Industrial Area, Phase 1"
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Country of Origin <span className="text-red-500">*</span></label>
          <select 
            {...register('countryOfOrigin')}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="South Korea">South Korea</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Net Quantity <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register('netQuantity')}
            placeholder="e.g. 50g, 100ml"
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};
