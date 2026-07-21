import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { UploadCloud, X, Image as ImageIcon, Video, Loader2 } from 'lucide-react';
import { uploadFileToS3 } from '../../../core/api/s3Client';

export const Step4Media = () => {
  const { register, control, watch, setValue } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const handleFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError('');

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadFileToS3(file);
        
        append({ 
          url, 
          type: file.type.startsWith('video/') ? 'video' : 'image',
          isPrimary: fields.length === 0 && i === 0 // First image becomes primary
        });
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload file.');
    } finally {
      setIsUploading(false);
      // Reset input
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const setPrimary = (index: number) => {
    const currentMedia = watch('media') || [];
    currentMedia.forEach((_: any, i: number) => {
      setValue(`media.${i}.isPrimary`, i === index);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Product Media</h2>
        <p className="text-sm text-slate-500">Upload high-quality images and video tutorials.</p>
      </div>

      {uploadError && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {uploadError}
        </div>
      )}

      {/* Upload Dropzone */}
      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative">
        <input
          type="file"
          multiple
          accept="image/*,video/mp4"
          onChange={handleFileDrop}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        {isUploading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 text-primary-500 animate-spin mb-3" />
            <p className="text-sm font-medium text-slate-900">Uploading to S3...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="bg-primary-50 p-4 rounded-full text-primary-600 mb-4">
              <UploadCloud className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium text-slate-900 mb-1">Click or drag files to upload</p>
            <p className="text-xs text-slate-500">SVG, PNG, JPG, WEBP or MP4 (max. 10MB)</p>
          </div>
        )}
      </div>

      {/* Media Gallery */}
      {fields.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Uploaded Media</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fields.map((field: any, index: number) => (
              <div key={field.id} className={`relative rounded-xl overflow-hidden border-2 group ${watch(`media.${index}.isPrimary`) ? 'border-primary-500' : 'border-transparent'}`}>
                {field.type === 'video' ? (
                  <div className="aspect-square bg-slate-900 flex items-center justify-center">
                    <Video className="h-8 w-8 text-white opacity-50" />
                  </div>
                ) : (
                  <img src={field.url} alt="Uploaded" className="w-full aspect-square object-cover" />
                )}
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  {!watch(`media.${index}.isPrimary`) && field.type === 'image' && (
                    <button
                      type="button"
                      onClick={() => setPrimary(index)}
                      className="px-3 py-1 bg-white text-slate-900 text-xs font-medium rounded-full shadow hover:bg-slate-100"
                    >
                      Make Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1.5 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {watch(`media.${index}.isPrimary`) && (
                  <div className="absolute top-2 left-2 bg-primary-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* External Video Link */}
      <div className="pt-6 border-t border-slate-100">
        <label className="block text-sm font-medium text-slate-700 mb-2">External Video Link (YouTube/Vimeo)</label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Video className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="url"
              {...register('externalVideoUrl')}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
