import React, { useState } from 'react'
import {
  Check,
  Calendar,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { getDueDateBadge } from '../utils/dateUtils'
import { PRIORITIES } from '../utils/storage'

export function TodoItem({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const dueDateInfo = getDueDateBadge(todo.dueDate, todo.completed)

  const priorityMeta = PRIORITIES.find((p) => p.id === todo.priority) || {
    label: todo.priority,
    color: 'slate',
    dot: 'bg-slate-400',
  }

  return (
    <div
      className={`group relative p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 ${
        todo.completed
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-85 hover:opacity-100'
          : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800/80'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Custom Checkbox */}
        <button
          type="button"
          onClick={() => onToggleComplete(todo.id)}
          aria-label={todo.completed ? 'Mark task as pending' : 'Mark task as completed'}
          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-200 cursor-pointer flex-shrink-0 ${
            todo.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs shadow-emerald-500/30 rotate-0'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 bg-white dark:bg-slate-800/80'
          }`}
        >
          {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {/* Status Indicator (Completed / Pending) */}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                todo.completed
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
              }`}
            >
              {todo.completed ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3" />
                  <span>Pending</span>
                </>
              )}
            </span>

            {/* Category Badge */}
            {todo.category && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {todo.category}
              </span>
            )}

            {/* Priority Badge */}
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
              <span className={`w-1.5 h-1.5 rounded-full ${priorityMeta.dot}`} />
              {priorityMeta.label}
            </span>

            {/* Due Date Badge */}
            {dueDateInfo && (
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${dueDateInfo.className}`}
              >
                <Calendar className="w-3 h-3" />
                {dueDateInfo.label}
              </span>
            )}
          </div>

          {/* Task Title */}
          <h3
            className={`text-sm sm:text-base font-semibold leading-snug transition-all ${
              todo.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {todo.title}
          </h3>

          {/* Description Snippet / Expansion */}
          {todo.description && (
            <div className="mt-1.5">
              <p
                className={`text-xs text-slate-500 dark:text-slate-400 leading-relaxed ${
                  !isExpanded ? 'line-clamp-1' : ''
                }`}
              >
                {todo.description}
              </p>
              {todo.description.length > 80 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium hover:underline mt-0.5 cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      <span>Show less</span>
                      <ChevronUp className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      <span>Read more</span>
                      <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons: Edit and Delete */}
        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex-shrink-0">
          <button
            type="button"
            onClick={() => onEdit(todo)}
            aria-label={`Edit task "${todo.title}"`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors cursor-pointer"
            title="Edit task"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete task "${todo.title}"`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
