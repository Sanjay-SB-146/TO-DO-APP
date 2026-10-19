import React, { useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X, RotateCcw } from 'lucide-react'

export function Toast({ toast, onDismiss, onUndo }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      onDismiss()
    }, toast.duration || 4500)

    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  if (!toast) return null

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
      default:
        return <Info className="w-5 h-5 text-indigo-500 flex-shrink-0" />
    }
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 max-w-sm w-full animate-fade-in">
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 min-w-0">
          {getIcon()}
          <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
            {toast.message}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {toast.action && onUndo && (
            <button
              onClick={() => {
                onUndo()
                onDismiss()
              }}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Undo</span>
            </button>
          )}

          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
