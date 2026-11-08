import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const Icon =
          toast.type === 'success'
            ? CheckCircle2
            : toast.type === 'warning'
            ? AlertTriangle
            : Info;

        const iconColor =
          toast.type === 'success'
            ? 'text-emerald-500'
            : toast.type === 'warning'
            ? 'text-amber-500'
            : 'text-[#087BFF]';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#07182E] text-white p-3.5 rounded-xl shadow-xl border border-slate-700/80 flex items-start gap-3 animate-slideIn"
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-white">{toast.title}</h5>
              <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
