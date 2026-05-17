"use client";

import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (visible) {
      setExiting(false);
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible && !exiting) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100]">
      <div
        className={`flex items-center gap-3 px-5 py-3 bg-white border border-border-dark rounded-xl shadow-md ${
          exiting ? "toast-exit" : "toast-enter"
        }`}
      >
        <AlertCircle className="w-5 h-5 text-neutral-500 shrink-0" />
        <p className="text-sm text-foreground font-medium">{message}</p>
        <button
          onClick={() => {
            setExiting(true);
            setTimeout(onClose, 300);
          }}
          className="ml-2 p-1 rounded-full hover:bg-muted transition-colors shrink-0"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
