import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { CatalogDashboardScreen } from './CatalogDashboardScreen';
import { ProductWizardShell } from './wizard/ProductWizardShell';
import { ProductFeedScreen } from './ProductFeedScreen';
import { BulkImportScreen } from './BulkImportScreen';
import { ProductListScreen } from './ProductListScreen';
import { CategoriesScreen } from './CategoriesScreen';
import { Package, PlusCircle, List, ArrowLeft } from 'lucide-react';

export const ProductRouter = () => {
  const location = useLocation();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
      {/* Product Module Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Product Catalog</h1>
            <p className="text-sm text-slate-500">Manage products, variants, and categories</p>
          </div>
        </div>
        
        {location.pathname !== '/product' && (
          <Link
            to="/product"
            className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/" element={<CatalogDashboardScreen />} />
          <Route path="/create" element={<ProductWizardShell />} />
          <Route path="/feed" element={<ProductFeedScreen />} />
          <Route path="/import" element={<BulkImportScreen />} />
          <Route path="/list" element={<ProductListScreen />} />
          <Route path="/categories" element={<CategoriesScreen />} />
          <Route path="*" element={<Navigate to="/product" replace />} />
        </Routes>
      </main>
    </div>
  );
};
