import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketingApi } from '../../core/api/marketing';
import { Plus, Image as ImageIcon, Loader2, Save, Trash2, Edit } from 'lucide-react';
import { s3Client } from '../../core/api/s3Client';

export const BannerManagementScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [position, setPosition] = useState('hero');
  const [targetSegment, setTargetSegment] = useState('BOTH');
  const [isActive, setIsActive] = useState(true);

  const { data: banners, isLoading } = useQuery({
    queryKey: ['marketing', 'banners'],
    queryFn: () => marketingApi.getBanners()
  });

  const addMutation = useMutation({
    mutationFn: () => marketingApi.createBanner({
      title, imageUrl, linkUrl, position, targetSegment, isActive, sortOrder: 0
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing', 'banners'] });
      setIsAdding(false);
      setTitle('');
      setImageUrl('');
      setLinkUrl('');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => marketingApi.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing', 'banners'] });
    }
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        setUploading(true);
        const url = await s3Client.uploadFile(e.target.files[0], 'banners');
        setImageUrl(url);
      } catch (err) {
        console.error("Upload failed", err);
        alert("Image upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Banners</h1>
          <p className="text-slate-500 text-sm mt-1">Manage storefront banners and hero images.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Upload Banner
        </button>
      </div>

      {isAdding && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">New Banner</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-1">Banner Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Summer Skincare Sale"
                  className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-900 mb-1">Position</label>
                  <select 
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                    className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="hero">Hero Carousel</option>
                    <option value="mid-page">Mid-Page Banner</option>
                    <option value="footer">Footer Banner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-900 mb-1">Segment</label>
                  <select 
                    value={targetSegment}
                    onChange={e => setTargetSegment(e.target.value)}
                    className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="BOTH">All / Both</option>
                    <option value="COSMETICS">Cosmetics Only</option>
                    <option value="NUTRITION">Nutrition Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-1">Link URL (Optional)</label>
                <input 
                  type="text" 
                  value={linkUrl}
                  onChange={e => setLinkUrl(e.target.value)}
                  placeholder="/products?category=skincare"
                  className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-indigo-900">Active (Visible immediately)</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-1">Banner Image</label>
              <div className="border-2 border-dashed border-indigo-200 rounded-xl p-4 bg-white h-48 flex flex-col items-center justify-center relative overflow-hidden group">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon className="h-8 w-8 text-indigo-300 mb-2" />
                    <span className="text-sm text-indigo-500">Click to upload 16:9 image</span>
                  </>
                )}
                <input 
                  type="file" 
                  onChange={handleImageUpload} 
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  disabled={uploading}
                />
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-3 border-t border-indigo-100 pt-4">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => addMutation.mutate()}
              disabled={!title || !imageUrl || addMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
            >
              {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Publish Banner
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading banners...</div>
      ) : !banners || banners.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-medium text-slate-900">No banners found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner: any) => (
            <div key={banner.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
              <div className="relative h-48 bg-slate-100">
                <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                {!banner.isActive && (
                  <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                    INACTIVE
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white text-slate-700 rounded-full hover:text-blue-600 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => {
                      if(window.confirm('Delete this banner?')) deleteMutation.mutate(banner.id);
                    }}
                    className="p-2 bg-white text-slate-700 rounded-full hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 truncate">{banner.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded capitalize">
                    {banner.position}
                  </span>
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                    Segment: {banner.targetSegment}
                  </span>
                </div>
                {banner.linkUrl && (
                  <p className="text-xs text-slate-500 mt-3 truncate font-mono bg-slate-50 p-1 rounded">
                    🔗 {banner.linkUrl}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
