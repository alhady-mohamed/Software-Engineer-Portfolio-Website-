import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, Sparkles, Image as ImageIcon, Link as LinkIcon, Trash2 } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: string; // e.g. '1/1', '4/5', '16/9', 'auto'
  placeholder?: string;
  helperText?: string;
  bucketName?: string;
  folderPath?: string;
  recommendedSize?: string;
}

/**
 * Resizes and compresses image to web-optimized data URL.
 */
async function processAndCompressImage(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's an SVG, preserve vector format directly
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            maxHeight = height;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Smooth image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp if supported, or jpeg/png
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mime, quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Sawirka lama akhrin karo'));
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'auto',
  placeholder = 'https://...',
  helperText,
  bucketName = 'portfolio-media',
  folderPath = 'uploads',
  recommendedSize = 'Max 10MB (JPG, PNG, WEBP, SVG)',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeMode, setActiveMode] = useState<'upload' | 'url'>('upload');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Fadlan dooro fayl sawir ah oo keliya (JPG, PNG, WEBP, SVG)' });
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Sawirku aad buu u weyn yahay (ugu badnaan 15MB)' });
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      // High-Fidelity Data URL with Canvas Compression
      const compressedDataUrl = await processAndCompressImage(file);
      onChange(compressedDataUrl);
      setMessage({
        type: 'success',
        text: 'Sawirka waa la habeeyay oo si toos ah ayaa loo keydiyay!',
      });
    } catch (err: any) {

      console.error('Image upload failed:', err);
      setMessage({ type: 'error', text: 'Cilad baa dhacday marka sawirka la shubayay' });
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {/* Label and Mode Toggle */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              activeMode === 'upload' ? 'bg-primary text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UploadCloud size={11} />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              activeMode === 'url' ? 'bg-primary text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon size={11} />
            <span>Link URL</span>
          </button>
        </div>
      </div>

      {/* Main Upload Box */}
      {activeMode === 'upload' ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-4 transition-all duration-200 text-center ${
            isDragging
              ? 'border-primary bg-primary/10 scale-[1.01]'
              : 'border-slate-700/80 hover:border-primary/70 bg-slate-950/60 hover:bg-slate-950'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {isProcessing ? (
            <div className="py-6 flex flex-col items-center justify-center gap-2">
              <Loader2 className="animate-spin text-primary" size={28} />
              <p className="text-xs text-slate-300 font-medium">Sawirka waa la soo upload gareynayaa...</p>
            </div>
          ) : (
            <div className="py-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <UploadCloud size={22} />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold text-white group-hover:text-primary transition-colors">
                  Riix halkan si aad sawir uga soo doorato computer-kaaga
                </p>
                <p className="text-[11px] text-slate-400">
                  Ama soo jiid oo ku rid (Drag & Drop). {recommendedSize}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Direct URL Input Mode */
        <div className="space-y-1.5">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-primary placeholder-slate-600"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-400 p-1"
                title="Tirtir sawirka"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Helper text or upload feedback */}
      {message && (
        <div
          className={`flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg ${
            message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
          <span>{message.text}</span>
        </div>
      )}

      {helperText && !message && (
        <p className="text-[11px] text-slate-400 leading-normal">{helperText}</p>
      )}

      {/* Live Image Preview Thumbnail with Clear Option */}
      {value && (
        <div className="flex items-center gap-3 p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl mt-2">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shrink-0">
            <img
              src={value}
              alt="Sawirka Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-white truncate flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
              <span>Sawirka waa diyaar</span>
            </p>
            <p className="text-[10px] text-slate-400 truncate font-mono mt-0.5">
              {value.startsWith('data:') ? 'Local Base64 Data Image (Uploaded)' : value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors shrink-0"
            title="Ka saar sawirkan"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
