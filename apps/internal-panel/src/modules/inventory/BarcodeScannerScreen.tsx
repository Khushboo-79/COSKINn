import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { ScanBarcode, ArrowLeft, ArrowRightLeft, RefreshCcw, Package, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const BarcodeScannerScreen = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [scannedSku, setScannedSku] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Keep input focused so wedge scanner always types into it
  useEffect(() => {
    inputRef.current?.focus();
  }, [scannedSku]);

  const { data: stockData, isLoading, isError, error } = useQuery({
    queryKey: ['inventory', 'stock', scannedSku],
    queryFn: () => inventoryApi.getStockForSku(scannedSku),
    enabled: !!scannedSku,
    retry: false
  });

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setScannedSku(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Barcode Scanner Terminal</h1>
          <p className="text-slate-500 text-sm mt-1">Scan a product barcode or enter SKU manually to lookup.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ScanBarcode className="h-12 w-12" />
          </div>
          
          <form onSubmit={handleScanSubmit} className="w-full max-w-md">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Scan barcode or type SKU..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xl text-center font-mono tracking-widest focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                autoComplete="off"
                autoFocus
              />
              <button type="submit" className="hidden">Submit</button>
            </div>
            <p className="text-center text-slate-400 text-xs mt-3">Ready for wedge scanner input...</p>
          </form>
        </div>
      </div>

      {/* Result Card */}
      {scannedSku && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {isLoading ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-slate-400">
              <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p>Looking up {scannedSku}...</p>
            </div>
          ) : isError ? (
            <div className="bg-red-50 p-8 rounded-2xl border border-red-100 flex flex-col items-center justify-center text-red-600">
              <AlertTriangle className="h-10 w-10 mb-3 text-red-500" />
              <p className="font-medium text-lg">SKU not found</p>
              <p className="text-sm opacity-80 mt-1">{scannedSku} does not exist in the database.</p>
            </div>
          ) : stockData ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white">
                <div>
                  <h2 className="text-xl font-bold">{stockData.name || 'Unknown Product'}</h2>
                  <p className="text-slate-400 font-mono text-sm mt-1">{stockData.sku}</p>
                </div>
                <Package className="h-8 w-8 text-slate-600" />
              </div>
              
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-green-800 text-sm font-medium mb-1">Available</p>
                  <p className="text-3xl font-bold text-green-600">{stockData.available}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <p className="text-amber-800 text-sm font-medium mb-1">Reserved</p>
                  <p className="text-3xl font-bold text-amber-600">{stockData.reserved}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="text-red-800 text-sm font-medium mb-1">Damaged</p>
                  <p className="text-3xl font-bold text-red-600">{stockData.damaged}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="text-red-800 text-sm font-medium mb-1">Expired</p>
                  <p className="text-3xl font-bold text-red-600">{stockData.expired}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => navigate(`/inventory/adjust?sku=${stockData.sku}`)}
                  className="flex-1 bg-white border border-slate-200 py-2.5 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors flex justify-center items-center"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Quick Adjust
                </button>
                <button
                  onClick={() => navigate(`/inventory/transfer?sku=${stockData.sku}`)}
                  className="flex-1 bg-white border border-slate-200 py-2.5 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors flex justify-center items-center"
                >
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Transfer
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
