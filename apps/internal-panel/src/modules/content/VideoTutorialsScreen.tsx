import { useState } from 'react';
import { s3Client } from '../../core/api/s3Client';
import { Video, Upload, PlayCircle, Loader2, Link as LinkIcon, Trash2, CheckCircle2 } from 'lucide-react';

export const VideoTutorialsScreen = () => {
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState<any[]>([]); // Mock local state for uploaded videos in this session
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Basic validation
      if (!file.type.startsWith('video/')) {
        alert("Please upload a valid video file.");
        return;
      }
      
      try {
        setUploading(true);
        // Simulate progress for UX
        const interval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90));
        }, 300);

        const url = await s3Client.uploadFile(file, 'tutorials');
        
        clearInterval(interval);
        setUploadProgress(100);
        
        // Add to local state list
        setVideos(prev => [{
          id: Date.now().toString(),
          url,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          uploadedAt: new Date(),
        }, ...prev]);

        setTimeout(() => setUploadProgress(0), 1000);
      } catch (err) {
        console.error("Video upload failed", err);
        alert("Video upload failed");
        setUploadProgress(0);
      } finally {
        setUploading(false);
      }
    }
  };

  const removeVideoLocally = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Video URL copied to clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Video Tutorials</h1>
          <p className="text-slate-500 text-sm mt-1">Upload and host video content for product pages and routines.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Upload Zone */}
        <div className="p-8 border-b border-slate-200 bg-slate-50">
          <div className="border-2 border-dashed border-indigo-200 rounded-2xl p-12 bg-white flex flex-col items-center justify-center relative overflow-hidden group hover:border-indigo-400 transition-colors">
            
            {uploading ? (
              <div className="text-center space-y-4 w-full max-w-sm">
                <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mx-auto" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Uploading Video...</div>
                  <div className="text-xs text-slate-500 mt-1">Please do not close this window.</div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="bg-indigo-50 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Upload new video</h3>
                <p className="text-slate-500 text-sm mt-2 text-center max-w-md">
                  Drag and drop your MP4, WebM, or MOV file here, or click to browse. Maximum file size 100MB.
                </p>
                <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 pointer-events-none">
                  Select File
                </button>
              </>
            )}

            <input 
              type="file" 
              onChange={handleVideoUpload} 
              accept="video/*"
              className="absolute inset-0 opacity-0 cursor-pointer" 
              disabled={uploading}
            />
          </div>
        </div>

        {/* Video List */}
        <div className="p-8">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center">
            <Video className="h-5 w-5 mr-2 text-slate-400" /> Uploaded this session ({videos.length})
          </h3>

          {videos.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
              <PlayCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <div className="text-slate-500 font-medium">No videos uploaded yet.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map(video => (
                <div key={video.id} className="border border-slate-200 rounded-xl p-4 flex gap-4 bg-white shadow-sm hover:border-indigo-200 transition-colors group">
                  <div className="w-32 h-24 bg-slate-900 rounded-lg shrink-0 relative overflow-hidden flex items-center justify-center">
                    <video src={video.url} className="w-full h-full object-cover opacity-60" />
                    <PlayCircle className="h-8 w-8 text-white absolute z-10 opacity-80" />
                  </div>
                  <div className="flex-1 flex flex-col min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate" title={video.name}>{video.name}</h4>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Hosted on S3
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{video.size}</div>
                    
                    <div className="mt-auto flex gap-2 pt-3">
                      <button 
                        onClick={() => copyToClipboard(video.url)}
                        className="flex-1 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-1.5 rounded flex items-center justify-center transition-colors"
                      >
                        <LinkIcon className="h-3 w-3 mr-1" /> Copy Link
                      </button>
                      <button 
                        onClick={() => removeVideoLocally(video.id)}
                        className="px-2 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 py-1.5 rounded flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
