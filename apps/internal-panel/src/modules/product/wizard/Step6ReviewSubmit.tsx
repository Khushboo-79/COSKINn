import { useFormContext } from 'react-hook-form';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export const Step6ReviewSubmit = () => {
  const { watch } = useFormContext();
  const formValues = watch();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-50 p-4 rounded-full text-green-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to Submit!</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Please review the product details before submitting. Upon submission, the product will be set to <strong>Draft</strong> and will require Admin Approval to go Live.
        </p>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Base Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="block text-slate-500 mb-1">Name</span>
              <span className="font-medium text-slate-900">{formValues.name || '-'}</span>
            </div>
            <div>
              <span className="block text-slate-500 mb-1">Category ID</span>
              <span className="font-medium text-slate-900">{formValues.categoryId || '-'}</span>
            </div>
            <div>
              <span className="block text-slate-500 mb-1">Brand ID</span>
              <span className="font-medium text-slate-900">{formValues.brandId || '-'}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Compliance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="block text-slate-500 mb-1">HSN Code</span>
              <span className="font-medium text-slate-900">{formValues.hsnCode || '-'}</span>
            </div>
            <div>
              <span className="block text-slate-500 mb-1">GST Rate</span>
              <span className="font-medium text-slate-900">{formValues.gstRate}%</span>
            </div>
            <div>
              <span className="block text-slate-500 mb-1">Manufacturer</span>
              <span className="font-medium text-slate-900">{formValues.manufacturerName || '-'}</span>
            </div>
            <div>
              <span className="block text-slate-500 mb-1">Origin</span>
              <span className="font-medium text-slate-900">{formValues.countryOfOrigin || '-'}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Variants ({formValues.variants?.length || 0})</h3>
          <div className="space-y-2">
            {formValues.variants?.map((v: any, i: number) => (
              <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 text-sm">
                <span className="font-medium text-slate-900">{v.sku || `Variant ${i + 1}`}</span>
                <span className="text-slate-500">MRP: ₹{v.mrp} | Selling: ₹{v.price} | {v.size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            Ensure all Cosmetics Rules 2020 mandatory fields are accurate. Inaccurate compliance data will lead to rejection by the Admin.
          </p>
        </div>
      </div>
    </div>
  );
};
