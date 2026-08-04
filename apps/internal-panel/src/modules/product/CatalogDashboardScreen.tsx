import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { productApi } from '../../core/api/product';
import { Package, PlusCircle, List, Tag, AlertTriangle } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);

export const CatalogDashboardScreen = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['productStats'],
    queryFn: productApi.getStats,
  });

  const { data: allProducts, isLoading: isProductsLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: productApi.getProducts,
  });

  const recentProducts = allProducts ? allProducts.slice(0, 5) : [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-end gap-3">
        <Link to="/product/feed" className="px-5 py-2.5 bg-white text-slate-700 rounded-2xl font-bold hover:text-[#FF7F50] hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center border border-slate-100 shadow-sm">
          <Tag className="h-4 w-4 mr-2 text-slate-400" />
          Marketing Feed
        </Link>
        <Link to="/product/import" className="px-5 py-2.5 bg-white text-slate-700 rounded-2xl font-bold hover:text-[#FF7F50] hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center border border-slate-100 shadow-sm">
          <List className="h-4 w-4 mr-2 text-slate-400" />
          Bulk Import
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link to="/product/create" className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-5 rounded-3xl shadow-[0_8px_16px_rgba(255,127,80,0.2)] hover:shadow-[0_12px_24px_rgba(255,127,80,0.3)] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 ease-out flex items-center justify-between group overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0)_100%)] w-[200%] -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="relative z-10">
            <p className="font-extrabold text-xl tracking-tight mb-1">Add Product</p>
            <p className="text-white/80 text-sm font-medium">Launch new wizard</p>
          </div>
          <PlusCircle className="h-10 w-10 text-white/90 group-hover:scale-125 group-hover:rotate-90 transition-transform duration-500 relative z-10" />
        </Link>
        
        <Link to="/product/list" className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
          <div className="relative z-10">
            <p className="font-extrabold text-slate-800 text-xl tracking-tight mb-1">All Products</p>
            <p className="text-slate-500 text-sm font-medium group-hover:text-primary-600 transition-colors">View and edit catalog</p>
          </div>
          <List className="h-10 w-10 text-slate-200 group-hover:text-primary-500 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 relative z-10" />
        </Link>
        
        <Link to="/product/categories" className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
          <div className="relative z-10">
            <p className="font-extrabold text-slate-800 text-xl tracking-tight mb-1">Categories</p>
            <p className="text-slate-500 text-sm font-medium group-hover:text-primary-600 transition-colors">Manage taxonomy</p>
          </div>
          <Tag className="h-10 w-10 text-slate-200 group-hover:text-primary-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10" />
        </Link>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 rounded-3xl shadow-sm border border-amber-200/50 flex flex-col justify-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default">
          <div className="flex items-center gap-2 text-amber-700 font-bold mb-1.5">
            <AlertTriangle className="h-4 w-4 group-hover:animate-bounce" /> Action Required
          </div>
          <p className="text-sm text-amber-700/80 font-medium leading-relaxed">3 products need missing SEO descriptions</p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={isLoading ? '...' : stats?.totalProducts || 0}
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Variants"
          value={isLoading ? '...' : stats?.activeVariants || 0}
          icon={List}
        />
        <StatCard
          title="Low Stock SKUs"
          value={isLoading ? '...' : stats?.lowStockSkus || 0}
          icon={AlertTriangle}
          trend={{ value: 0, isPositive: false }}
        />
        <StatCard
          title="Total Categories"
          value={isLoading ? '...' : stats?.totalCategories || 0}
          icon={Tag}
        />
      </div>

      {/* Recent Products Table Preview */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">Recently Added</h2>
          <Link to="/product/list" className="text-sm font-bold text-primary-600 hover:text-white hover:bg-primary-500 bg-primary-50 px-4 py-2 rounded-full transition-all active:scale-95 shadow-sm">View All</Link>
        </div>
        <div className="p-0 overflow-x-auto">
          {isProductsLoading ? (
            <p className="text-slate-500 text-center py-8">Loading recent products...</p>
          ) : recentProducts.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No products found.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                  <th className="py-3 px-6 font-medium">Product</th>
                  <th className="py-3 px-6 font-medium">Category</th>
                  <th className="py-3 px-6 font-medium">Price</th>
                  <th className="py-3 px-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentProducts.map((product: any) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0].url} alt={product.name} className="h-10 w-10 rounded object-cover border border-slate-100" />
                        ) : (
                          <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                            <Package className="h-5 w-5" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-slate-900 text-sm line-clamp-1">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-sm text-slate-600">{product.category?.name || 'N/A'}</td>
                    <td className="py-3 px-6 text-sm font-medium text-slate-900">{formatCurrency(product.discountPrice || product.mrp)}</td>
                    <td className="py-3 px-6">
                      <StatusBadge 
                        status={product.status === 'LIVE' ? 'Published' : product.status === 'DRAFT' ? 'Draft' : product.status} 
                        variant={product.status === 'LIVE' ? 'success' : product.status === 'DRAFT' ? 'default' : 'warning'} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
