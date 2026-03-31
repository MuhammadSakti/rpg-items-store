"use client";

import { CheckCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-success/30 bg-surface px-4 py-3 shadow-lg"
      data-testid="toast-notification"
      role="alert"
      aria-live="polite"
    >
      <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
      <span className="text-sm font-medium text-foreground" data-testid="toast-message">
        {message}
      </span>
      <button
        type="button"
        data-testid="toast-close"
        className="ml-2 text-muted hover:text-foreground cursor-pointer"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
