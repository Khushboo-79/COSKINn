import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { 
  ArrowLeft, User, Mail, Phone, Calendar, 
  ShoppingBag, Heart, Droplets, Clock 
} from 'lucide-react';

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: user, isLoading } = useQuery({
    queryKey: ['customer-360', id],
    queryFn: async () => {
      const res = await api.get(`/customer/profile/admin/${id}/360`);
      return res.data;
    }
  });

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Customer 360...</div>;
  if (!user) return <div className="p-8 text-center text-red-500">Customer not found.</div>;

  const profile = user.customerProfile;
  const skin = profile?.skinProfile;
  const orders = user.orders || [];
  const wishlist = user.wishlist?.items || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/crm/customers" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer 360</h1>
          <p className="text-gray-500">Detailed view of {user.firstName} {user.lastName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile & Skin Info */}
        <div className="space-y-6 lg:col-span-1">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName || ''}` : 'No Name'}
                </h2>
                <div className="text-sm text-gray-500">Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{user.email || 'No email provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{user.phone || 'No phone provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>{profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'DOB not set'}</span>
              </div>
            </div>
          </div>

          {/* Skin Profile */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Droplets className="w-5 h-5 text-pink-500" />
              Skin Profile
            </h3>
            {skin ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Skin Type</div>
                  <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                    {skin.skinType}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">Concerns</div>
                  <div className="flex flex-wrap gap-2">
                    {skin.skinConcerns.map((c: string) => (
                      <span key={c} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {c}
                      </span>
                    ))}
                    {skin.skinConcerns.length === 0 && <span className="text-gray-400 text-sm">None selected</span>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                Customer has not completed their skin profile yet.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Orders & Wishlist */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order History */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-500" />
                Recent Orders
              </h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                {orders.length} Total
              </span>
            </div>
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <Link key={order.id} to={`/orders/${order.id}`} className="block p-4 border rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold text-gray-900">Order #{order.id.slice(0,8).toUpperCase()}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">₹{order.totalAmount}</div>
                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-medium ${
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 border-t pt-2 mt-2">
                      {order.items.length} items • {order.items.map((i:any) => i.name).join(', ')}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                No orders placed yet.
              </div>
            )}
          </div>

          {/* Wishlist */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                Wishlist
              </h3>
              <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                {wishlist.length} Items
              </span>
            </div>

            {wishlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wishlist.map((item: any) => (
                  <div key={item.id} className="border rounded-lg p-3 flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</div>
                      <div className="text-xs text-gray-500 mt-1">₹{item.product.mrp}</div>
                    </div>
                    <Link to={`/products`} className="text-xs text-purple-600 mt-3 inline-block hover:underline">
                      View Product
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                Wishlist is empty.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
