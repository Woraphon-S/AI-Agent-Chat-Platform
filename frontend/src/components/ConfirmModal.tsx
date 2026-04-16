import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Trash2, LogOut, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  icon?: 'trash' | 'logout' | 'alert';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'ยืนยัน',
  cancelText = 'ยกเลิก',
  variant = 'primary',
  icon = 'alert',
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'trash': return <Trash2 className="w-6 h-6 text-red-500" />;
      case 'logout': return <LogOut className="w-6 h-6 text-orange-500" />;
      default: return <AlertCircle className="w-6 h-6 text-blue-500" />;
    }
  };

  const getButtonClass = () => {
    if (variant === 'danger') {
      return 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-none';
    }
    return 'bg-[var(--foreground)] hover:opacity-90 text-[var(--background)] shadow-lg';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
        />

        {/* Modal Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm bg-[var(--background)] border border-[var(--border)] rounded-[32px] overflow-hidden shadow-2xl transition-colors duration-300"
        >
          {/* Header/Exit Button */}
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="p-2 hover:bg-[var(--secondary)] text-[var(--muted)] rounded-full transition-all">
              <X size={18} />
            </button>
          </div>

          <div className="p-8 pt-10 flex flex-col items-center text-center">
            {/* Icon Container */}
            <div className="w-16 h-16 rounded-2xl bg-[var(--secondary)] flex items-center justify-center mb-6 shadow-inner">
              {getIcon()}
            </div>

            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed font-medium">
              {message}
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="p-6 px-8 flex flex-col gap-3">
             <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 ${getButtonClass()}`}
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 bg-transparent text-[var(--muted)] font-bold text-sm hover:text-[var(--foreground)] transition-all"
            >
              {cancelText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
