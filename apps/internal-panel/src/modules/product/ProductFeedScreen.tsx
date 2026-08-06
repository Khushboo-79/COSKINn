import { useState } from 'react';
import { Search, Filter, Download, Box, PlusCircle } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../core/api/product';
import { resolveImageUrl } from '../../core/api/client';

export const ProductFeedScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const blob = await productApi.exportCsv();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'marketing-feed-export.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (e) {
      console.error('Export failed', e);
    } finally {
      setIsExporting(false);
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    concern: '',
    ingredient: '',
    skinType: ''
  });

  const { data: feed = [], isLoading } = useQuery({
    queryKey: ['marketingFeed'],
    queryFn: () => productApi.getMarketingFeed(),
  });

  const uniqueCategories = Array.from(new Set(feed.map((p: any) => p.category))).filter(Boolean) as string[];
  const uniqueIngredients = Array.from(new Set(feed.flatMap((p: any) => p.ingredients || []))).filter(Boolean) as string[];
  const uniqueConcerns = Array.from(new Set(feed.flatMap((p: any) => p.concerns || []))).filter(Boolean) as string[];
  const uniqueSkinTypes = Array.from(new Set(feed.flatMap((p: any) => p.skinTypes || []))).filter(Boolean) as string[];

  const filteredFeed = feed.filter((product: any) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.variants?.[0]?.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesIngredient = !filters.ingredient || product.ingredients?.includes(filters.ingredient);
    const matchesConcern = !filters.concern || product.concerns?.includes(filters.concern);
    const matchesSkinType = !filters.skinType || product.skinTypes?.includes(filters.skinType);

    return matchesSearch && matchesCategory && matchesIngredient && matchesConcern && matchesSkinType;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marketing Product Feed</h1>
          <p className="text-slate-500 mt-1">Live catalog data for CRM and campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition-colors flex items-center border border-slate-200 disabled:opacity-50"
          >
            <Download className={`h-4 w-4 mr-2 ${isExporting ? 'animate-bounce' : ''}`} />
            {isExporting ? 'Exporting...' : 'Export Feed (XML/CSV)'}
          </button>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search SKUs, names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 border rounded-lg transition-colors ${showFilters ? 'bg-primary-50 border-primary-200 text-primary-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filter Dropdown */}
        {showFilters && (
          <div className="p-4 border-b border-slate-100 bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Category</label>
              <select 
                value={filters.category} 
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Fruit / Ingredient</label>
              <select 
                value={filters.ingredient} 
                onChange={(e) => setFilters({...filters, ingredient: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="">All Ingredients</option>
                {uniqueIngredients.map(ing => <option key={ing} value={ing}>{ing}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Skin Type</label>
              <select 
                value={filters.skinType} 
                onChange={(e) => setFilters({...filters, skinType: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="">All Skin Types</option>
                {uniqueSkinTypes.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Concern</label>
              <select 
                value={filters.concern} 
                onChange={(e) => setFilters({...filters, concern: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="">All Concerns</option>
                {uniqueConcerns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fruit Tag</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-4">Loading feed...</td></tr>
              ) : filteredFeed.map((product: any) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 overflow-hidden relative">
                        {product.primaryImage ? (
                           <img 
                              src={resolveImageUrl(product.primaryImage)} 
                              alt="" 
                              className="h-full w-full object-cover z-10" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                           />
                        ) : null}
                        <Box className="h-5 w-5 absolute z-0" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900 truncate max-w-[200px]" title={product.name}>{product.name}</div>
                        <div className="text-sm text-slate-500 font-mono text-xs mt-0.5">{product.id.split('-')[0]}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono">
                    {product.variants?.[0]?.sku || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{product.ingredients?.[0] || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      LIVE
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-900">
                    {product.variants?.[0]?.availableQuantity || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
