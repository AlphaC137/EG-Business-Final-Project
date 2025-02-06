import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: 'bg-green-50 text-green-800 border-green-500',
    error: 'bg-red-50 text-red-800 border-red-500',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-500',
    info: 'bg-blue-50 text-blue-800 border-blue-500',
  };

  return createPortal(
    <div
      className={cn(
        'fixed bottom-4 right-4 max-w-sm rounded-lg border-l-4 p-4 shadow-lg',
        typeClasses[type]
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <p className="flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>,
    document.body
  );
}