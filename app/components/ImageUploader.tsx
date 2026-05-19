"use client";

import { useState, useRef, useCallback } from "react";
import { CloudUpload, ShieldCheck, Image as ImageIcon, X, Sparkles, Loader2 } from "lucide-react";
import Toast from "./Toast";

const ACCEPTED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

interface ImageUploaderProps {
  onAnalyze?: (base64: string, mimeType: string, previewUrl: string) => void;
  isAnalyzing?: boolean;
}

export default function ImageUploader({ onAnalyze, isAnalyzing = false }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
  };

  const validateFile = useCallback(
    (file: File): boolean => {
      if (!ACCEPTED_FORMATS.includes(file.type)) {
        showToast(
          "Format file tidak didukung. Gunakan JPG, JPEG, PNG, atau WEBP."
        );
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
        showToast(
          `Ukuran file (${sizeMB}MB) melebihi batas maksimal 4MB.`
        );
        return false;
      }
      return true;
    },
    []
  );

  const handleFile = useCallback(
    (file: File) => {
      if (!validateFile(file)) return;

      setFileName(file.name);
      setFileMimeType(file.type);

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        // Extract base64 data (remove the data:image/...;base64, prefix)
        const base64 = dataUrl.split(",")[1];
        setBase64Data(base64);
      };
      reader.readAsDataURL(file);
    },
    [validateFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const clearPreview = () => {
    setPreview(null);
    setFileName(null);
    setBase64Data(null);
    setFileMimeType(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleAnalyze = () => {
    if (base64Data && fileMimeType && preview && onAnalyze) {
      onAnalyze(base64Data, fileMimeType, preview);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !preview && inputRef.current?.click()}
        className={`relative w-full rounded-2xl border transition-all duration-300 cursor-pointer group ${
          dragOver
            ? "drag-over-pulse border-neutral-400 bg-neutral-50"
            : preview
            ? "border-border bg-white"
            : "border-border hover:border-neutral-400 hover:bg-neutral-50/50 bg-[#fafafa]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleChange}
          className="hidden"
          id="image-upload-input"
        />

        {preview ? (
          /* Preview State */
          <div className="relative p-4">
            <div className="relative rounded-xl overflow-hidden bg-neutral-100">
              <img
                src={preview}
                alt="Preview foto ruangan"
                className="w-full h-56 sm:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {fileName}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearPreview();
                }}
                disabled={isAnalyzing}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
                aria-label="Hapus gambar"
              >
                <X className="w-3.5 h-3.5" />
                Hapus
              </button>
            </div>

            {/* Analyze Button */}
            {onAnalyze && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnalyze();
                }}
                disabled={isAnalyzing}
                className="w-full mt-3 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#111111] text-white text-[14px] font-semibold hover:bg-neutral-800 transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sedang menganalisis...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Analisis Sekarang
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          /* Upload State */
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-neutral-100 transition-colors duration-200">
              <CloudUpload
                className="w-7 h-7 text-foreground transition-colors duration-200"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-base font-semibold text-foreground mb-1">
              Drag &amp; drop foto ruangan di sini
            </p>
            <p className="text-sm text-muted-foreground">
              atau klik untuk memilih file
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted-foreground">
              <span>Format: JPG, JPEG, PNG, WEBP</span>
              <span>•</span>
              <span>Maks: 4MB</span>
            </div>
          </div>
        )}
      </div>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-white">
        <ShieldCheck className="w-4 h-4 text-muted-foreground shrink-0" />
        <p className="text-[13px] font-medium text-muted-foreground">
          Foto Anda aman dan hanya digunakan untuk analisis.
        </p>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast({ visible: false, message: "" })}
      />
    </div>
  );
}
