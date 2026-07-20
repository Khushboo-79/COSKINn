import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { Search, Package, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShipmentScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: shipments, isLoading } = useQuery({
    queryKey: ['admin', 'shipments'],
    queryFn: () => orderApi.getAllShipments(),
  });

  const filteredShipments = shipments?.filter((s: any) => 
    s.awbNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shipments (AWB)</h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage generated waybills.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search AWB or Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
      </div>

      {/* Data List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading shipments...</p>
          </div>
        ) : !filteredShipments || filteredShipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500 bg-slate-50">
            <Package className="h-12 w-12 text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-700">No shipments found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredShipments.map((shipment: any) => (
              <div key={shipment.id} className="p-6 flex flex-col md:flex-row gap-6 md:items-center hover:bg-slate-50 transition-colors">
                
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-mono text-lg">{shipment.awbNumber || 'PENDING'}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-1">
                      <Link to={`/orders/${shipment.orderId}`} className="hover:text-primary-600 font-medium">
                        Order #{shipment.orderId.slice(-8).toUpperCase()}
                      </Link>
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-sm">
                    <p className="text-slate-500 flex items-center mb-1">
                      <MapPin className="h-3 w-3 mr-1" /> Destination
                    </p>
                    <p className="font-medium text-slate-900">{shipment.shippingAddress?.city}, {shipment.shippingAddress?.state} {shipment.shippingAddress?.pincode}</p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    shipment.status === 'SHIPPED' ? 'bg-violet-100 text-violet-800 border-violet-200' :
                    shipment.status === 'DELIVERED' ? 'bg-green-100 text-green-800 border-green-200' :
                    'bg-slate-100 text-slate-800 border-slate-200'
                  }`}>
                    {shipment.status || 'CREATED'}
                  </span>
                  
                  {shipment.trackingUrl && (
                    <div className="mt-3">
                      <a href={shipment.trackingUrl} target="_blank" rel="noreferrer" className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center justify-end">
                        Live Tracking <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
