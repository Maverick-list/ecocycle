import React from 'react';
import { useWasteBank } from '../../context/WasteBankContext';

export const Toast: React.FC = () => {
  const { toast } = useWasteBank();

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-primary text-on-primary border-tertiary-fixed/50',
    info: 'bg-surface-container-high text-on-surface border-secondary',
    error: 'bg-error text-on-error border-error-container',
  };

  const iconName = {
    success: 'check_circle',
    info: 'info',
    error: 'warning',
  }[toast.type];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl backdrop-blur-md ${bgStyles[toast.type]}`}>
        <span className="material-symbols-outlined text-tertiary-fixed text-[22px]">
          {iconName}
        </span>
        <span className="font-body-sm font-semibold tracking-wide text-sm">
          {toast.message}
        </span>
      </div>
    </div>
  );
};
