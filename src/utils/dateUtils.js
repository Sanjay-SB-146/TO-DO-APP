/**
 * Date utility functions for TaskFlow Pro
 */

export const getTodayDateString = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatDate = (dateStr) => {
  if (!dateStr) return null
  try {
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    })
  } catch {
    return dateStr
  }
}

export const isDueToday = (dateStr) => {
  if (!dateStr) return false
  return dateStr === getTodayDateString()
}

export const isOverdue = (dateStr, isCompleted = false) => {
  if (!dateStr || isCompleted) return false
  const today = getTodayDateString()
  return dateStr < today
}

export const getDueDateBadge = (dateStr, isCompleted = false) => {
  if (!dateStr) return null
  if (isCompleted) {
    return {
      label: formatDate(dateStr),
      status: 'completed',
      className: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
    }
  }
  if (isOverdue(dateStr, isCompleted)) {
    return {
      label: `Overdue (${formatDate(dateStr)})`,
      status: 'overdue',
      className: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900',
    }
  }
  if (isDueToday(dateStr)) {
    return {
      label: 'Due Today',
      status: 'today',
      className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    }
  }
  return {
    label: `Due ${formatDate(dateStr)}`,
    status: 'upcoming',
    className: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900',
  }
}
