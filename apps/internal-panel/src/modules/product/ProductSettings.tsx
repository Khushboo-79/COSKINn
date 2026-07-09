import { Settings, Save, Shield } from 'lucide-react';

export default function ProductSettings() {
  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-600" />
          Product Module Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">Configure global defaults and tax rules for the product catalog.</p>
      </div>

      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Shield className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold text-slate-800">Global Tax Defaults</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Default GST Rate (%)</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500">
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18" selected>18%</option>
                  <option value="28">28%</option>
                </select>
                <p className="text-xs text-slate-500">Applied automatically to new products if not specified.</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Default HSN Code</label>
                <input type="text" placeholder="e.g. 3304" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-base font-bold text-slate-800">Compliance Defaults</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Default Manufacturer Name</label>
              <input type="text" defaultValue="COSKINn India Pvt. Ltd." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Default Manufacturer Address</label>
              <textarea rows={3} defaultValue="123 Industrial Area, Phase 1, New Delhi, India 110020" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"></textarea>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Default Country of Origin</label>
              <input type="text" defaultValue="India" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors font-medium">
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
