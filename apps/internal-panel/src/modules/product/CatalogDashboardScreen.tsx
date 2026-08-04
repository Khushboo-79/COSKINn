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
        <Link to="/product/feed" className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition-colors flex items-center border border-slate-200">
          <Tag className="h-4 w-4 mr-2" />
          Marketing Feed
        </Link>
        <Link to="/product/import" className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition-colors flex items-center border border-slate-200">
          <List className="h-4 w-4 mr-2" />
          Bulk Import
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/product/create" className="bg-primary-600 text-white p-4 rounded-xl shadow-sm hover:bg-primary-700 transition-all flex items-center justify-between group">
          <div>
            <p className="font-semibold text-lg">Add Product</p>
            <p className="text-primary-100 text-sm">Launch new wizard</p>
          </div>
          <PlusCircle className="h-8 w-8 text-primary-200 group-hover:scale-110 transition-transform" />
        </Link>
        
        <Link to="/product/list" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-primary-300 hover:shadow-md transition-all flex items-center justify-between group">
          <div>
            <p className="font-semibold text-slate-900 text-lg">All Products</p>
            <p className="text-slate-500 text-sm">View and edit catalog</p>
          </div>
          <List className="h-8 w-8 text-slate-300 group-hover:text-primary-500 transition-colors" />
        </Link>
        
        <Link to="/product/categories" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-primary-300 hover:shadow-md transition-all flex items-center justify-between group">
          <div>
            <p className="font-semibold text-slate-900 text-lg">Categories</p>
            <p className="text-slate-500 text-sm">Manage taxonomy</p>
          </div>
          <Tag className="h-8 w-8 text-slate-300 group-hover:text-primary-500 transition-colors" />
        </Link>
        
        <div className="bg-amber-50 p-4 rounded-xl shadow-sm border border-amber-100 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-amber-700 font-semibold mb-1">
            <AlertTriangle className="h-4 w-4" /> Action Required
          </div>
          <p className="text-sm text-amber-600">3 products need missing SEO descriptions</p>
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
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900">Recently Added</h2>
          <Link to="/product/list" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</Link>
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
