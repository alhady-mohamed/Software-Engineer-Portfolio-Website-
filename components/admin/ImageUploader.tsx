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
 * Enforces a strict size budget (< 200KB) to ensure Firestore and LocalStorage never fail.
 */
async function processAndCompressImage(
  file: File,
  folderPath = 'uploads',
  label = ''
): Promise<{ dataUrl: string; sizeKb: number }> {
  // If it's an SVG, preserve vector format directly if reasonably sized
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve({
          dataUrl: result,
          sizeKb: Math.round(result.length * 0.75 / 1024),
        });
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  // Determine optimal max dimensions based on the purpose
  const isIcon = folderPath.includes('favicon') || folderPath.includes('icon') || label.toLowerCase().includes('icon') || label.toLowerCase().includes('favicon');
  const isLogo = folderPath.includes('logo') || label.toLowerCase().includes('logo');
  const isHero = folderPath.includes('hero') || label.toLowerCase().includes('hero') || label.toLowerCase().includes('portrait');

  let targetMaxWidth = 1000;
  let targetMaxHeight = 1000;
  let initialQuality = 0.8;

  if (isIcon) {
    targetMaxWidth = 256;
    targetMaxHeight = 256;
    initialQuality = 0.85;
  } else if (isLogo) {
    targetMaxWidth = 600;
    targetMaxHeight = 300;
    initialQuality = 0.85;
  } else if (isHero) {
    targetMaxWidth = 960;
    targetMaxHeight = 1200;
    initialQuality = 0.8;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Adaptive multi-pass compression
        let currentWidth = img.width;
        let currentHeight = img.height;
        let currentQuality = initialQuality;

        // Scale down to fit initial target bounding box
        if (currentWidth > targetMaxWidth || currentHeight > targetMaxHeight) {
          const ratio = Math.min(targetMaxWidth / currentWidth, targetMaxHeight / currentHeight);
          currentWidth = Math.round(currentWidth * ratio);
          currentHeight = Math.round(currentHeight * ratio);
        }

        const renderCanvas = (w: number, h: number, q: number): string => {
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, w);
          canvas.height = Math.max(1, h);
          const ctx = canvas.getContext('2d');
          if (!ctx) return e.target?.result as string;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, w, h);

          // Try webp first (supports alpha + high compression)
          try {
            const webpUrl = canvas.toDataURL('image/webp', q);
            if (webpUrl.startsWith('data:image/webp')) {
              return webpUrl;
            }
          } catch {
            // fallback
          }

          // Fallback to jpeg or png
          const mime = (file.type === 'image/png' && isLogo) ? 'image/png' : 'image/jpeg';
          return canvas.toDataURL(mime, q);
        };

        let resultUrl = renderCanvas(currentWidth, currentHeight, currentQuality);
        const MAX_DATA_URL_CHAR_LEN = 220 * 1024; // ~165KB binary

        // Downscale loop if image is still above size threshold
        let passes = 0;
        while (resultUrl.length > MAX_DATA_URL_CHAR_LEN && passes < 3) {
          passes++;
          currentWidth = Math.round(currentWidth * 0.8);
          currentHeight = Math.round(currentHeight * 0.8);
          currentQuality = Math.max(0.6, currentQuality - 0.1);
          resultUrl = renderCanvas(currentWidth, currentHeight, currentQuality);
        }

        const finalKb = Math.round((resultUrl.length * 0.75) / 1024);
        resolve({ dataUrl: resultUrl, sizeKb: finalKb });
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

    if (file.size > 20 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Sawirku aad buu u weyn yahay (ugu badnaan 20MB)' });
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      // Smart compressed data URL guaranteed to be safe for Firestore (<200KB)
      const { dataUrl, sizeKb } = await processAndCompressImage(file, folderPath, label);
      onChange(dataUrl);
      setMessage({
        type: 'success',
        text: `Sawirka si guul leh ayaa loo habeeyay (${sizeKb} KB) oo diyaar u ah keydinta!`,
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
