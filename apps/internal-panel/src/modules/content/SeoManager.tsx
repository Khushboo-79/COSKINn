import { Globe, Search, ArrowRight, Settings } from 'lucide-react';

export default function SeoManager() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">SEO Manager</h2>
          <p className="text-sm text-gray-500">Manage Meta Tags and OpenGraph data</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900">Global SEO Settings</h3>
            <p className="text-sm text-blue-700">Configure default metadata for the entire store</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <Settings className="w-4 h-4" /> Edit Global
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" /> Page-Specific SEO
          </h3>
        </div>
        <div className="divide-y divide-gray-100 p-8 text-center text-gray-500">
          <p>The backend SEO Admin API is not fully implemented yet.</p>
          <p className="text-sm mt-2">You will be able to edit Product and Category SEO directly from their respective catalog pages.</p>
        </div>
      </div>
    </div>
  );
}
