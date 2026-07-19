import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { productApi } from '../../core/api/product';
import { Package, PlusCircle, List, Tag, AlertTriangle } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';

export const CatalogDashboardScreen = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['productStats'],
    queryFn: productApi.getStats,
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
        <div className="p-6">
          <p className="text-slate-500 text-center py-8">Loading recent products...</p>
        </div>
      </div>
    </div>
  );
};
