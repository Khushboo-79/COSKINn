import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Star, Search, CheckCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function ReviewManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED'>('PENDING');
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews', searchTerm, statusFilter],
    queryFn: async () => {
      const { data } = await api.get('/product-review', { 
        params: { 
          search: searchTerm,
          status: statusFilter !== 'ALL' ? statusFilter : undefined
        } 
      });
      return data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => api.patch(`/product-review/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/product-review/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            Review Moderation
          </h1>
          <p className="text-slate-500 text-sm mt-1">Approve or reject customer product reviews before they go live.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setStatusFilter('PENDING')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${statusFilter === 'PENDING' ? 'bg-white shadow text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setStatusFilter('APPROVED')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${statusFilter === 'APPROVED' ? 'bg-white shadow text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Approved
            </button>
            <button 
              onClick={() => setStatusFilter('ALL')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${statusFilter === 'ALL' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
            >
              All
            </button>
          </div>
          
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reviews or products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {isLoading ? (
          <div className="p-12 flex items-center justify-center text-slate-400 bg-white rounded-2xl border border-slate-100">Loading reviews...</div>
        ) : reviews?.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-slate-100">
            <Star className="w-12 h-12 text-slate-300 mb-4" />
            <p>No reviews found matching your filters.</p>
          </div>
        ) : (
          reviews?.map((review: any) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex gap-6">
              <div className="w-48 shrink-0 space-y-2">
                <div className="w-full h-32 bg-slate-100 rounded-xl overflow-hidden">
                  {review.product?.images?.[0]?.url ? (
                    <img src={review.product.images[0].url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs font-medium">No Image</div>
                  )}
                </div>
                <div className="text-sm font-medium text-slate-800 line-clamp-2">{review.product?.name}</div>
                <div className="text-xs text-slate-500">{review.product?.sku}</div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{review.title || 'No Title'}</h3>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium text-slate-700">{review.user?.name}</div>
                      <div className="text-slate-500">{format(new Date(review.createdAt), 'MMM d, yyyy')}</div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm whitespace-pre-wrap">{review.content}</p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    review.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {review.isApproved ? 'APPROVED & LIVE' : 'PENDING APPROVAL'}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    {!review.isApproved && (
                      <button
                        onClick={() => approveMutation.mutate(review.id)}
                        disabled={approveMutation.isPending}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if(confirm('Are you sure you want to delete this review?')) {
                          rejectMutation.mutate(review.id);
                        }
                      }}
                      disabled={rejectMutation.isPending}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      {review.isApproved ? 'Delete' : 'Reject & Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
