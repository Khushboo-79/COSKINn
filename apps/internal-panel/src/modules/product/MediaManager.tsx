import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ArrowLeft, Image as ImageIcon, Video, Upload, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function MediaManager({ productId, onClose }: { productId: string, onClose: () => void }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data } = await api.get(`http://localhost:3000/api/product/${productId}`);
      return data;
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return api.post(`http://localhost:3000/api/product/${productId}/media/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product', productId] }),
  });

  const addVideoMutation = useMutation({
    mutationFn: (data: { url: string, title?: string }) => 
      api.post(`http://localhost:3000/api/product/${productId}/media/video`, data),
    onSuccess: () => {
      setVideoUrl('');
      setVideoTitle('');
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    },
  });

  const removeImageMutation = useMutation({
    mutationFn: (imageId: string) => api.delete(`http://localhost:3000/api/product/${productId}/media/image/${imageId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product', productId] }),
  });

  const removeVideoMutation = useMutation({
    mutationFn: (videoId: string) => api.delete(`http://localhost:3000/api/product/${productId}/media/video/${videoId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product', productId] }),
  });

  const reorderMutation = useMutation({
    mutationFn: (data: { images?: any[], videos?: any[] }) => 
      api.patch(`http://localhost:3000/api/product/${productId}/media/reorder`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['product', productId] }),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    if (!product?.images) return;
    const items = [...product.images];
    if (direction === 'up' && index > 0) {
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index + 1], items[index]] = [items[index], items[index + 1]];
    }
    const updated = items.map((item, idx) => ({ id: item.id, sortOrder: idx }));
    reorderMutation.mutate({ images: updated });
  };

  const handleMoveVideo = (index: number, direction: 'up' | 'down') => {
    if (!product?.videos) return;
    const items = [...product.videos];
    if (direction === 'up' && index > 0) {
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index + 1], items[index]] = [items[index], items[index + 1]];
    }
    const updated = items.map((item, idx) => ({ id: item.id, sortOrder: idx }));
    reorderMutation.mutate({ videos: updated });
  };

  if (isLoading) return <div className="p-8 text-center text-slate-400">Loading media...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-emerald-500" />
            Product Gallery
          </h2>
          <p className="text-slate-500 text-sm">{product?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Images Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-500" /> Images
            </h3>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadImageMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium text-sm disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {uploadImageMutation.isPending ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {product?.images?.map((img: any, index: number) => (
              <div key={img.id} className="relative group rounded-xl border border-slate-200 overflow-hidden aspect-square bg-slate-50 flex items-center justify-center">
                <img src={img.url} alt="Product" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => handleMoveImage(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 bg-white/90 rounded-md hover:bg-white text-slate-700 disabled:opacity-50"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleMoveImage(index, 'down')}
                    disabled={index === product.images.length - 1}
                    className="p-1.5 bg-white/90 rounded-md hover:bg-white text-slate-700 disabled:opacity-50"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => removeImageMutation.mutate(img.id)}
                    className="p-1.5 bg-white/90 rounded-md hover:bg-red-50 hover:text-red-600 text-slate-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded shadow-sm">
                    Primary
                  </div>
                )}
              </div>
            ))}
            {product?.images?.length === 0 && (
              <div className="col-span-2 py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                No images uploaded yet.
              </div>
            )}
          </div>
        </div>

        {/* Videos Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
          <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
            <Video className="w-5 h-5 text-indigo-500" /> Videos
          </h3>
          
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <input 
                type="text" 
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="Video URL (YouTube, Vimeo, MP4...)" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <input 
                type="text" 
                value={videoTitle}
                onChange={e => setVideoTitle(e.target.value)}
                placeholder="Video Title (Optional)" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <button 
              onClick={() => {
                if (videoUrl) addVideoMutation.mutate({ url: videoUrl, title: videoTitle });
              }}
              disabled={!videoUrl || addVideoMutation.isPending}
              className="px-4 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium disabled:opacity-50 h-[42px]"
            >
              Add Video
            </button>
          </div>

          <div className="space-y-3">
            {product?.videos?.map((vid: any, index: number) => (
              <div key={vid.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50/50 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded bg-indigo-100 text-indigo-500 flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-slate-800 truncate">{vid.title || 'Product Video'}</p>
                    <a href={vid.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-500 hover:underline truncate block">
                      {vid.url}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleMoveVideo(index, 'up')} disabled={index === 0} className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleMoveVideo(index, 'down')} disabled={index === product.videos.length - 1} className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30">
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeVideoMutation.mutate(vid.id)} className="p-1.5 text-slate-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {product?.videos?.length === 0 && (
              <div className="py-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl text-sm">
                No videos added yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
