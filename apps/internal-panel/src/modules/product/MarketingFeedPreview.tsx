import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Rss, Filter, Copy, ExternalLink, Download } from 'lucide-react';

export default function MarketingFeedPreview() {
  const [filters, setFilters] = useState({
    concern: '',
    ingredient: '',
    skinType: '',
  });

  const { data: feedData, isLoading } = useQuery({
    queryKey: ['marketing-feed', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.concern) params.append('concern', filters.concern);
      if (filters.ingredient) params.append('ingredient', filters.ingredient);
      if (filters.skinType) params.append('skinType', filters.skinType);
      
      const response = await api.get(`/product/marketing-feed?${params.toString()}`);
      return response.data;
    }
  });

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(feedData, null, 2));
    alert('JSON Feed copied to clipboard!');
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(feedData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "marketing-feed.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Rss className="w-6 h-6 text-indigo-600" />
            Marketing Feed Output
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Preview the JSON product feed consumed by Marketing/CRM tools. Only LIVE products are included.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyJson}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            <Copy className="w-4 h-4" />
            Copy JSON
          </button>
          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm shadow-indigo-200"
          >
            <Download className="w-4 h-4" />
            Download Feed
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Filter by Skin Concern</label>
          <input
            type="text"
            placeholder="e.g. Acne, Aging"
            value={filters.concern}
            onChange={(e) => setFilters(f => ({ ...f, concern: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Filter by Ingredient</label>
          <input
            type="text"
            placeholder="e.g. Vitamin C, Niacinamide"
            value={filters.ingredient}
            onChange={(e) => setFilters(f => ({ ...f, ingredient: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Filter by Skin Type</label>
          <input
            type="text"
            placeholder="e.g. Oily, Dry"
            value={filters.skinType}
            onChange={(e) => setFilters(f => ({ ...f, skinType: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
          />
        </div>
        <div className="flex items-center text-sm text-slate-500 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
          <Filter className="w-4 h-4 mr-2" />
          {feedData?.length || 0} Products Matched
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-2xl shadow-sm overflow-hidden border border-slate-800 flex flex-col h-[600px]">
          <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300">/api/product/marketing-feed</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-green-400">
            {isLoading ? 'Fetching feed...' : (
              <pre>{JSON.stringify(feedData, null, 2)}</pre>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-y-auto h-[600px]">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-slate-400" />
            Visual Preview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {feedData?.map((item: any) => (
              <div key={item.id} className="border border-slate-100 rounded-xl p-4 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="aspect-square bg-slate-50 rounded-lg mb-3 overflow-hidden flex items-center justify-center relative">
                  {item.primaryImage ? (
                    <img src={item.primaryImage.startsWith('http') ? item.primaryImage : `http://localhost:3000${item.primaryImage}`} alt={item.name} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-slate-300">No Image</span>
                  )}
                  {/* Stock Tag on Image */}
                  <div className="absolute top-2 right-2">
                    {item.variants?.[0]?.isOutOfStock ? (
                      <span className="inline-block px-2 py-1 bg-red-500/90 text-white text-[10px] font-bold rounded-md shadow-sm">OUT OF STOCK</span>
                    ) : (
                      <span className="inline-block px-2 py-1 bg-emerald-500/90 text-white text-[10px] font-bold rounded-md shadow-sm">{item.variants?.[0]?.availableQuantity} IN STOCK</span>
                    )}
                  </div>
                </div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">{item.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-indigo-600 font-bold text-sm">₹{item.discountPrice || item.mrp}</span>
                  {item.discountPrice && <span className="text-slate-400 line-through text-xs">₹{item.mrp}</span>}
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {item.concerns?.slice(0, 2).map((c: string) => (
                    <span key={c} className="px-1.5 py-0.5 bg-rose-50 text-rose-600 text-[10px] rounded-md">{c}</span>
                  ))}
                  {item.ingredients?.slice(0, 1).map((i: string) => (
                    <span key={i} className="px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] rounded-md">{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {feedData?.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm">
              <Rss className="w-12 h-12 text-slate-200 mb-3" />
              <p>No products match these filters.</p>
              <p className="text-xs mt-1">Remember, only LIVE products show up here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
